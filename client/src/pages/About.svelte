<script>
  import Header from "../lib/Header.svelte";
</script>

<div>
  <Header />
  <h1>About</h1>
  <p>
    This is a simple web app that uses OpenAI's GPT-3.5-Turbo API to generate
    questions for CompTIA certification exams. The user can select which exam
    they are studying for and generate a question to answer. The user can then
    input their answer and receive feedback on their answer.
  </p>
  <p>
    This app is built using Svelte and TypeScript on the front end and Express
    and TypeScript on the back end.
  </p>
  <p>
    The source code for this app can be found on{" "}
    <a href="https://github.com/RoyStorey/practice-exam-app/">GitHub.</a>
  </p>
  <p>
    This app was created by{" "}
    <a href="https://www.linkedin.com/in/RoyDeweyStorey/">Roy Dewey Storey</a>.
  </p>
</div>

<style>
  p {
    text-align: left;
  }
</style>
