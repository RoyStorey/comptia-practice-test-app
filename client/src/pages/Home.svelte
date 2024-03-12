<script lang="ts">
  import axios from "axios";
  import Header from "../lib/Header.svelte";
  import AObjectives from "../lib/AObjectives.svelte";
  import NetObjectives from "../lib/NetObjectives.svelte";
  import LinuxObjectives from "../lib/LinuxObjectives.svelte";
  import SecObjectives from "../lib/SecObjectives.svelte";

  let currentTest: string = "CompTIA A+";
  let currentQuestion: string = "";
  let currentObjective = "No objective selected...";
  let gptFeedback: string = "";
  let select: any;

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
    <div class="objectives-section">
      {#if currentTest == "CompTIA Network+"}
        <NetObjectives on:nut={handleObjectiveChange} />
      {:else if currentTest == "CompTIA Security+"}
        <SecObjectives on:nut={handleObjectiveChange} />
      {:else if currentTest == "CompTIA Linux+"}
        <LinuxObjectives on:nut={handleObjectiveChange} />
      {:else if currentTest == "CompTIA A+"}
        <AObjectives on:nut={handleObjectiveChange} />
      {/if}
    </div>
    <div class="home-query-section">
      <h2>
        Currently studying for<br />
        <select id="testSelect" on:change={changeTest}>
          <option value="CompTIA A+" selected={currentTest === "CompTIA A+"}
            >CompTIA A+</option
          >
          <option
            value="CompTIA Network+"
            selected={currentTest === "CompTIA Network+"}
            >CompTIA Network+</option
          >
          <option
            value="CompTIA Security+"
            selected={currentTest === "CompTIA Security+"}
            >CompTIA Security+</option
          >
          <option
            value="CompTIA Linux+"
            selected={currentTest === "CompTIA Linux+"}>CompTIA Linux+</option
          >
        </select>
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
    </div>
  </div>
</main>

<style>
  .home-query-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    width: 100%;
    flex: 1;
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
    gap: 4rem;
  }
  select {
    all: unset;
    color: #d82934;
    width: min-content;
    padding: 1rem;
    border-radius: 8px;
    transition: border-color 0.25s;
    border: 1px solid transparent;
    width: fit-content;
  }
  select:hover {
    cursor: pointer;
    filter: drop-shadow(0 0 2em #d8293521);
    border: 1px solid #d82934;
  }
  option {
    color: #d82934;
    font-weight: 300;
    border: none;
    font-size: 20px;
  }
  h3 {
    font-weight: 300;
    margin: 0px;
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
  .objectives-section {
    display: flex;
    flex: 1;
    max-width: 30%;
  }
</style>
