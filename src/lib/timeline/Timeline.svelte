<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { Observer } from 'gsap/all';
	import Marker from '$lib/timeline/Marker.svelte';
	import ItemMarker from '$lib/timeline/ItemMarker.svelte';
	import VirtualList from 'svelte-tiny-virtual-list';
	import TimelineControls from '$lib/timeline/TimelineControls.svelte';
	import { timelineStore } from '../../stores/timeline.store';

	gsap.registerPlugin(Observer);

	let width = 500;
	let timeStep = 1000;
	let ITEM_HEIGHT = '50px';
	let ITEM_SIZE = 5;

	export let timeRangeStart = Date.now();
	export let timeRangeEnd = Date.now();
	export let aggregations: Aggregation[] = [];
	export let handleSearch: (searchedText: string, timeStep: number) => void;

	let itemCount = Math.round((timeRangeEnd - timeRangeStart) / timeStep);
	let leftViewportTime = 0;
	let rightViewportTime = 0;
	let middleViewportTime = 0;
	let markerItemsContainerStyle = `width: ${ITEM_SIZE * itemCount}px; position: absolute; top: 0; left: 0;`;

	let timelineTooltip: HTMLDivElement | null = null;
	let itemMarkersEl: HTMLDivElement | null = null;

	const sound = new Audio('/clickSound.mp3');
	let isAudioReady = false;

	function handleResize() {
		width = window.innerWidth;

		const virtualList = document.querySelector('.virtual-list-wrapper');
		if (virtualList) {
			virtualList.scrollLeft = (ITEM_SIZE * itemCount) / 2;
		}

		const virtualListInner = document.querySelector('.virtual-list-inner');
		if (virtualListInner) {
			// resize markers container
			markerItemsContainerStyle = `width: ${virtualListInner.clientWidth}px; position: absolute; top: 0; left: 0;`;
		}
	}

	onMount(() => {
		const selectedItem = $timelineStore.selectedItem;
		if (!selectedItem) {
			// initial call for virtual list
			// update markers container style
			markerItemsContainerStyle = `width: ${ITEM_SIZE * itemCount}px; position: absolute; top: 0; left: 0;`;
			// scroll to first aggr item
			const virtualList = document.querySelector('.virtual-list-wrapper');

			if (virtualList) {
				// scroll to middle
				setTimeout(() => {
					virtualList.scrollLeft = (ITEM_SIZE * itemCount) / 2;
					$timelineStore.selectedItem = aggregations[Math.round(aggregations.length / 2)];
				}, 1000);
			}
		}

		handleResize();

		const handleAudioReady = () => {
			isAudioReady = true;
		};

		// set up gsap observer
		const virtualList = document.querySelector('.virtual-list-wrapper');
		const lerp = (start: number, end: number, t: number) => {
			return start * (1 - t) + end * t;
		};

		const observer = Observer.create({
			target: '.timeline',
			type: 'wheel,touch,pointer',
			wheelSpeed: 1,
			onWheel: (e) => {
				if (!virtualList) return;
				const delta = e.deltaX;
				const offset = virtualList.scrollLeft + delta;
				virtualList.scrollLeft = lerp(virtualList.scrollLeft, offset, 0.5);
			},
			onDrag: (e) => {
				if (!virtualList) return;
				const delta = e.deltaX;
				const offset = virtualList.scrollLeft - delta;
				virtualList.scrollLeft = lerp(virtualList.scrollLeft, offset, 0.5);
			},
			preventDefault: true
		});

		window.addEventListener('resize', handleResize);
		sound.addEventListener('canplaythrough', handleAudioReady);

		return () => {
			window.removeEventListener('resize', handleResize);
			sound.removeEventListener('canplaythrough', handleAudioReady);
			observer.kill();
		};
	});

	let handleTimelineMousemove = (event: MouseEvent) => {
		if (!timelineTooltip || !browser) return;

		const { clientX } = event;
		const { width } = timelineTooltip.getBoundingClientRect();
		const tooltipWidth = width / 2;

		const target = event.currentTarget as HTMLElement;
		const time = parseInt(target.id.replace('time-marker-', ''));

		// define hovered timestamp
		console.log('hoveredTime', new Date(time).toLocaleTimeString('en-US'));

		// find closest meme to the hovered time
		const closestMeme = aggregations.find((m) => {
			const diff = Math.abs(m.createdAt.getTime() - time);
			return diff < timeStep;
		});

		// set img as background image
		const imgUrl = closestMeme?.imageUrl;
		if (timelineTooltip) {
			timelineTooltip.style.background = `url(${imgUrl}) no-repeat center center/contain`;
		}

		// check if tooltip is out of bounds
		if (clientX - tooltipWidth < 0) {
			timelineTooltip.style.left = '0';
			timelineTooltip.style.right = `auto`;
			return;
		}

		if (clientX + tooltipWidth > window.innerWidth) {
			timelineTooltip.style.left = `auto`;
			timelineTooltip.style.right = '0';
			return;
		}

		timelineTooltip.style.left = `${clientX - tooltipWidth}px`;
	};

	let handleTimeMarkerClick = (event: MouseEvent, time: number) => {
		console.log('time', new Date(time).toLocaleTimeString('en-US'));

		const target = event.target as HTMLElement;
		if (!target) return;

		target.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
			inline: 'center'
		});

		const threshold = timeStep * 2;
		const meme = aggregations.find((m) => {
			const diff = Math.abs(m.createdAt.getTime() - time);
			return diff < threshold;
		});
		if (meme) {
			$timelineStore.selectedItem = meme;
		}
	};

	let handleZoom = (direction: 'in' | 'out') => {
		const zoomAmount = 1000 * 60 * 5;

		const tTimeStep = timeStep * (direction === 'in' ? 0.5 : 2);
		const tItemCount = Math.round((timeRangeEnd - timeRangeStart) / tTimeStep);

		timeStep *= direction === 'out' ? 0.5 : 2;
		itemCount = Math.round((timeRangeEnd - timeRangeStart) / timeStep);

		const centerOffset = (ITEM_SIZE * itemCount) / 2;
		const virtualList = document.querySelector('.virtual-list-wrapper');
		if (virtualList) {
			virtualList.scrollLeft = centerOffset;
			const virtualListInner = document.querySelector('.virtual-list-inner');
			if (virtualListInner) {
				// resize markers container
				markerItemsContainerStyle = `width: ${virtualListInner.clientWidth}px; position: absolute; top: 0; left: 0;`;
			}
		}

		if (direction === 'in') {
			timeRangeStart -= zoomAmount;
			timeRangeEnd += zoomAmount;
		} else {
			timeRangeStart += zoomAmount;
			timeRangeEnd -= zoomAmount;
		}
	};

	let handleAfterScroll = (e: { detail: { offset: number } }) => {
		const data = e.detail;
		const offset = data.offset;

		const virtualList = document.querySelector('.virtual-list-inner');
		if (!virtualList) return;

		// compute the total duration
		const duration = timeRangeEnd - timeRangeStart;

		// calculate the proportion of the scrolled distance to the full width of the container
		const scrollProportion = offset / virtualList.scrollWidth;

		// calculate the left and right viewport time
		leftViewportTime = timeRangeStart + duration * scrollProportion;
		rightViewportTime = leftViewportTime + width * (duration / virtualList.scrollWidth);

		// get the middle of the viewport
		middleViewportTime = Math.round(leftViewportTime + (rightViewportTime - leftViewportTime) / 2);

		// select item from the middle of the viewport
		const closestMeme = aggregations.find((m) => {
			const timeMs = m.createdAtTime * 1000;
			const diff = Math.abs(timeMs - middleViewportTime);

			return diff < timeStep * 2;
		});

		const selectedItem = $timelineStore.selectedItem;
		if (closestMeme && closestMeme.id !== selectedItem?.id) {
			$timelineStore.selectedItem = closestMeme;
			if (isAudioReady) {
				sound.play();
			}
		}

		// scroll markers list
		if (itemMarkersEl) {
			itemMarkersEl.style.transform = `translateX(-${offset}px)`;
		}
	};

	let handleScrollToMarker = (type: 'next' | 'prev') => {
		const selectedItem = $timelineStore.selectedItem;
		if (!selectedItem) return;

		let index = aggregations.findIndex((m) => m.id === selectedItem?.id);
		if (index === -1) return;
		console.log('index', index);

		let nextMeme = aggregations[index + 1];
		if (type === 'prev') {
			nextMeme = aggregations[index - 1];
		}
		if (nextMeme) {
			$timelineStore.selectedItem = nextMeme;

			const virtualList = document.querySelector('.virtual-list-wrapper');
			const virtualListInner = document.querySelector('.virtual-list-inner') as HTMLDivElement;

			if (!virtualListInner || !virtualList) return;

			const ratio =
				(nextMeme.createdAt.getTime() - timeRangeStart) / (timeRangeEnd - timeRangeStart);

			const offset = ratio * virtualListInner.scrollWidth;
			const halfWidth = virtualList.clientWidth / 2;
			if (itemMarkersEl) itemMarkersEl.style.transform = `translateX(-${offset + halfWidth}px)`;

			if (virtualList) {
				virtualList.scrollLeft = offset - halfWidth;
			}
		}
	};
