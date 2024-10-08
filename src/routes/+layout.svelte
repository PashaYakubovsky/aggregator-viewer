<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { token as tokenStore } from '../stores/auth';
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import '../app.css';
	import CustomCursor from '$lib/common/CustomCursor.svelte';
	import { rickroll } from '../lib/common/rickroll';
	import { sessionStore } from '../stores/session';

	let rafId: NodeJS.Timeout;

	onMount(() => {
		const init = async () => {
			try {
				const isNotLoginPage = $page.url.pathname !== '/login';
				// check if token is available
				const token = localStorage.getItem('token') || '';
				if (!token) {
					if (isNotLoginPage) {
						await invalidate('/login');
						await goto('/login');
					}
					tokenStore.set(token);
					return;
				}

				// parse token and check exp date
				try {
					let pToken = JSON.parse(atob(token.split('.')[1]));
					const time = Date.now();

					console.log('Token expires at:', new Date(pToken.exp * 1000));

					tokenStore.set(token);
					sessionStore.update((s) => ({ ...s, user: pToken }));

					if (!pToken?.subscribedTopics || pToken.subscribedTopics.length === 0) {
						pToken = {
							...pToken,
							subscribedTopics: ['r/ProgrammerHumor', 'r/aww', 'r/AskReddit']
						};
					}
					localStorage.setItem('session', JSON.stringify(pToken));

					if (time >= pToken.exp * 1000 && isNotLoginPage) {
						await invalidate('/login');
						await goto('/login');
					}
				} catch (err) {
					console.error(err);
				}
			} catch (err) {
				console.error(err);
			}

			if (process.env.NODE_ENV !== 'development') rafId = rickroll.init();
		};

		init();
	});

	onDestroy(() => {
		if (rafId) clearInterval(rafId);
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

{#if $tokenStore || typeof $tokenStore === 'string'}
	<slot />
{:else}
	<p>Redirecting...</p>
{/if}

<CustomCursor />

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
		height: 15px;
	}

	:global(::-webkit-scrollbar-thumb) {
		background: rgba(90, 90, 90);
	}

	:global(::-webkit-scrollbar-track) {
		background: rgba(0, 0, 0, 0.2);
	}
</style>
