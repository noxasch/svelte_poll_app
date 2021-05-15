<script>
  import { createEventDispatcher } from 'svelte';
  import pollStore from "$src/stores/pollStore";
  import CustomButton from "$src/components/CustomButton.svelte";
  
  const dispatch = createEventDispatcher();

  const fields = {
    question: '',
    answerA: '',
    answerB: '',
  };

  const errors = {
    question: '',
    answerA: '',
    answerB: '',
  };

  let isValid = false;

  function mongoObjectId () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
  };

  function validateForm() {
    if (fields.question.trim().length < 5) {
      errors.question = 'Question must contain at least 5 character';
    } else {
      errors.question = '';
    }
    // validate answer a
    if (fields.answerA.trim().length < 1) {
      errors.answerA = 'Answer A cannot be empty';
    } else {
      errors.answerA = '';
    }
    // validate answer b
    if (fields.answerB.trim().length < 1) {
      errors.answerB = 'Answer B cannot be empty';
    } else {
      errors.answerB = '';
    }

    if (errors.question === '' && errors.answerA === '' && errors.answerB === '')
      return true;
    return false
  }

  function onSubmit() {
    isValid = validateForm();
    if (isValid) {
      const poll = { ...fields, votesA: 0, votesB: 0, id: mongoObjectId() };
      pollStore.update((data) => {
        return [...data, poll]
      });
      dispatch('add');
    }
  }

</script>

<form on:submit|preventDefault="{onSubmit}">
  <div class="form-field">
    <label for="question">Poll Question:</label>
    <input type="text" id="question" bind:value="{fields.question}">
    <div class="error">{ errors.question }</div>
  </div>
  <div class="form-field">
    <label for="answer-a">Answer A:</label>
    <input type="text" id="answer-a" bind:value="{fields.answerA}">
    <div class="error">{ errors.answerA }</div>
  </div>
  <div class="form-field">
    <label for="answer-b">Answer B:</label>
    <input type="text" id="answer-b" bind:value="{fields.answerB}">
    <div class="error">{ errors.answerB }</div>
  </div>
  <CustomButton type="secondary" flat={true}>
    Add Poll
  </CustomButton>
</form>

<style>
  form {
    width: 400px;
    margin: 0 auto;
    text-align: center;
  }

  .form-field {
    margin: 18px auto;

  }

  input {
    width: 100%;
    border-radius: 6px;
  }

  label {
    margin: 10px auto;
    text-align: left;
  }

  .error {
    font-weight: bold;
    font-size: 12px;
    color: #d91b42;
    text-align: left;
  }
</style>