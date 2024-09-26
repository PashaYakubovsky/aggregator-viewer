<script lang="ts">
	import { onMount } from 'svelte';
	import { token as tokenStore } from '../stores/auth';
	import { goto } from '$app/navigation';
	import '../app.css';

	onMount(() => {
		try {
			// check if token is available
			const token = localStorage.getItem('token') || '';
			if (!token) {
				goto('/login');
			}

			// parse token and check exp date
			const pToken = JSON.parse(atob(token.split('.')[1]));
			const time = Date.now();
			console.log('Token expires at:', new Date(pToken.exp * 1000));
			const isNotLoginPage = window.location.pathname !== '/login';

			tokenStore.set(token);

			if (time >= pToken.exp * 1000 && isNotLoginPage) {
				window.location.href = '/login';
			}
		} catch (err) {
			console.error(err);
		}
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

{#if $tokenStore}
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
