<script>
  let counter = 0;

  function increaseCounter() {
    counter++;
  }

  function decreaseCounter() {
    counter--;
  }

  export { counter as counter };

  // reactive statement
  //$: label = counter == 0 ? "Get Started" : "Continue"
</script>

<h1>Welcome to Gradr, let's get you up and running!</h1>
<p>{counter}</p>

{#if counter == 0}
  <button on:click={increaseCounter}>Get Started</button>
{:else}
  <button on:click={decreaseCounter}>Previous</button>
  <button on:click={increaseCounter}>Next</button>
{/if}
