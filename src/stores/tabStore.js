import { writable } from "svelte/store";
import CurrentPolls from "$src/components/CurrentPolls.svelte";
import AddNewPolls from "$src/components/AddNewPolls.svelte";

export const tabItems = writable([
  { name: 'Current Polls', isActive: true, tab: CurrentPolls },
  { name: 'Add New Poll', isActive: false, tab: AddNewPolls }
]);
