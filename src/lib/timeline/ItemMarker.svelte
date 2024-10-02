<script lang="ts">
	import dayjs from 'dayjs';

	export let aggr: Aggregation;
	export let timeRangeStart: number;
	export let timeRangeEnd: number;
	export let handleMouseMove: (e: MouseEvent, aggr: Aggregation) => void;
	export let handleClick: (e: MouseEvent, aggr: Aggregation) => void;
	export let handleMouseOut: (e: MouseEvent, aggr: Aggregation) => void;
	export let isSelected: boolean;
	let markerEl: HTMLButtonElement;

	const getColorFromString = (str: string) => {
		// return same color for same subreddit
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		let c = (hash & 0x00ffffff).toString(16).toUpperCase();
		return '#' + '00000'.substring(0, 6 - c.length) + c;
	};

	$: if (markerEl) {
		markerEl.style.left = `${((aggr.createdAt.getTime() - timeRangeStart) / (timeRangeEnd - timeRangeStart)) * 100}%`;
		markerEl.style.backgroundColor = getColorFromString(aggr.subreddit);
	}
</script>

<button
	tabindex="-1"
	on:click={(e) => handleClick(e, aggr)}
	on:mousemove={(e) => handleMouseMove(e, aggr)}
	on:mouseout={(e) => handleMouseOut(e, aggr)}
	on:blur={() => {
		markerEl.blur();
	}}
	title={dayjs(aggr.createdAtTime * 1000).format('YYYY MMM DD HH:mm:ss')}
	bind:this={markerEl}
	class="marker-inner {isSelected ? 'bg-white' : ''}"
></button>

<style>
	.marker-inner {
		height: 100%;
		min-height: 2rem;
		width: 0.25rem;
		transition: background-color 0.3s;
		position: absolute;
		z-index: 2;
		/* background-color: aquamarine; */
		transition: 0.3s ease-in-out transform;
		z-index: 3;
	}
	.marker-inner:hover {
		transform: scale(1.1);
	}
</style>
