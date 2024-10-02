<script lang="ts">
	import { draggable, type DragOptions } from '@neodrag/svelte';
	import { ChevronLeft, ChevronRight, Search, ZoomIn, ZoomOut } from 'lucide-svelte';

	let options: DragOptions = {
		axis: 'both',
		defaultPosition: { x: 200, y: 500 }
	};

	export let scrollToNextMarker: () => void;
	export let scrollToPrevMarker: () => void;
	export let zoomIn: () => void;
	export let zoomOut: () => void;
	export let search: (text: string) => void;

	let searchedText = '';
	let searchOpen = false;

	const handleSearch = () => {
		searchOpen = !searchOpen;
		search(searchedText);
	};
</script>

<div use:draggable={options} class="timeline-controls">
	<div class="timeline-controls__inner">
		<!-- scroll to next, prev marker -->
		<button
			title="Scroll to previous marker"
			class="timeline-controls__button"
			on:click={scrollToPrevMarker}
		>
			<ChevronLeft pointer-events="none" />
		</button>
		<button
			title="Scroll to next marker"
			class="timeline-controls__button"
			on:click={scrollToNextMarker}
		>
			<ChevronRight pointer-events="none" />
		</button>

		<!-- zoom in, zoom out -->
		<!-- <button title="Zoom in" class="timeline-controls__button" on:click={zoomIn}>
			<ZoomIn pointer-events="none" />
		</button>

		<button title="Zoom out" class="timeline-controls__button" on:click={zoomOut}>
			<ZoomOut pointer-events="none" />
		</button> -->

		<!-- search -->
		<div title="Search" class="timeline-controls__button timeline-controls__search">
			<button on:click={handleSearch}>
				<Search pointer-events="none" />
			</button>

			{#if searchOpen}
				<input
					on:click={(e) => e.stopPropagation()}
					type="text"
					bind:value={searchedText}
					on:input={(e) => {
						e.preventDefault();
						search(searchedText);
					}}
					on:blur={handleSearch}
					placeholder="Search"
					class="timeline-controls__search"
				/>
			{/if}
		</div>
	</div>
</div>

<style>
	.timeline-controls {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		z-index: 10;
		opacity: 0.3;
		width: fit-content;
	}
	.timeline-controls:hover {
		opacity: 1;
	}
	.timeline-controls__inner {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		max-width: 5.5rem;
	}
	.timeline-controls__button {
		background-color: rgba(0, 0, 0, 0.5);
		border: none;
		padding: 0.25rem;
		cursor: pointer;
		border-radius: 0.25rem;
		color: white;
	}
	.timeline-controls__search {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
	.timeline-controls__search input {
		background-color: transparent;
		border: none;
		color: white;
	}
	.timeline-controls__search input:focus {
		outline: none;
	}

	.timeline-controls__button:hover {
		background-color: rgba(0, 0, 0, 0.7);
	}
</style>
