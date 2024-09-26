<script lang="ts">
	import { onMount } from 'svelte';
	import type { getAggregationsQueryStore } from '$houdini';
	import dayjs from 'dayjs';
	import Fuse from 'fuse.js';
	import AggregatedItemViewer from '$lib/timeline/AggregatedItemViewer.svelte';
	import Timeline from '$lib/timeline/Timeline.svelte';
	import { timelineStore } from '../stores/timeline.store.js';
	import { browser } from '$app/environment';

	let timeRangeStart = new Date().getTime();
	let timeRangeEnd = timeRangeStart + 1000 * 60 * 60 * 24;

	/* @type { import('./$houdini').PageData } */
	export let data;

	let queryStore: getAggregationsQueryStore | undefined;
	let aggregations: Aggregation[] = [];

	onMount(() => {
		const init = async () => {
			const { getAggregationsQuery } = data as import('./$houdini').PageData;
			queryStore = getAggregationsQuery;
			let listOfAggregations = $queryStore?.data?.getAggregations as unknown as Aggregation[];
			listOfAggregations.sort(
				(a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
			);

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

<!-- display item -->
<div class="flex flex-col h-[100svh]">
	{#if browser}
		<AggregatedItemViewer selectedItem={$timelineStore.selectedItem} />
	{/if}
	<Timeline {aggregations} {timeRangeStart} {timeRangeEnd} {handleSearch} />
</div>
