<script>
  import { goto } from "$app/navigation";

    export function goToLogin() {
        goto("/login")
    }
</script>


<h1>An about page</h1>
<p>Want to get started for free?</p>
<button on:click={goToLogin}>Sign in</button>
