<script lang="ts">
    import { signIn, signOut } from "@auth/sveltekit/client"

	export let data: any;
</script>

<button on:click={() => {signIn("credentials", {
    "email": "",
    "password": ""
})}}>Sign In</button>

{#if data.expires}
    <p>Logged in</p>
    <button on:click={() => {signOut()}}>Sign Out</button>
{/if}
