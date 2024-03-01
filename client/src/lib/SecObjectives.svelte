<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function setObjective(objective: string) {
    dispatch("nut", { objective });
  }
</script>

<div class="objective-holder">
  <div>
    <h4>SY0-601 (Security+) Exam Objectives</h4>
    <ol>
      <button
        on:click={() => {
          setObjective("Threats, Attacks, and Vulnerabilities");
        }}>Threats, Attacks, and Vulnerabilities</button
      >
      <button
        on:click={() => {
          setObjective("Technologies and Tools");
        }}>Technologies and Tools</button
      >
      <button
        on:click={() => {
          setObjective("Architecture and Design");
        }}>Architecture and Design</button
      >
      <button
        on:click={() => {
          setObjective("Identity and Access Management");
        }}>Identity and Access Management</button
      >
      <button
        on:click={() => {
          setObjective("Risk Management");
        }}>Risk Management</button
      >
      <button
        on:click={() => {
          setObjective("Cryptography and PKI");
        }}>Cryptography and PKI</button
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
