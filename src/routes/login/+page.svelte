<script lang="ts">
	import { goto } from '$app/navigation';
	import { login } from '$lib/login';
	import { onMount } from 'svelte';

	let form = {
		name: '',
		password: '',
		missing: false,
		incorrect: false
	};

	onMount(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				e.stopPropagation();
				const button = document.querySelector('button');
				if (button) {
					button.click();
				}
			}
		};

		document.addEventListener('keypress', handleKeyPress);

		return () => {
			document.removeEventListener('keypress', handleKeyPress);
		};
	});
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="container">
	<div class="form">
		{#if form?.missing}<p class="error">The name field is required</p>{/if}
		{#if form?.incorrect}<p class="error">Invalid credentials!</p>{/if}

		<label>
			User name
			<input
				required
				on:input={(e) => {
					const target = e.currentTarget as HTMLInputElement;
					form.name = target.value || '';
					form.missing = false;
				}}
				name="name"
				type="text"
				value={form?.name ?? ''}
			/>
		</label>
		<label>
			Password
			<input
				required
				on:input={(e) => {
					const target = e.currentTarget as HTMLInputElement;
					form.password = target.value || '';
					form.missing = false;
				}}
				name="password"
				type="password"
			/>
		</label>
		<button
			disabled={!form?.name || !form?.password}
			on:click={async () => {
				const name = form.name;
				const password = form.password;

				const token = await login(name, password);
				if (token) {
					localStorage.setItem('token', token);
					goto('/');
				} else {
					form.incorrect = true;
				}
			}}>Log in</button
		>
	</div>
</div>

<style>
	.container {
		height: 100svh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.form {
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
