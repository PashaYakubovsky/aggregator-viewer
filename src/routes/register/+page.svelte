<script lang="ts">
	import { goto, invalidate, pushState } from '$app/navigation';
	import { register } from '$lib/login';
	import { fade } from 'svelte/transition';

	let isLoading = false;
	let errorMessage = '';

	/** @type {import('./$types').ActionData} */
	export let form;

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const target = event.target as HTMLFormElement;
		// @ts-ignore
		const username = target.name.value;
		const password = target.password.value;
		const confirmPassword = target.cpassword.value;
		if (password !== confirmPassword) {
			errorMessage = 'Passwords do not match';
			return;
		}
		isLoading = true;
		const token = (await register(username, password)) || '';
		if (token) {
			localStorage.setItem('token', token);
			await invalidate('/');
			await goto('/');
		}
		isLoading = false;
	}
</script>

<svelte:head>
	<title>Registration</title>
</svelte:head>

<div
	class="min-h-screen bg-gradient-to-br from-black to-blue-500 flex items-center justify-center p-4"
>
	<div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md" in:fade={{ duration: 300 }}>
		<h2 class="text-3xl font-bold text-center text-gray-800 mb-8">Create an account</h2>
		<form on:submit={handleSubmit} class="space-y-6">
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
			<div>
				<label for="cpassword" class="block text-sm font-medium text-gray-700">
					Confirm Password
				</label>
				<input
					id="cpassword"
					name="cpassword"
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
					class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-950 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
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
						Submit
					{/if}
				</button>
			</div>
		</form>
	</div>
</div>
