<script lang="ts">
	import { goto } from '$app/navigation';
	import { login } from '$lib/login';
	import { fade } from 'svelte/transition';

	/** @type {import('./$types').ActionData} */
	export let form;

	let isLoading = false;
	let errorMessage = '';

	async function handleLogin(event: Event) {
		event.preventDefault();
		isLoading = true;
		errorMessage = '';

		debugger;

		const target = event.target as HTMLFormElement;
		// @ts-ignore
		const name = target.name.value;
		const password = target.password.value;

		try {
			const token = await login(name, password);

			if (token) {
				localStorage.setItem('token', token);
				goto('/');
			} else {
				errorMessage = 'Incorrect username or password';
			}
		} catch (err) {
			console.error(err);
			errorMessage = 'An error occurred. Please try again.';
		} finally {
			isLoading = false;
		}
	}

	function handleRegister() {
		goto('/register');
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div
	class="min-h-screen bg-gradient-to-br from-black to-blue-500 flex items-center justify-center p-4"
>
	<div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md" in:fade={{ duration: 300 }}>
		<h2 class="text-3xl font-bold text-center text-gray-800 mb-8">Welcome Back</h2>
		<form on:submit={handleLogin} class="space-y-6">
			<div>
				<label for="name" class="block text-sm font-medium text-gray-700">Username</label>
				<input
					id="name"
					name="name"
					type="text"
					required
					class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
				/>
			</div>
			<div>
				<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
				/>
			</div>
			{#if errorMessage}
				<p class="text-red-500 text-sm">{errorMessage}</p>
			{/if}
			<div class="flex items-center justify-between">
				<button
					type="submit"
					class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-950 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all"
					disabled={isLoading}
				>
					{#if isLoading}
						<svg
							class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						Logging in...
					{:else}
						Log in
					{/if}
				</button>
			</div>
		</form>
		<div class="mt-2">
			<button
				on:click={handleRegister}
				class="w-full text-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-sky-950 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all"
			>
				Create an account
			</button>
		</div>
	</div>
</div>
