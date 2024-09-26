<script lang="ts">
	export let style: string;
	export let className: string;
	export let time: number;
	export let handleTimeMarkerClick: (e: MouseEvent, time: number) => void;
	export let handleTimelineMousemove: (e: MouseEvent) => void;
</script>

<div id={String(time)} tabindex="-1" {style} class="marker">
	<button
		tabindex="-1"
		on:mousemove={handleTimelineMousemove}
		id={`time-marker-${time} bg-sky-500`}
		on:click={(e) => handleTimeMarkerClick(e, time)}
		title={new Date(time).toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			hour12: true
		})}
		class="marker-inner"
	>
		<div tabindex="-1" class={`marker-inner__badge bg-sky-500 ${className}`}></div>
	</button>
</div>

<style>
	.marker {
		box-sizing: border-box;
		line-height: 50px;
		font-weight: 500;
		text-align: center;
		background-color: transparent;
	}
	.marker-inner {
		height: 100%;
		width: 100%;
		transition: background-color 0.3s;
		background-color: transparent;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		position: relative;
		z-index: 2;
	}
	.marker-inner:hover {
		/* background-color: #d91313; */
	}
	.marker-inner__badge {
		width: 0.25rem;
		margin: 0 auto;
		/* background-color: #d91313; */
	}
	.marker-inner__badge_tiny {
		height: 0.25rem;
	}
	.marker-inner__badge_mid {
		height: 0.5rem;
	}
	.marker-inner__badge_high {
		height: 1rem;
	}
</style>
