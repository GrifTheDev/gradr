<script lang="ts">
  import type { ActionData } from "./$types";

  export let form: ActionData;
  let showPswd = false;

  $: type = showPswd ? "text" : "password";
</script>

<div class="login-form">
  <h1>Welcome back!</h1>

  {#if form?.message}
    <p>
      ({form.code}) The server responded with an error: {form.message}
    </p>
  {:else}
    <p>Let's get you logged in.</p>
  {/if}

  <form method="post" action="?/login">
    E-mail: <br />
    <input name="email" class="email-input" /> <br />
    Password: <br />
    <input {type} autocomplete="off" name="password" class="pswd-input" />
    <br />
    <input type="checkbox" on:click={() => (showPswd = !showPswd)} />Show
    Password <br />
    <button type="submit">Login</button>
  </form>
  <p class="reg">Don't have an account yet? <a href="/register">Register here.</a></p>
</div>

<style>
  h1 {
    margin: 0;
  }

  .reg {
    font-size: small;
  }

  .login-form {
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    align-items: center;
    height: 100vh;
  }
</style>
