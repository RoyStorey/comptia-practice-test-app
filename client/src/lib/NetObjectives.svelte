<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function setObjective(objective: string) {
    dispatch("nut", { objective });
  }
</script>

<div class="objective-holder">
  <div>
    <h4>N10-008 (Network+) Exam Objectives</h4>
    <ol>
      <button
        on:click={() => {
          setObjective("Networking Concepts");
        }}>Networking Concepts</button
      >
      <button
        on:click={() => {
          setObjective("Infrastructure");
        }}>Infrastructure</button
      >
      <button
        on:click={() => {
          setObjective("Network Operations");
        }}>Network Operations</button
      >
      <button
        on:click={() => {
          setObjective("Network Security");
        }}>Network Security</button
      >
      <button
        on:click={() => {
          setObjective("Network Troubleshooting and Tools");
        }}>Network Troubleshooting and Tools</button
      >
    </ol>
  </div>
</div>

<style>
  .objective-holder {
    /* background: red; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    width: 40%;
    align-self: center;
  }
  ol {
    text-align: left;
    display: flex;
    flex-direction: column;
    padding: 0px;
  }
  ol button {
    margin: 0.5em;
  }
</style>
