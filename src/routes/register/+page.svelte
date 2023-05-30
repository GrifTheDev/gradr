<script lang="ts">
  import type { ActionData } from "./$types";

  export let form: ActionData;
  let showPswd = false;

  $: type = showPswd ? "text" : "password";
</script>

<h1>Register</h1>

{#if form?.message}
  <p>
    ({form.code}) The server responded with an error: {form.message}
  </p>
{/if}

<div class="container">
  <form method="post" action="?/register">
    Username: <input name="username" class="username-input" /> <br />
    E-mail: <input name="email" class="email-input" /> <br />
    Password:
    <input {type} autocomplete="off" name="password" class="pswd-input" />
    <br />
    Confirm Password:
    <input
      {type}
      autocomplete="off"
      name="confirm-password"
      class="pswd-input"
    /> <br />
    <input type="checkbox" on:click={() => (showPswd = !showPswd)} />Show
    Password <br />
    <button type="submit">Submit</button>
  </form>
</div>
