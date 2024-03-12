<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let selectedObjective = "";

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
        class:selected={selectedObjective ===
          "Threats, Attacks, and Vulnerabilities"}
        on:click={() => setObjective("Threats, Attacks, and Vulnerabilities")}
      >
        Threats, Attacks, and Vulnerabilities
      </button>
      <button
        class:selected={selectedObjective === "Architecture and Design"}
        on:click={() => setObjective("Architecture and Design")}
      >
        Architecture and Design
      </button>
      <button
        class:selected={selectedObjective === "Implementation"}
        on:click={() => setObjective("Implementation")}
      >
        Implementation
      </button>
      <button
        class:selected={selectedObjective ===
          "Operations and Incident Response"}
        on:click={() => setObjective("Operations and Incident Response")}
      >
        Operations and Incident Response
      </button>
      <button
        class:selected={selectedObjective ===
          "Governance, Risk, and Compliance"}
        on:click={() => setObjective("Governance, Risk, and Compliance")}
      >
        Governance, Risk, and Compliance
      </button>
    </ol>
  </div>
</div>

<style>
  .objective-holder {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-self: center;
    height: 100%;
    justify-content: center;
    flex: 1;
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
