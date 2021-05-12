<script>
  import { scale, fly } from "svelte/transition";
  import { flip } from "svelte/animate";
  import pollStore from "../stores/pollStore";
  import Poll from "./Poll.svelte";
</script>

<div class="poll-list">
  {#each $pollStore as poll (poll.id)}
    <div in:scale out:fly|local animate:flip="{{duration: 500}}">
      <Poll {poll} on:vote />
    </div>
  {/each}
</div>

<style>
  .poll-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
</style>
