<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { Loader2 } from 'lucide-svelte';

	export let selectedItem: Aggregation | null;

	let isImgLoaded = false;
	let isImgError = false;

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

<div
	class="max-h-[calc(100vh-16rem)] w-full flex flex-col items-center justify-center overflow-hidden h-full relative z-10 space-y-4 pt-4"
>
	{#if selectedItem}
		<h2
			in:fly={{ y: -20, duration: 300 }}
			class="text-xl font-semibold text-gray-200 text-center px-4"
		>
			{selectedItem.name}
		</h2>

		{#if selectedItem.imageUrl && !isImgError}
			<div
				class="w-full h-full flex items-center justify-center overflow-hidden"
				in:fade={{ duration: 300 }}
			>
				<img
					on:load={handleImageLoad}
					on:error={handleImageError}
					class="w-full h-auto max-h-[calc(100%-2rem)] object-contain rounded-lg shadow-lg"
					src={selectedItem.imageUrl}
					alt={selectedItem.name}
				/>
			</div>
		{/if}

		{#if isImgError}
			<div
				in:fade={{ duration: 300 }}
				class="text-red-400 bg-red-900 bg-opacity-50 px-4 py-2 rounded-md"
			>
				Error loading image
			</div>
		{:else if !isImgLoaded}
			<div in:fade={{ duration: 300 }} class="text-blue-400 flex items-center space-x-2">
				<Loader2 class="animate-spin" />
				<span>Loading...</span>
			</div>
		{/if}
	{:else}
		<div class="text-gray-400">No item selected</div>
	{/if}
</div>
