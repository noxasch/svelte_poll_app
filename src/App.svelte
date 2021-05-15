<script>
	import { tabItems } from "$src/stores/tabStore"
	import Header from "$src/layouts/Header.svelte";
	import Footer from "$src/layouts/Footer.svelte";
	import Tabs from "$src/components/Tabs.svelte";



	$: currentTab = $tabItems.find((item) => item.isActive).tab;

	function tabSelect(event) {
		const selectedIndex = $tabItems.findIndex((item) => item.isActive);
		tabItems.update((prevTabItems) => {
			prevTabItems[selectedIndex].isActive = false;
			prevTabItems[event.detail.index].isActive = true;
			return prevTabItems;
		});
	}

	function addPoll() {
		tabSelect({ detail: { index: $tabItems.findIndex((item) => item.name === 'Current Polls') }})
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
	<Tabs on:tabSelect={tabSelect}/>
	<svelte:component 
		this={currentTab} 
		on:add={addPoll} 
		on:vote={upvote}
	/>
</main>
<Footer />

<style>
	main {
		max-width: 960px;
		margin: 40px auto;
	}
</style>