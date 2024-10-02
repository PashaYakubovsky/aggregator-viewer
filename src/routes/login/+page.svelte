<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/common/Button.svelte';
	import { login } from '$lib/login';
	import { fade } from 'svelte/transition';
	import { sessionStore, type Topic } from '../../stores/session';

	let isLoading = false;
	let errorMessage = '';
	let name = '';
	let password = '';

	async function handleLogin(event: Event) {
		event.preventDefault();
		isLoading = true;
		errorMessage = '';
		try {
			const token = await login(name, password);

			if (token) {
				localStorage.setItem('token', token);

				let pToken = JSON.parse(atob(token.split('.')[1]));

				if (!pToken?.subscribedTopics || pToken.subscribedTopics.length === 0) {
					pToken = {
						...pToken,
						subscribedTopics: ['r/ProgrammerHumor', 'r/aww', 'r/AskReddit']
					};
				}

				localStorage.setItem('session', JSON.stringify(pToken));

				sessionStore.update((s) => ({
					...s,
					user: pToken,
					topics: pToken.subscribedTopics.map(
						(t: string) => ({ from: 'reddit', name: t, selected: true }) as Topic
					)
				}));

				return goto('/');
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
		return goto('/register');
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
					bind:value={name}
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
					bind:value={password}
					autocomplete="current-password"
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
				<Button
					rounded="md"
					handleClick={handleLogin}
					type="submit"
					text="Log in"
					{isLoading}
					color="primary"
				/>
			</div>
		</form>
		<div class="mt-2">
			<Button
				rounded="md"
				handleClick={handleRegister}
				text="Create an account"
				color="secondary"
			/>
		</div>
	</div>
</div>
