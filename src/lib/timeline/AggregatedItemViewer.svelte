<script lang="ts">
	import { onMount } from 'svelte';
	import { timelineStore } from '../../stores/timeline.store';

	let isImgLoaded = false;
	let isImgError = false;
	// $: selectedItem = $timelineStore.selectedItem;
	export let selectedItem: Aggregation | null;

	$: {
		isImgLoaded = false;
		isImgError = false;
	}

	function handleImageLoad() {
		isImgLoaded = true;
	}

	function handleImageError(err: Event) {
		console.error(err);
		isImgError = true;
	}
</script>

<div class="aggregated-item">
	{#if selectedItem}
		<div class="aggregated-item__inner-title">{selectedItem}</div>

		{#if selectedItem.imageUrl && !isImgError}
			<img
				on:load={handleImageLoad}
				on:error={handleImageError}
				class="aggregated-item__inner-img"
				src={selectedItem.imageUrl}
				alt={selectedItem.name}
			/>
		{/if}

		{#if isImgError}
			<div class="aggregated-item__error">Error loading image</div>
		{:else if !isImgLoaded}
			<div class="aggregated-item__loading">Loading...</div>
		{/if}
	{/if}
</div>

<style>
	.aggregated-item {
		max-height: calc(100svh - 16rem);
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		height: 100%;
		position: relative;
		z-index: 1;
		gap: 1rem;
		padding-top: 1rem;
	}
	.aggregated-item__inner-title {
		color: white;
		font-size: 1rem;
		line-height: 1.5rem;
		text-align: center;
	}
	.aggregated-item__inner-img {
		width: 100%;
		max-height: calc(100% - 2rem);
		height: auto;
		object-fit: contain;
	}
	.aggregated-item__error,
	.aggregated-item__loading {
		color: white;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
