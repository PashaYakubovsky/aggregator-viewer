<script lang="ts">
	import { register } from '$lib/login';
	let username = '';
	let password = '';
	let confirmPassword = '';

	async function handleSubmit() {
		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}
		const token = (await register(username, password)) || '';
		if (token) {
			localStorage.setItem('token', token);
			window.location.href = '/';
		}
	}
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<!-- register form -->
<div class="container">
	<form on:submit|preventDefault={handleSubmit}>
		<div class="container-input">
			<label for="username">Username:</label>
			<input type="text" id="username" bind:value={username} required />
		</div>
		<div class="container-input">
			<label for="password">Password:</label>
			<input type="password" id="password" bind:value={password} required />
		</div>
		<div class="container-input">
			<label for="confirmPassword">Confirm Password:</label>
			<input type="password" id="confirmPassword" bind:value={confirmPassword} required />
		</div>
		<button type="submit">Register</button>
	</form>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		color: white;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.container-input {
		display: flex;
		flex-direction: column;
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