</script>

<!-- floating controls widget -->
<TimelineControls
	scrollToNextMarker={() => handleScrollToMarker('next')}
	scrollToPrevMarker={() => handleScrollToMarker('prev')}
	zoomIn={() => handleZoom('in')}
	zoomOut={() => handleZoom('out')}
	search={(text) => handleSearch(text, timeStep)}
/>

<div class="timeline">
	<div class="timeline-inner">
		<!-- display middle timeline marker to display current time marker -->
		<dir class="timeline-middle">
			{new Date(middleViewportTime).toLocaleTimeString('en-US', {
				// MMM DD, HH:MM:SS AM/PM
				month: 'short',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric',
				hour12: true
			})}
		</dir>

		<!-- display markers for item what will be displayed -->
		<div
			style={markerItemsContainerStyle}
			bind:this={itemMarkersEl}
			class="marker-items__container"
		>
			{#each aggregations as aggr}
				<!-- do not render if it's not in viewport time -->
				<!-- {#if aggr.createdAt.getTime() >= leftViewportTime && aggr.createdAt.getTime() <= rightViewportTime} -->
				<ItemMarker
					{timeRangeStart}
					{timeRangeEnd}
					{aggr}
					handleClick={(e, aggr) => {
						$timelineStore.selectedItem = aggr;
					}}
				/>
				<!-- {/if} -->
			{/each}
		</div>

		<VirtualList
			height={ITEM_HEIGHT}
			{width}
			scrollDirection="horizontal"
			{itemCount}
			itemSize={ITEM_SIZE}
			on:afterScroll={handleAfterScroll}
		>
			<div let:index slot="item" let:style>
				{@const time = Math.round(timeRangeStart + index * timeStep)}
				{@const is30Sec = index % 15 === 0}
				{@const isMinute = index % 60 === 0}
				{@const className = isMinute
					? 'marker-inner__badge_high'
					: is30Sec
						? 'marker-inner__badge_mid'
						: 'marker-inner__badge_tiny'}

				<Marker {handleTimelineMousemove} {time} {style} {handleTimeMarkerClick} {className} />
			</div>
		</VirtualList>

		<div class="timeline-viewport timeline-viewport__left">
			{new Date(leftViewportTime).toLocaleTimeString('en-US', {
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric',
				hour12: true
			})}
		</div>
		<div class="timeline-viewport timeline-viewport__right">
			{new Date(rightViewportTime).toLocaleTimeString('en-US', {
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric',
				hour12: true
			})}
		</div>

		<div bind:this={timelineTooltip} class="timeline-tooltip"></div>
	</div>
</div>

<style>
	.timeline {
		height: fit-content;
		min-height: 15rem;
		margin-top: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		overflow: hidden;
		position: relative;
		z-index: 2;
	}
	.timeline-inner {
		position: relative;
		width: 100%;
		background-color: #131212;
	}
	/* show tooltip on timeline hover */
	.timeline-inner:hover .timeline-tooltip {
		opacity: 1;
	}
	/* add fadeout gradient from top to bottom */
	.timeline-inner::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(180deg, rgba(47, 46, 46, 1) 0%, rgba(47, 46, 46, 0) 100%);
		pointer-events: none;
		z-index: 0;
	}
	.timeline-tooltip {
		position: absolute;
		bottom: calc(100% + 0.25rem);
		transition: all 0.3s ease-in-out;
		width: 15rem;
		height: 10rem;
		border-radius: 0.25rem;
		background-color: #6d6b6b;
		pointer-events: none;
		opacity: 0;
	}
	.timeline-viewport {
		position: absolute;
		bottom: calc(100% + 0.1rem);
		width: fit-content;
		height: fit-content;
		pointer-events: none;
		padding: 0.25rem;
		color: white;
		font-size: 0.5rem;
		line-height: 0.75rem;
	}
	.timeline-viewport__left {
		left: 0;
	}
	.timeline-viewport__right {
		right: 0;
	}

	.timeline-middle {
		position: absolute;
		top: -2rem;
		left: 50%;
		transform: translate(-50%, 0);
		color: white;
		z-index: 2;

		border-radius: 0.25rem;
		font-size: 0.75rem;
		line-height: 0.75rem;
		padding: 0.25rem;
	}
	.timeline-middle::after {
		content: '';
		position: absolute;
		bottom: -0.5rem;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 0;
		border-left: 0.25rem solid transparent;
		border-right: 0.25rem solid transparent;
		border-top: 0.5rem solid #131212;
	}
	.marker-items__container {
		height: 0;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
	}
</style>
