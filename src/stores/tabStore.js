import { writable } from "svelte/store";
import CurrentPolls from "../components/CurrentPolls.svelte";
import AddNewPolls from "../components/AddNewPolls.svelte";

export const tabItems = writable([
  { name: 'Current Polls', isActive: true, tab: CurrentPolls },
  { name: 'Add New Poll', isActive: false, tab: AddNewPolls }
]);
