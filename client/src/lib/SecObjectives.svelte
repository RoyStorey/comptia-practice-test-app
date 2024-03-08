<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let selectedObjective = ''; 

  function setObjective(objective: string) {
    selectedObjective = objective; 
    dispatch("nut", { objective }); 
  }
</script>

<div class="objective-holder">
  <div>
    <h4>SY0-601 (Security+) Exam Objectives</h4>
    <ol>
      <button
        class:selected={selectedObjective === "Threats, Attacks, and Vulnerabilities"}
        on:click={() => setObjective("Threats, Attacks, and Vulnerabilities")}>
        Threats, Attacks, and Vulnerabilities
      </button>
      <button
        class:selected={selectedObjective === "Technologies and Tools"}
        on:click={() => setObjective("Technologies and Tools")}>
        Technologies and Tools
      </button>
      <button
        class:selected={selectedObjective === "Architecture and Design"}
        on:click={() => setObjective("Architecture and Design")}>
        Architecture and Design
      </button>
      <button
        class:selected={selectedObjective === "Identity and Access Management"}
        on:click={() => setObjective("Identity and Access Management")}>
        Identity and Access Management
      </button>
      <button
        class:selected={selectedObjective === "Risk Management"}
        on:click={() => setObjective("Risk Management")}>
        Risk Management
      </button>
      <button
        class:selected={selectedObjective === "Cryptography and PKI"}
        on:click={() => setObjective("Cryptography and PKI")}>
        Cryptography and PKI
      </button>
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
  .selected {
    background-color: #d82934;
    color: white;
  }
</style>
