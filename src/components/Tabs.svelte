<script>
import { createEventDispatcher } from 'svelte';
import { tabItems } from "../stores/tabStore"

const dispatch = createEventDispatcher();


function onSelectTab(event) {
  const index = parseInt(event.target.dataset.id);
  dispatch('tabSelect', {
    index: index
  });
}

// onMount(() => {
//   console.log(tabItems);
// });
</script>

<div class="tabs">
  <ul>
    {#each $tabItems as item, index}
      <li class:active="{item.isActive}" data-id="{index}" on:click={onSelectTab}>{item.name}</li>
    {/each}
  </ul>
</div>

<style>
  .tabs {
    margin-bottom: 40px;
  }
  ul { 
    display: flex; 
    justify-content: center;
    padding: 0;
    list-style-type: none;
  }
  li {
    margin: 0 16px;
    font-size: 18px;
    color: #555;
    cursor: pointer;
  }
  .active {
    color: #d91b42;
    border-bottom: 2px solid #d91b42;
  }
</style>