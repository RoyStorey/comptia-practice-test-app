<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function setObjective(objective: string) {
    dispatch("nut", { objective });
  }
</script>

<div class="objective-holder">
  <div>
    <h4>XK0-004 (Linux+) Exam Objectives</h4>
    <ol>
      <button
        on:click={() => {
          setObjective("Hardware and System Configuration");
        }}>Hardware and System Configuration</button
      >
      <button
        on:click={() => {
          setObjective("System Operation and Maintenance");
        }}>System Operation and Maintenance</button
      >
      <button
        on:click={() => {
          setObjective("Security");
        }}>Security</button
      >
      <button
        on:click={() => {
          setObjective("Linux Troubleshooting and Diagnostics");
        }}>Linux Troubleshooting and Diagnostics</button
      >
      <button
        on:click={() => {
          setObjective("Automation and Scripting");
        }}>Automation and Scripting</button
      >
    </ol>
  </div>
</div>

<style>
  .objective-holder {
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
