<script lang="ts">
  import type { ActionData } from "./$types";

  export let form: ActionData;
  let showPswd = false;

  $: type = showPswd ? "text" : "password";
</script>

<div class="register-form">
  <h1>Register</h1>

  {#if form?.message}
    <p class="msg">
      ({form.code}) The server responded with an error: {form.message}
    </p>
  {:else}
    <p>Let's get you up and running!</p>
  {/if}

  <form method="post" action="?/register">
    Name: <br />
    <input name="username" class="username-input" /> <br />
    Email: <br />
    <input name="email" class="email-input" /> <br />
    Password: <br />
    <input {type} autocomplete="off" name="password" class="pswd-input" />
    <br />
    Confirm Password: <br />
    <input
      {type}
      autocomplete="off"
      name="confirm-password"
      class="pswd-input"
    /> <br />
    <input type="checkbox" on:click={() => (showPswd = !showPswd)} />Show
    Password <br />
    <button type="submit">Register</button>
  </form>
</div>

