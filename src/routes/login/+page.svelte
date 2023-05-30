<script lang="ts">
  import type { ActionData } from "./$types";

  export let form: ActionData;
  let showPswd = false;

  $: type = showPswd ? "text" : "password";
</script>

<h1>Login</h1>

{#if form?.message}
  <p>
    ({form.code}) The server responded with an error: {form.message}
  </p>
{/if}

<div class="container">
  <form method="post" action="?/login">
    E-mail: <input name="email" class="email-input" /> <br />
    Password:
    <input {type} autocomplete="off" name="password" class="pswd-input" />
    <br />
    <input type="checkbox" on:click={() => (showPswd = !showPswd)} />Show
    Password <br />
    <button type="submit">Submit</button>
  </form>
</div>
<p>Don't have an account yet? <a href="/register">Register here.</a></p>
