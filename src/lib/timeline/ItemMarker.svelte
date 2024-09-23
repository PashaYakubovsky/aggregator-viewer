<script lang="ts">
	import dayjs from 'dayjs';

	export let aggr: Aggregation;
	export let timeRangeStart: number;
	export let timeRangeEnd: number;
	export let handleClick: (e: MouseEvent, aggr: Aggregation) => void;
	let markerEl: HTMLButtonElement;

	$: if (markerEl) {
		markerEl.style.left = `${((aggr.createdAt.getTime() - timeRangeStart) / (timeRangeEnd - timeRangeStart)) * 100}%`;
	}
</script>

<button
	tabindex="-1"
	on:click={(e) => handleClick(e, aggr)}
	title={dayjs(aggr.createdAtTime * 1000).format('YYYY MMM DD HH:mm:ss')}
	bind:this={markerEl}
	class="marker-inner"
></button>

<style>
	.marker-inner {
		height: 100%;
		min-height: 2rem;
		width: 0.25rem;
		transition: background-color 0.3s;
		position: absolute;
		z-index: 2;
		background-color: aquamarine;
		transition: 0.3s ease-in-out transform;
		z-index: 3;
	}
	.marker-inner:hover {
		transform: scale(1.1);
	}
</style>
