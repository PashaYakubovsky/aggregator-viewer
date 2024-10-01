<script lang="ts">
	import { goto, invalidate, pushState } from '$app/navigation';
	import Button from '$lib/common/Button.svelte';
	import { register } from '$lib/login';
	import { fade } from 'svelte/transition';
	import { sessionStore } from '../../stores/session';

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

			const pToken = JSON.parse(atob(token.split('.')[1]));
			sessionStore.update((s) => ({ ...s, user: pToken }));

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
					autocomplete="username"
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
					autocomplete="new-password"
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
					autocomplete="new-password"
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
				<Button rounded="md" type="submit" text="Login" {isLoading} />
			</div>
		</form>
	</div>
</div>
