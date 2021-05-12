<script>
import Poll from "./Poll.svelte";

  export let polls = [];
  console.log(polls);
</script>

<div class="poll-list">
  {#each polls as poll}
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

