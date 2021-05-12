<script>
  import pollStore from "../stores/pollStore";
  import Poll from "./Poll.svelte";
</script>

<div class="poll-list">
  {#each $pollStore as poll}
    <div>
      <Poll {poll} on:vote />
    </div>
    <!-- <div data-id="{poll.id}">{poll.question}</div> -->
    
  {/each}
</div>

<style>
  .poll-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
  }
</style>

