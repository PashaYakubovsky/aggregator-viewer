<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { Loader2 } from 'lucide-svelte';

	export let selectedItem: Aggregation | null;

	let isImgLoaded = false;
	let isImgError = true;

	$: if (selectedItem) {
		isImgError = false;
		isImgLoaded = false;
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
	id="aggregated-item-viewer-container"
	class="w-full flex flex-col items-center justify-top overflow-hidden h-full relative z-10 space-y-4 pt-4"
>
	{#if selectedItem}
		<h2
			in:fly={{ y: -20, duration: 300 }}
			class="text-xl font-semibold text-gray-200 text-center px-4 max-w-[80vw]"
		>
			{selectedItem.name}
		</h2>

		{#if selectedItem.subreddit}
			<!-- show badge -->
			<div class="flex items-center space-x-2 px-4 py-2">
				<div
					in:fade={{ duration: 300 }}
					class="flex items-center space-x-2 px-4 py-2 bg-gray-800 bg-opacity-50 rounded-md"
				>
					<span class="text-sm text-gray-400">r/{selectedItem.subreddit}</span>
				</div>

				<!-- show go to comments badge -->

				<a
					href={`https://www.reddit.com${selectedItem.permalink}`}
					target="_blank"
					rel="noopener noreferrer"
					class="text-sm text-gray-400 hover:text-gray-200"
				>
					Go to comments
				</a>
			</div>
		{/if}

		{#if selectedItem.selftextHtml}
			{@const cleanedHtml = selectedItem.selftextHtml
				.replace(/<!-- SC_OFF -->|<!-- SC_ON -->/g, '')
				.replace(/&lt;/g, '<')
				.replace(/&gt;/g, '>')
				.replace(/&amp;/g, '&')}

			{@const contentMatch = cleanedHtml.match(/<div class="md">([\s\S]*?)<\/div>/)}
			{@const innerContent = contentMatch ? contentMatch[1] : ''}

			<div
				class="text-sm text-gray-400 max-h-[50svh] overflow-y-scroll w-[80vw]"
				in:fade={{ duration: 300 }}
			>
				{@html innerContent}
			</div>
		{/if}

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
		{:else if !isImgLoaded && selectedItem.imageUrl}
			<div in:fade={{ duration: 300 }} class="text-blue-400 flex items-center space-x-2">
				<Loader2 class="animate-spin" />
				<span>Loading...</span>
			</div>
		{/if}
	{:else}
		<div class="text-gray-400">No item selected</div>
	{/if}
</div>
