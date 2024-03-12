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
    <h4>220-1001 (Core 1) Exam Objectives</h4>
    <ol>
      <button
        class:selected={selectedObjective === "Mobile Devices"}
        on:click={() => setObjective("Mobile Devices")}
      >
        Mobile Devices
      </button>
      <button
        class:selected={selectedObjective === "Networking"}
        on:click={() => setObjective("Networking")}
      >
        Networking
      </button>
      <button
        class:selected={selectedObjective === "Hardware"}
        on:click={() => setObjective("Hardware")}
      >
        Hardware
      </button>
      <button
        class:selected={selectedObjective ===
          "Virtualization and Cloud Computing"}
        on:click={() => setObjective("Virtualization and Cloud Computing")}
      >
        Virtualization and Cloud Computing
      </button>
      <button
        class:selected={selectedObjective ===
          "Hardware and Network Troubleshooting"}
        on:click={() => setObjective("Hardware and Network Troubleshooting")}
      >
        Hardware and Network Troubleshooting
      </button>
    </ol>
  </div>
  <div>
    <h4>220-1002 (Core 2) Exam Objectives:</h4>
    <ol>
      <button
        class:selected={selectedObjective === "Operating Systems"}
        on:click={() => setObjective("Operating Systems")}
      >
        Operating Systems
      </button>
      <button
        class:selected={selectedObjective === "Security"}
        on:click={() => setObjective("Security")}
      >
        Security
      </button>
      <button
        class:selected={selectedObjective === "Software Troubleshooting"}
        on:click={() => setObjective("Software Troubleshooting")}
      >
        Software Troubleshooting
      </button>
      <button
        class:selected={selectedObjective === "Operational Procedures"}
        on:click={() => setObjective("Operational Procedures")}
      >
        Operational Procedures
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
    background-color: #d7c028;
    color: white;
  }
</style>
