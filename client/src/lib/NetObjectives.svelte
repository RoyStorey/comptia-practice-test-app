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
    <h4>N10-008 (Network+) Exam Objectives</h4>
    <ol>
      {#each ["Networking Concepts", "Infrastructure", "Network Operations", "Network Security", "Network Troubleshooting and Tools"] as objective}
        <button
          class:selected={selectedObjective === objective}
          on:click={() => setObjective(objective)}
        >
          {objective}
        </button>
      {/each}
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
