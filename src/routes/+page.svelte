<script lang="ts">
	import { onMount } from 'svelte';
	import { GetAggregationsAndUsersStore } from '$houdini';
	import Main from '$lib/aggregator/Main.svelte';
	import { sessionStore } from '../stores/session';

	let isLoading = true;
	let data = new GetAggregationsAndUsersStore();
	let aggregations: Aggregation[] = [];
	let users: User[] = [];

	onMount(() => {
		try {
			data
				.fetch({
					variables: {
						skip: 0,
						take: 1000,
						subscribedTopics: $sessionStore.user?.subscribedTopics || []
					}
				})
				.then((r) => {
					let aggrRes = r.data?.getAggregations || [];
					aggregations = aggrRes.map(
						(a) =>
							({
								...a,
								createdAt: new Date((a?.createdAtTime || 0) * 1000)
							}) as Aggregation
					);
					users = r.data?.getUsers || [];
					isLoading = false;
				});
		} catch (err) {
			console.error(err);
		}
	});
</script>

<svelte:head>
	<title>Aggregator</title>
</svelte:head>

{#if !isLoading && $sessionStore.user}
	<Main
		data={{
			aggregations,
			users,
			user: $sessionStore.user
		}}
	/>
{:else}
	<p>loading...</p>
{/if}
