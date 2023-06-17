<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData; // locals.user == data.user?
</script>

<h1>Hello {data.user.username} with ID {data.user.id}!</h1>

<form method="post" action="?/logout">
    <button type="submit">Log Out</button>
</form>

