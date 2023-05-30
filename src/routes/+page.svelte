<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<h1>Hello {data.user.username}!</h1>

<form method="post" action="?/logout">
    <button type="submit">Log Out</button>
</form>

