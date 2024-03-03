<script lang="ts">
  import { createEventDispatcher } from "svelte";
  let currentObjective = "No objective selected...";

  const dispatch = createEventDispatcher();

  function setObjective(objective: string) {
    currentObjective = objective;
    dispatch("nut", { objective });
  }
</script>

<div class="objective-holder">
  <div>
    <h4>220-1001 (Core 1) Exam Objectives</h4>
    <ol>
      <button
        on:click={() => {
          setObjective("Mobile Devices");
        }}
        class:selectedObjective={currentObjective == "Mobile Devices"}
        >Mobile Devices</button
      >
      <button
        on:click={() => {
          setObjective("Networking");
        }}
        class:selectedObjective={currentObjective == "Networking"}
        >Networking</button
      >
      <button
        on:click={() => {
          setObjective("Hardware");
        }}
        class:selectedObjective={currentObjective == "Hardware"}
        >Hardware</button
      >
      <button
        on:click={() => {
          setObjective("Virtualization and Cloud Computing");
        }}
        class:selectedObjective={currentObjective ==
          "Virtualization and Cloud Computing"}
        >Virtualization and Cloud Computing</button
      >
      <button
        on:click={() => {
          setObjective("Hardware and Network Troubleshooting");
        }}
        class:selectedObjective={currentObjective ==
          "Hardware and Network Troubleshooting"}
        >Hardware and Network Troubleshooting</button
      >
    </ol>
  </div>
  <div>
    <h4>220-1002 (Core 2) Exam Objectives:</h4>
    <ol>
      <button
        on:click={() => {
          setObjective("Operating Systems");
        }}
        class:selectedObjective={currentObjective == "Operating Systems"}
        >Operating Systems</button
      >
      <button
        on:click={() => {
          setObjective("Security");
        }}
        class:selectedObjective={currentObjective == "Security"}
        >Security</button
      >
      <button
        on:click={() => {
          setObjective("Software Troubleshooting");
        }}
        class:selectedObjective={currentObjective == "Software Troubleshooting"}
        >Software Troubleshooting</button
      >
      <button
        on:click={() => {
          setObjective("Operational Procedures");
        }}
        class:selectedObjective={currentObjective == "Operational Procedures"}
        >Operational Procedures</button
      >
    </ol>
  </div>
</div>

<style>
  .selectedObjective {
    background-color: #d82934;
    color: white;
    border: none;
    border-radius: 5px;
  }
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
