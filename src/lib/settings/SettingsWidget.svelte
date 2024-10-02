<script lang="ts">
	import { browser } from '$app/environment';
	import Button from '$lib/common/Button.svelte';
	import { Cog, Check } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { sessionStore } from '../../stores/session';

	export let user: User;

	let settingsOpen = false;

	$: if (user?.subscribedTopics) {
		console.log('subscribed topics:', user.subscribedTopics);
		$sessionStore.topics = user.subscribedTopics?.map((topic) => ({
			from: 'reddit',
			name: topic,
			selected: true
		}));
	}

	let hoveredStalker: HTMLDivElement;
	let settingsEl: HTMLDivElement;

	function handleMouseMove(event: MouseEvent) {
		if (browser) {
			// get button and set hovered stalker position
			const button = event.target as HTMLButtonElement;
			if (!button) return;
			let rect = button.getBoundingClientRect();

			// offset the stalker to the top of the button
			const settingsElRect = settingsEl.getBoundingClientRect();
			if (!settingsElRect) return;
			rect = { ...rect, top: rect.top - settingsElRect.top };

			hoveredStalker.style.top = `${rect.top}px`;
			hoveredStalker.style.left = `${rect.left}px`;
			hoveredStalker.style.width = `${rect.width}px`;
			hoveredStalker.style.height = `${rect.height}px`;
		}
	}
</script>

<button
	on:click={() => (settingsOpen = !settingsOpen)}
	class="settings-widget__button text-gray-200"
>
	<Cog pointer-events="none" />
</button>

{#if settingsOpen}
	<div
		bind:this={settingsEl}
		in:fly={{ x: 0, y: -100, duration: 300 }}
		class="settings-widget__settings p-2 rounded-sm text-gray-200 min-w-[15rem] bg-sky-950"
	>
		<div class="rounded-full uppercase">
			<h3 class="text-sm text-center mt-2">{user?.username}</h3>
			<div class="m-auto overflow-hidden w-fit rounded-md">
				<img
					class="hover:scale-125 w-fit m-auto transition-all"
					src="https://ui-avatars.com/api/?name={user?.username}&background=0ea5e9&rounded=true&size=128"
					alt="avatar"
				/>
			</div>
		</div>

		<div bind:this={hoveredStalker} class="hovered-stalker h-[1.5rem] bg-sky-300"></div>

		<!-- selected topics for subscribe -->
		<div class="mt-2">
			<h3 class="text-xs">Selected topics:</h3>

			{#each $sessionStore.topics as topic, i}
				<button
					on:mousemove={handleMouseMove}
					on:mouseenter={() => {
						if (hoveredStalker) hoveredStalker.style.opacity = '1';
					}}
					on:mouseleave={() => {
						if (hoveredStalker) hoveredStalker.style.opacity = '0';
					}}
					on:click={() => {
						$sessionStore.topics[i].selected = !$sessionStore.topics[i].selected;
					}}
					class="flex items-center justify-between w-full"
				>
					<p>{topic.name}</p>
					{#if topic.selected}
						<Check class="text-green-500 w-[1rem] h-[1rem]" pointer-events="none" />
					{:else}
						<Check class="text-gray-500 text-xs w-[1rem] h-[1rem]" pointer-events="none" />
					{/if}
				</button>
			{/each}

			<Button className="!px-2 !py-1 !w-fit mt-2 bg-sky-700" rounded="lg" text="Save"></Button>
		</div>
	</div>
{/if}

<style>
	.settings-widget__button {
		position: absolute;
		z-index: 101;
		top: 1rem;
		right: 1rem;
		border-radius: 50%;
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: 0.3s ease-in-out all;
	}
	.hovered-stalker {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background: linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
		pointer-events: none;
		opacity: 0;
		transition: 0.3s ease-in-out all;
	}
	.settings-widget__settings {
		position: absolute;
		z-index: 100;
		top: 4rem;
		right: 1rem;
	}
</style>
