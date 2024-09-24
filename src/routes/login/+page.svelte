<script lang="ts">
	import { goto } from '$app/navigation';
	import { login } from '$lib/login';

	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div>
	<form method="POST">
		{#if form?.missing}<p class="error">The name field is required</p>{/if}
		{#if form?.incorrect}<p class="error">Invalid credentials!</p>{/if}

		<label>
			User name
			<input name="name" type="text" value={form?.name ?? ''} />
		</label>
		<label>
			Password
			<input name="password" type="password" />
		</label>
		<button
			on:submit={async () => {
				const name = form.name;
				const password = form.password;

				const token = await login(name, password);
				if (token) {
					localStorage.setItem('token', token || '');
					goto('/');
				} else {
					form.incorrect = true;
				}
			}}
			type="submit">Log in</button
		>
	</form>
</div>

<style>
	div {
		height: 100svh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	form {
		display: grid;
		gap: 1em;
		max-width: 20em;
		height: fit-content;
		margin: 0 auto;
		color: white;
		margin: auto;
	}
	label {
		display: grid;
		gap: 0.5em;
	}
	input {
		padding: 0.5em;
	}
	button {
		padding: 0.5em;
		background-color: #333;
		color: white;
		border: none;
	}
	button:hover {
		background-color: #444;
	}
	button:active {
		background-color: #555;
	}
</style>
