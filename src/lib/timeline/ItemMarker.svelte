<script lang="ts">
	export let meme: Meme;
	export let timeRangeStart: number;
	export let timeRangeEnd: number;

	let leftPx = 0;

	$: leftPx = ((meme.createdAt.getTime() - timeRangeStart) / (timeRangeEnd - timeRangeStart)) * 100;
</script>

<button style="left: {leftPx}%" class="marker-inner"></button>

<style>
	.marker-inner {
		height: 100%;
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
