<script lang="ts">
  import type { PageData, ActionData } from "./$types";

  //export let data: PageData;

  export let form: ActionData;
</script>

<h1>Login</h1>

{#if form?.code == 500}
  <div class="container">
    <p>
      ERROR: {form.message}
    </p>
    <form method="post" action="?/login">
      E-mail: <input name="email" class="email-input" /> <br />
      Password: <input name="password" class="pswd-input" /> <br />
      <button type="submit">Submit</button>
    </form>

  </div>
{:else}
  <div class="container">
    <form method="post" action="?/login">
      E-mail: <input name="email" class="email-input" /> <br />
      Password: <input name="password" class="pswd-input" /> <br />
      <button type="submit">Submit</button>
    </form>
  </div>
{/if}
