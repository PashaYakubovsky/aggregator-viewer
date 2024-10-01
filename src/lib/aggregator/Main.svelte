<script lang="ts">
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';
	import Fuse from 'fuse.js';
	import AggregatedItemViewer from '$lib/timeline/AggregatedItemViewer.svelte';
	import Timeline from '$lib/timeline/Timeline.svelte';
	import { timelineStore } from '../../stores/timeline.store.js';
	import { browser } from '$app/environment';
	import SettingsWidget from '$lib/settings/SettingsWidget.svelte';
	import { sessionStore } from '../../stores/session.js';

	let timeRangeStart = new Date().getTime();
	let timeRangeEnd = timeRangeStart + 1000 * 60 * 60 * 24;

	/* @type { import('./$houdini').PageData } */
	export let data: { aggregations: Aggregation[]; users: User[]; user: User };

	let aggregations: Aggregation[] = [];
	let currentUser: User | null = null;

	onMount(() => {
		const init = async () => {
			let listOfAggregations = data.aggregations;

			// get current user
			try {
				currentUser = JSON.parse(localStorage.getItem('session') || 'null');
			} catch (err) {
				console.error(err);
			}

			// sort aggregations by createdAt
			listOfAggregations.sort(
				(a, b) => dayjs(a.createdAtTime * 1000).valueOf() - dayjs(b.createdAtTime * 1000).valueOf()
			);

			// init aggregations timeline
			if (listOfAggregations) {
				let minCreatedAt: number = 0;
				let maxCreatedAt: number = 0;
				for (let i = 0; i < listOfAggregations.length; i++) {
					const aggr = listOfAggregations[i];
					const createdAt = dayjs(aggr.createdAtTime * 1000).valueOf();

					if (i === 0) {
						minCreatedAt = createdAt;
						maxCreatedAt = createdAt;
					}
					if (createdAt < minCreatedAt) {
						minCreatedAt = createdAt;
					}
					if (createdAt > maxCreatedAt) {
						maxCreatedAt = createdAt;
					}
					aggr.createdAt = new Date(createdAt);
				}
				if (minCreatedAt && maxCreatedAt) {
					timeRangeStart = dayjs(minCreatedAt).subtract(5, 'm').valueOf();
					timeRangeEnd = dayjs(maxCreatedAt).add(5, 'm').valueOf();

					const dayMs = 1000 * 60 * 60 * 24;
					const diff = maxCreatedAt - minCreatedAt;
					if (diff < dayMs) {
						timeRangeStart = dayjs(minCreatedAt).subtract(4, 'h').valueOf();
						timeRangeEnd = dayjs(maxCreatedAt).add(4, 'h').valueOf();
					}

					aggregations = listOfAggregations;
				}
			}
		};

		init();
	});

	const fuseOptions = {
		isCaseSensitive: false,
		// includeScore: false,
		// shouldSort: true,
		// includeMatches: false,
		// findAllMatches: false,
		// minMatchCharLength: 1,
		// location: 0,
		// threshold: 0.6,
		// distance: 100,
		// useExtendedSearch: false,
		// ignoreLocation: false,
		// ignoreFieldNorm: false,
		// fieldNormWeight: 1,
		keys: ['from', 'id', 'imageUrl', 'name', 'type']
	};

	const handleSearch = (searchedText: string, timeStep: number) => {
		let fuse = new Fuse(aggregations, fuseOptions);
		const result = fuse.search(searchedText);

		if (result.length > 0) {
			const meme = result[0].item;
			const virtualList = document.querySelector('.virtual-list-wrapper');
			const virtualListInner = document.querySelector('.virtual-list-inner');

			if (virtualList && virtualListInner) {
				// calculate the position of the item in the list
				const ratio = (meme.createdAt.getTime() - timeRangeStart) / (timeRangeEnd - timeRangeStart);

				const offset = ratio * virtualListInner.scrollWidth;
				const halfWidth = virtualList.clientWidth / 2;

				if (virtualList) {
					virtualList.scrollLeft = offset - halfWidth;
				}
			}
		}
	};
</script>

<svelte:head>
	<title>Aggregator</title>
</svelte:head>

{#if currentUser}
	<SettingsWidget user={currentUser} />
{/if}

<!-- display item -->
<div class="flex flex-col h-[100svh]">
	{#if browser}
		<AggregatedItemViewer selectedItem={$timelineStore.selectedItem} />
	{/if}
	<Timeline
		aggregations={aggregations.filter((aggr) => {
			const topics = $sessionStore.topics.filter((t) => t.selected);
			for (let i = 0; i < topics.length; i++) {
				if (`r/${aggr.subreddit}`.includes(topics[i].name)) {
					return true;
				}
			}

			return false;
		})}
		{timeRangeStart}
		{timeRangeEnd}
		{handleSearch}
	/>
</div>
