<script lang="ts">
    import { signIn } from "@auth/sveltekit/client"

    let email: string = "";
    let password: string = "";
</script>

<label for="email">Email:</label>
<input type="email" id="email" bind:value={email} />
<label for="password">Password:</label>
<input type="password" id="password" bind:value={password} />
<button on:click={() => {signIn("credentials", {
    email,
    password
})}}>login</button>
