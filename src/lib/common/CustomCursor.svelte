<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { spring } from 'svelte/motion';

	let cursorX: number;
	let cursorY: number;
	let isPointer = false;
	let isPointerImg = false;
	let isClicking = false;
	let target: EventTarget | null = null;

	const cursorSpring = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.1,
			damping: 0.4
		}
	);

	function updateCursorPosition(e: MouseEvent) {
		cursorX = e.clientX;
		cursorY = e.clientY;
		cursorSpring.set({ x: cursorX, y: cursorY });
	}

	function handleMouseOver(e: MouseEvent) {
		const target = e.target as HTMLElement;
		isPointer = target.matches('button');
		isPointerImg = target.matches('img');
	}

	function handleMouseDown() {
		isClicking = true;
	}

	function handleMouseUp() {
		isClicking = false;
	}

	onMount(() => {
		document.addEventListener('mousemove', updateCursorPosition);
		document.addEventListener('mouseover', handleMouseOver);
		document.addEventListener('mousedown', handleMouseDown);
		document.addEventListener('mouseup', handleMouseUp);
	});

	onDestroy(() => {
		document.removeEventListener('mousemove', updateCursorPosition);
		document.removeEventListener('mouseover', handleMouseOver);
		document.removeEventListener('mousedown', handleMouseDown);
		document.removeEventListener('mouseup', handleMouseUp);
	});
</script>

<svelte:head>
	<style>
		body {
			cursor: none;
		}
		button,
		img {
			cursor: none;
		}
	</style>
</svelte:head>

<div
	class={`cursor ${isPointerImg ? 'mix-blend-multiply bg-white' : ''}`}
	style="left: {$cursorSpring.x}px; top: {$cursorSpring.y}px;"
>
	<svg
		width="40"
		height="40"
		viewBox="0 0 40 40"
		fill={isPointerImg ? 'none' : 'currentColor'}
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="20" cy="20" r="18" stroke="white" stroke-width="2" />
		{#if isPointerImg}
			<circle cx="20" cy="20" r="20" fill="white" />
		{/if}
		<!-- burn color path -->
		{#if !isPointerImg}
			<path
				class:visible={isPointer}
				d="M20 10V30M10 20H30"
				stroke="white"
				stroke-width="2"
				stroke-linecap="round"
			/>
		{/if}
	</svg>
</div>

<div
	class="cursor-dot"
	class:clicking={isClicking}
	style="left: {cursorX}px; top: {cursorY}px;"
></div>

<style>
	.cursor {
		position: fixed;
		pointer-events: none;
		z-index: 9999;
		mix-blend-mode: difference;
		transition: transform 0.1s ease;
	}
	.cursor svg {
		transition: transform 0.3s ease;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.cursor:hover svg {
		transform: scale(1.2);
	}
	.cursor svg path {
		opacity: 0;
		transition: opacity 0.3s ease;
	}
	.cursor svg path.visible {
		opacity: 1;
	}
	.cursor-dot {
		position: fixed;
		pointer-events: none;
		z-index: 9999;
		width: 4px;
		height: 4px;
		background-color: white;
		border-radius: 50%;
		mix-blend-mode: difference;
		transition: transform 0.1s ease;
	}
	.cursor-dot.clicking {
		transform: scale(2);
	}
	:global(button:hover),
	:global(img:hover) {
		transform: scale(1.05);
		transition: transform 0.3s ease;
	}
</style>
