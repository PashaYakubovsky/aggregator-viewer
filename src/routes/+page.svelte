<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import type { getAggregationsQueryStore } from '$houdini';
	import dayjs from 'dayjs';
	import gsap from 'gsap';
	import { Observer } from 'gsap/all';
	import Fuse from 'fuse.js';
	import Marker from '$lib/timeline/Marker.svelte';
	import ItemMarker from '$lib/timeline/ItemMarker.svelte';
	import VirtualList from 'svelte-tiny-virtual-list';
	import TimelineControls from '$lib/timeline/TimelineControls.svelte';
	import AggregatedItemViewer from '$lib/timeline/AggregatedItemViewer.svelte';

	let width = 500;
	let timeStep = 1000;
	let ITEM_HEIGHT = '50px';
	let ITEM_SIZE = 5;
	let timeRangeStart = new Date().getTime();
	let timeRangeEnd = timeRangeStart + 1000 * 60 * 60 * 24;

	let itemCount = Math.round((timeRangeEnd - timeRangeStart) / timeStep);
	let leftViewportTime = 0;
	let rightViewportTime = 0;
	let middleViewportTime = 0;
	let markerItemsContainerStyle = `width: ${ITEM_SIZE * itemCount}px; position: absolute; height: 2rem; top: 0; left: 0;`;
	let selectedItem: Meme | null = null;

	let timelineTooltip: HTMLDivElement | null = null;
	let itemMarkersEl: HTMLDivElement | null = null;

	const sound = new Audio('/clickSound.mp3');

	function handleResize() {
		width = window.innerWidth;
		if (itemMarkersEl) {
			itemMarkersEl.style.width = `${ITEM_SIZE * itemCount}px`;
		}
	}

	/* @type { import('./$houdini').PageData } */
	export let data;

	let queryStore: getAggregationsQueryStore | undefined;
	let memes: Meme[] = [];

	$: if (data && !selectedItem) {
		const init = async () => {
			const { getAggregationsQuery } = data as import('./$houdini').PageData;
			queryStore = getAggregationsQuery;
			let listOfMemes = $queryStore?.data?.getAggregations as unknown as Meme[];
			listOfMemes.sort((a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf());

			if (listOfMemes) {
				let minCreatedAt: number = 0;
				let maxCreatedAt: number = 0;
				for (let i = 0; i < listOfMemes.length; i++) {
					const meme = listOfMemes[i];
					const createdAt = dayjs(meme.createdAt).valueOf();
					if (i === 0) {
						minCreatedAt = createdAt;
						maxCreatedAt = createdAt;
					}
					if (createdAt < minCreatedAt) {
						minCreatedAt = createdAt;
					}
					if (createdAt > maxCreatedAt) {
						maxCreatedAt = createdAt;
					}
					meme.createdAt = new Date(createdAt);
				}
				if (minCreatedAt && maxCreatedAt) {
					timeRangeStart = dayjs(minCreatedAt).subtract(5, 'm').valueOf();
					timeRangeEnd = dayjs(maxCreatedAt).add(5, 'm').valueOf();
					timeStep = (timeRangeEnd - timeRangeStart) / listOfMemes.length;
					itemCount = Math.round((timeRangeEnd - timeRangeStart) / timeStep);
					memes = listOfMemes;
					selectedItem = memes[0];
					// initial call for virtual list
					handleAfterScroll({ detail: { offset: 0 } });
				}
			}
		};

		init();
	}

	onMount(() => {
		if (!browser) return;

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	const handleTimelineMousemove = (event: MouseEvent) => {
		if (!timelineTooltip || !browser) return;

		const { clientX } = event;
		const { width } = timelineTooltip.getBoundingClientRect();
		const tooltipWidth = width / 2;

		const target = event.currentTarget as HTMLElement;
		const time = parseInt(target.id.replace('time-marker-', ''));

		// define hovered timestamp
		console.log('hoveredTime', new Date(time).toLocaleTimeString('en-US'));

		// find closest meme to the hovered time
		const closestMeme = memes.find((m) => {
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

	const handleTimeMarkerClick = (event: MouseEvent, time: number) => {
		console.log('time', new Date(time).toLocaleTimeString('en-US'));

		const target = event.target as HTMLElement;
		if (!target) return;

		target.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
			inline: 'center'
		});

		const threshold = timeStep * 2;
		const meme = memes.find((m) => {
			const diff = Math.abs(m.createdAt.getTime() - time);
			return diff < threshold;
		});
		if (meme) {
			selectedItem = meme;
		}
	};

	const handleZoom = (direction: 'in' | 'out') => {
		const zoomAmount = 1000 * 60 * 5;
		if (direction === 'in') {
			timeRangeStart -= zoomAmount;
			timeRangeEnd += zoomAmount;
		} else {
			timeRangeStart += zoomAmount;
			timeRangeEnd -= zoomAmount;
		}
		timeStep = (timeRangeEnd - timeRangeStart) / memes.length;
		itemCount = Math.round((timeRangeEnd - timeRangeStart) / timeStep);
		// resize markers container
		markerItemsContainerStyle = `width: ${ITEM_SIZE * itemCount}px; position: absolute; height: 2rem; top: 0; left: 0;`;
		// initial call for virtual list
		handleAfterScroll({ detail: { offset: 0 } });
	};

	const handleAfterScroll = (e: { detail: { offset: number } }) => {
		const data = e.detail;
		const offset = data.offset;
		const left = offset / ITEM_SIZE;
		const right = left + width / ITEM_SIZE;
		leftViewportTime = Math.round(timeRangeStart + left * timeStep);
		rightViewportTime = Math.round(timeRangeStart + right * timeStep);

		// get the middle of the viewport
		middleViewportTime = Math.round(leftViewportTime + (rightViewportTime - leftViewportTime) / 2);

		// select item from the middle of the viewport
		const closestMeme = memes.find((m) => {
			const diff = Math.abs(m.createdAt.getTime() - middleViewportTime);
			return diff < timeStep;
		});

		if (closestMeme) {
			sound.currentTime = 0;
			sound.play();
			selectedItem = closestMeme;
		}

		// scroll markers list
		if (itemMarkersEl) {
			itemMarkersEl.style.transform = `translateX(-${offset}px)`;
		}
	};

	const handleScrollToMarker = (type: 'next' | 'prev') => {
		if (!selectedItem) return;

		const index = memes.findIndex((m) => m.id === selectedItem?.id);
		if (index === -1) return;

		let nextMeme = memes[index + 1];
		if (type === 'prev') {
			nextMeme = memes[index - 1];
		}
		if (nextMeme) {
			selectedItem = nextMeme;
			const virtualList = document.querySelector('.virtual-list-wrapper');
			const markers = document.querySelectorAll('.marker');
			if (virtualList && markers) {
				const marker = Array.from(markers).find((m) => {
					const id = parseInt(m.id);
					const markerTime = nextMeme.createdAt.getTime();
					return Math.abs(id - markerTime) < timeStep;
				});
				if (marker) {
					marker.scrollIntoView({
						behavior: 'smooth',
						block: 'center',
						inline: 'center'
					});
				}
			}
		}
	};

	onMount(() => {
		if (!browser) return;
		// set up gsap observer

		gsap.registerPlugin(Observer);

		const virtualList = document.querySelector('.virtual-list-wrapper');

		const lerp = (start: number, end: number, t: number) => {
			return start * (1 - t) + end * t;
		};

		Observer.create({
			target: '.timeline',
			type: 'wheel,touch,pointer',
			wheelSpeed: 0.5,
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
	});

	const fuseOptions = {
		isCaseSensitive: false,
		// includeScore: false,
		// shouldSort: true,
		// includeMatches: false,
		// findAllMatches: false,
		// minMatchCharLength: 1,
		// location: 0,
		// threshold: 0.6,
		// distance: 100,
		// useExtendedSearch: false,
		// ignoreLocation: false,
		// ignoreFieldNorm: false,
		// fieldNormWeight: 1,
		keys: ['from', 'id', 'imageUrl', 'name', 'type']
	};

	const handleSearch = (searchedText: string) => {
		let fuse = new Fuse(memes, fuseOptions);
		const result = fuse.search(searchedText);
		if (result.length > 0) {
			const meme = result[0].item;
			selectedItem = meme;
			const virtualList = document.querySelector('.virtual-list-wrapper');
			const markers = document.querySelectorAll('.marker');
			if (virtualList && markers) {
				const marker = Array.from(markers).find((m) => {
					const id = parseInt(m.id);
					if (!selectedItem) return;
					const markerTime = selectedItem.createdAt.getTime();
					return Math.abs(id - markerTime) < timeStep;
				});
				if (marker) {
					marker.scrollIntoView({
						behavior: 'smooth',
						block: 'center',
						inline: 'center'
					});
				}
			}
		}
	};
</script>

<!-- display item -->
<AggregatedItemViewer {selectedItem} />

<!-- floating controls widget -->
<TimelineControls
	scrollToNextMarker={() => handleScrollToMarker('next')}
	scrollToPrevMarker={() => handleScrollToMarker('prev')}
	zoomIn={() => handleZoom('in')}
	zoomOut={() => handleZoom('out')}
	search={handleSearch}
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
			{#each memes as meme}
				<!-- do not render if it's not in viewport time -->
				{#if meme.createdAt.getTime() >= leftViewportTime && meme.createdAt.getTime() <= rightViewportTime}
					<ItemMarker {timeRangeStart} {timeRangeEnd} {meme} />
				{/if}
			{/each}
		</div>

		<VirtualList
			scrollToBehaviour="smooth"
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
</style>
