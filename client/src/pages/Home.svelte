<script lang="ts">
  import axios from "axios";
  import Header from "../lib/Header.svelte";
  import Footer from "../lib/Footer.svelte";

  let currentTest: string = "CompTIA A+";
  let currentQuestion: string = "";
  let gptFeedback: string = "";

  function changeTest(event: any) {
    currentTest = event.target.value;
  }

  async function handleSubmitAnswer() {
    let userAnswer = document.getElementById("user-answer").value;
    console.log(userAnswer);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/post-user-answer/",
        {
          question: currentQuestion,
          answer: userAnswer,
        },
      );
      gptFeedback = response.data.data;
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getQuestion() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/get-question/${currentTest}/`,
      );
      console.log(response.data.data);
      currentQuestion = response.data.data;
      gptFeedback = "";
      document.getElementById("user-answer").value = "";
    } catch (error) {
      console.error("Error:", error);
    }
  }

  let gptConversation = {
    gptQuestion: "",
    userAnswer: "",
    gptFeedback: "",
  };
</script>

<main>
  <Header />
  <div class="page-body">
    <h2>
      Currently studying for <span class="current-test">{currentTest}</span>
    </h2>

    <div>
      <h4>Current question:</h4>
      <div id="gpt-question">
        {currentQuestion ? currentQuestion : "No question yet."}
      </div>
    </div>
    <textarea
      class="user-answer"
      rows="8"
      cols="50"
      id="user-answer"
      placeholder="Insert answer here..."
    ></textarea>
    <div>{gptFeedback ? gptFeedback : "No feedback yet."}</div>
    <button on:click={handleSubmitAnswer}>Submit Answer</button>
    <button on:click={getQuestion}>Generate New Question</button>
    <div class="exams-line">
      <button id="A+" value="CompTIA A+" on:click={changeTest}
        >CompTIA A+</button
      >
      <button id="Net+" value="CompTIA Network+" on:click={changeTest}
        >CompTIA Network+</button
      >
      <button id="Sec+" value="CompTIA Security+" on:click={changeTest}
        >CompTIA Security+</button
      >
      <button id="Linux+" value="CompTIA Linux+" on:click={changeTest}
        >CompTIA Linux+</button
      >
    </div>
  </div>
</main>

<style>
  .current-test {
    color: #d82934;
    filter: drop-shadow(0 0 2em #d82934);
  }
  .user-answer {
    width: 100%;
    margin: 1em 0;
    background-color: #1a1a1a;
    /* background: transparent; */
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  }
  .page-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    padding: 4rem;
    width: 50dvw;
  }
  button {
    z-index: 4;
  }
  button:hover {
    z-index: 3;
    filter: drop-shadow(0 0 2em #d8293521);
  }
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
