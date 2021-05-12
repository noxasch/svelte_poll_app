<script>
  import { createEventDispatcher } from "svelte";
  import pollStore from "../stores/pollStore";
  import Card from "./Card.svelte";

  const dispatch = createEventDispatcher();

  export let poll = {};
  $: totalVotes = poll.votesA + poll.votesB;
  $: percentA = (poll.votesA / totalVotes).toFixed(2) * 100;
  $: percentB = (poll.votesB / totalVotes).toFixed(2) * 100;

  function upvote(answer, pollId) {
    const updatedPoll = $pollStore.find((poll) => poll.id === pollId);
    const index = $pollStore.findIndex((poll) => poll.id === pollId);
    if (answer === 'a') updatedPoll.votesA = updatedPoll.votesA + 1;
    if (answer === 'b') updatedPoll.votesB = updatedPoll.votesB + 1;
    pollStore.update((prevPolls) => {
      const updatedPolls = prevPolls;
      updatedPolls[index] = updatedPoll;
      return updatedPolls;
    });
  }
</script>

<Card>
  <div class="poll">
    <h3>{ poll.question }</h3>
    <p>Total votes: { totalVotes }</p>
    <div class="answer" on:click={upvote('a', poll.id)}>
      <div class="percent percent-a" style="width: {percentA}%"></div>
      <span>{ poll.answerA } ({ poll.votesA })</span>
    </div>
    <div class="answer" on:click={upvote('b', poll.id)}>
      <div class="percent percent-b" style="width: {percentB}%"></div>
      <span>{ poll.answerB } ({ poll.votesB })</span>
    </div>
  </div>
</Card>


<style>
  h3{
    margin: 0 auto;
    color: #555;
  }
  p{
    margin-top: 6px;
    font-size: 14px;
    color: #aaa;
    margin-bottom: 30px;
  }
  .answer{
    background: #fafafa;
    cursor: pointer;
    margin: 10px auto;
    position: relative;
  }
  .answer:hover{
    opacity: 0.6;
  }
  span{
    display: inline-block;
    padding: 10px 20px;
  }
  .percent {
    height: 100%;
    position: absolute;
    box-sizing: border-box;
  }
  .percent-a { 
    border-left: 4px solid #d91b42;
    background-color: rgba(217, 27, 66, 0.2);
  }
  .percent-b { 
    border-left: 4px solid #45c469;
    background-color: rgba(69, 196, 160, 0.2);
  }
</style>