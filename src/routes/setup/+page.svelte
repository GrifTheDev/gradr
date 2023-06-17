<script>
  import { config } from "../../../config";

  let counter = 0;
  let dbg = config.debug;
  let numberOfSubjects = "";
  let messages = ["Please input a positive whole integer as the number of subjects."]

  function increaseCounter() {
    counter++;
  }

  function decreaseCounter() {
    counter--;
  }

  function numSubject () {
    if (numberOfSubjects == null && counter != 0) {
      counter = -1;
    } else {
      counter = 1
    }
  }

  export { counter as counter };
  export { dbg as dbg };
  export { messages as messages }

  // reactive statement
  //$: label = counter == 0 ? "Get Started" : "Continue"

</script>

{#if dbg == true}
  <h3>Debug</h3>

  <p>Counter status: {counter}</p>
  <p>Number of subjects: {numberOfSubjects}</p>
{/if}

<h1>Welcome to Gradr, let's get you up and running!</h1>

{#if counter == 1 || counter == -1}
  <h2>How many subjects do you currently have?</h2>
  <input type="number" bind:value={numberOfSubjects} on:input={numSubject} /> <br />
{/if}

{#if counter == 0 && counter >= 0}
  <button on:click={increaseCounter}>Get Started</button>
{:else if counter > 0}
  <button on:click={decreaseCounter}>Previous</button>
  <button on:click={increaseCounter}>Next</button>
{:else if counter < 0}
  <p>{messages[(-counter) - 1]}</p>
{/if}
