<script>
  import { tweened } from "svelte/motion";
  import pollStore from "../stores/pollStore";
  import Card from "./Card.svelte";

  export let poll = {};
  $: totalVotes = poll.votesA + poll.votesB;
  $: percentA = ((poll.votesA / totalVotes).toFixed(2) * 100) || 0; // in case of 0/0 = NaN
  $: percentB = ((poll.votesB / totalVotes).toFixed(2) * 100) || 0;

  const tweenA = tweened(0);
  const tweenB = tweened(0);
  $: tweenA.set(percentA);
  $: tweenB.set(percentB);
  // $: console.log(poll.question, percentA, percentB);

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

  function onDelete(pollId) {
    pollStore.update((prevPolls) => {
      const updatePolls = prevPolls;
      const index = updatePolls.findIndex((poll) => poll.id === pollId);
      updatePolls.splice(index,1);
      return updatePolls;
    })
  }
</script>

<Card>
  <div class="poll">
    <span class="delete-circle" on:click={onDelete(poll.id)} title="delete">&#10005;</span>
    <h3>{ poll.question }</h3>
    <p>Total votes: { totalVotes }</p>
    <div class="answer" on:click={upvote('a', poll.id)}>
      <div class="percent percent-a" style="width: {$tweenA}%"></div>
      <span>{ poll.answerA } ({ poll.votesA })</span>
    </div>
    <div class="answer" on:click={upvote('b', poll.id)}>
      <div class="percent percent-b" style="width: {$tweenB}%"></div>
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
  .delete {
    margin-top: 30px;
    text-align: center;
  }
  .poll {
    position: relative;
  }
  .delete-circle {
    display: block;
    border-radius: 50%;
    border: 1px solid #d91b42;
    float: right;
    width: 20px;
    height: 20px;
    padding: 0;
    text-align: center;
    cursor: pointer;
    color: #fff;
    background-color: #d91b42;
  }
</style>