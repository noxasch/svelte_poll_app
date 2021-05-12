<script>
import Header from "./layouts/Header.svelte";
import Footer from "./layouts/Footer.svelte";
import Tabs from "./components/Tabs.svelte";
import CurrentPolls from "./components/CurrentPolls.svelte";
import AddNewPolls from "./components/AddNewPolls.svelte";

let tabItems = [
	{name: 'Current Polls', isActive: true, tab: CurrentPolls},
	{name: 'Add New Poll', isActive: false, tab: AddNewPolls}
];

let polls = [
	{	
		id: 1,
		question: 'Python or JavaScript',
    answerA: 'Python',
    answerB: 'JavaScript',
		votesA: 9, 
		votesB: 15, 
	}
];

$: currentTab = tabItems.find((item) => item.isActive).tab;

function tabSelect(event) {
	const selectedIndex = tabItems.findIndex((item) => item.isActive);
  tabItems[selectedIndex].isActive = false;
  tabItems[event.detail.index].isActive = true;
}

function addPoll(event) {
	polls[polls.length] = event.detail.poll;
	tabSelect({ detail: { index: tabItems.findIndex((item) => item.name === 'Current Polls') }})
}

function upvote(event) {
	const { answer, pollId } = event.detail;
	const updatedPoll = polls.find((poll) => poll.id === pollId);
	const index = polls.findIndex((poll) => poll.id === pollId);
	if (answer === 'a') updatedPoll.votesA = updatedPoll.votesA + 1;
	if (answer === 'b') updatedPoll.votesB = updatedPoll.votesB + 1;
	polls[index] = updatedPoll;
}

</script>

<Header />
<main>
	<Tabs {tabItems} on:tabSelect={tabSelect}/>
	<svelte:component 
		this={currentTab} 
		polls={currentTab == CurrentPolls ? polls : null} 
		on:add={addPoll} 
		on:vote={upvote}
	/>
</main>
<Footer />

<style>
	main {
		max-width: 960px;
		margin: 40px;
	}
</style>