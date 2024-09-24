<script lang="ts">
	import { onMount } from 'svelte';
	import { token } from '../stores/auth';
	import { goto } from '$app/navigation';

	onMount(() => {
		// get token from /static/token.json
		// if token is not available, redirect to login page
		// fetch('/token.json')
		// 	.then(async (res) => {
		// 		const data = (await res.json()) as { access_token: string };
		// 		localStorage.setItem('token', data.access_token);
		// 		token.set(data.access_token);
		// 		// parse token and check exp date
		// 		const pToken = JSON.parse(atob(data.access_token.split('.')[1]));
		// 		const time = Date.now();
		// 		console.log('Token expires at:', new Date(pToken.exp * 1000));
		// 		const isNotLoginPage = window.location.pathname !== '/login';
		// 		if (time >= pToken.exp * 1000 && isNotLoginPage) {
		// 			goto('/login');
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		console.error('Error fetching token', err);
		// 	});
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
		rel="stylesheet"
	/>
	<title>Aggregator viewer</title>
</svelte:head>

{#if $token}
	<slot />
{:else}
	<p>Redirecting...</p>
{/if}

<style>
	:global(body),
	:global(html) {
		height: 100svh;
		margin: 0;
		background-color: rgb(19, 18, 18);
		overflow: hidden;
		font-family: 'Open Sans', sans-serif;
	}
	:global(body) {
		overflow: overlay;
	}
	:global(button) {
		border: none;
		padding: 0;
		margin: 0;
		cursor: pointer;
	}

	:global(::-webkit-scrollbar) {
		width: 10px;
		height: 10px;
	}

	:global(::-webkit-scrollbar-thumb) {
		background: rgba(90, 90, 90);
	}

	:global(::-webkit-scrollbar-track) {
		background: rgba(0, 0, 0, 0.2);
	}
</style>
