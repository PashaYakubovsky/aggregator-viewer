<script lang="ts">
	import { draggable, type DragOptions } from '@neodrag/svelte';

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
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-chevron-right"
			>
				<polyline points="9 18 15 12 9 6"></polyline>
			</svg>
		</button>
		<button
			title="Scroll to next marker"
			class="timeline-controls__button"
			on:click={scrollToNextMarker}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-chevron-left"
			>
				<polyline points="15 18 9 12 15 6"></polyline>
			</svg>
		</button>

		<!-- zoom in, zoom out -->
		<button title="Zoom in" class="timeline-controls__button" on:click={zoomIn}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-zoom-in"
			>
				<circle cx="11" cy="11" r="8"></circle>
				<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
				<line x1="11" y1="8" x2="11" y2="14"></line>
				<line x1="8" y1="11" x2="14" y2="11"></line>
			</svg>
		</button>

		<button title="Zoom out" class="timeline-controls__button" on:click={zoomOut}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-zoom-out"
			>
				<circle cx="11" cy="11" r="8"></circle>
				<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
				<line x1="8" y1="11" x2="14" y2="11"></line>
			</svg>
		</button>

		<!-- search -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<button title="Search" class="timeline-controls__button timeline-controls__search">
			<svg
				role="button"
				tabindex="-1"
				on:click={handleSearch}
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-search"
			>
				<circle cx="11" cy="11" r="8"></circle>
				<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
			</svg>

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
		</button>
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
	.timeline-controls__button:hover .feather {
		color: #6d6b6b;
	}
	.feather {
		display: block;
		transition: 0.3s ease-in-out all;
		width: 1.5rem;
		height: 1.5rem;
	}
	.feather-chevron-left {
		transform: rotate(180deg);
	}
	.feather-chevron-right {
		transform: rotate(180deg);
	}
</style>
