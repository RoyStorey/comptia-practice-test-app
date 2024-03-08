<script lang="ts">
  import axios from "axios";
  import Header from "../lib/Header.svelte";
  import Footer from "../lib/Footer.svelte";
  import AObjectives from "../lib/AObjectives.svelte";
  import NetObjectives from "../lib/NetObjectives.svelte";
  import LinuxObjectives from "../lib/LinuxObjectives.svelte";
  import SecObjectives from "../lib/SecObjectives.svelte";

  let currentTest: string = "CompTIA A+";
  let currentQuestion: string = "";
  let currentObjective = "No objective selected...";
  let gptFeedback: string = "";

  async function handleSubmitAnswer() {
    let userAnswer = (
      document.getElementById("user-answer") as HTMLTextAreaElement
    ).value;
    console.log(userAnswer);
    gptFeedback = "Loading...";
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/post-user-answer/`,
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
    currentQuestion = "Loading...";
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/get-question/${currentTest}/${currentObjective}`,
      );
      console.log(response.data.data);
      currentQuestion = response.data.data;
      gptFeedback = "";
      (document.getElementById("user-answer") as HTMLTextAreaElement).value =
        "";
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handleObjectiveChange(event: any) {
    currentObjective = event.detail.objective;
  }

  function changeTest(event: any) {
    currentObjective = "No objective selected...";
    currentTest = event.target.value;
  }
</script>

<main>
  <Header />
  <div class="page-body">
    {#if currentTest == "CompTIA Network+"}
      <NetObjectives on:nut={handleObjectiveChange} />
    {:else if currentTest == "CompTIA Security+"}
      <SecObjectives on:nut={handleObjectiveChange} />
    {:else if currentTest == "CompTIA Linux+"}
      <LinuxObjectives on:nut={handleObjectiveChange} />
    {:else if currentTest == "CompTIA A+"}
      <AObjectives on:nut={handleObjectiveChange} />
    {/if}
    <div class="home-query-section">
      <h2>
        Currently studying for <span class="current-test">{currentTest}</span>
      </h2>
      <h3>{currentObjective}</h3>

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
        <button
          id="A+"
          value="CompTIA A+"
          on:click={changeTest}
          class:selected={currentTest === "CompTIA A+"}>CompTIA A+</button
        >
        <button
          id="Net+"
          value="CompTIA Network+"
          on:click={changeTest}
          class:selected={currentTest === "CompTIA Network+"}
          >CompTIA Network+</button
        >
        <button
          id="Sec+"
          value="CompTIA Security+"
          on:click={changeTest}
          class:selected={currentTest === "CompTIA Security+"}
          >CompTIA Security+</button
        >
        <button
          id="Linux+"
          value="CompTIA Linux+"
          on:click={changeTest}
          class:selected={currentTest === "CompTIA Linux+"}
          >CompTIA Linux+</button
        >
      </div>
    </div>
  </div>
</main>

<style>
  .selected {
    background-color: #d82934;
    color: white;
  }
  .home-query-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    width: 100%;
  }
  .current-test {
    color: #d82934;
    filter: drop-shadow(0 0 2em #d82934);
  }
  .user-answer {
    width: 100%;
    margin: 1em 0;
    /* background-color: #1a1a1a; */
    /* background: transparent; */
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  }
  .page-body {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
    width: 70dvw;
  }
  h3 {
    font-weight: 300;
  }
  h2 {
    margin-bottom: 0px;
  }
  button {
    z-index: 4;
  }
  button:hover {
    z-index: 3;
    filter: drop-shadow(0 0 2em #d8293521);
  }
  .selectedTest {
    background-color: #d82934;
    color: white;
    border: none;
    border-radius: 5px;
  }
</style>
