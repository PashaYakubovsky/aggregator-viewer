<script lang="ts">
	export let selectedItem: Aggregation | null;
	let isImgLoaded = false;
	let isImgError = false;

	$: {
		isImgLoaded = false;
		isImgError = false;
	}
</script>

<div class="aggregated-item">
	{#if selectedItem}
		<div class="aggregated-item__inner-title">{selectedItem.name}</div>

		{#if isImgError}
			<div class="aggregated-item__error">Error loading image</div>
		{/if}

		{#if selectedItem.imageUrl && !isImgError}
			<img
				on:load={() => {
					isImgLoaded = true;
				}}
				on:error={(err) => {
					console.error(err);
					isImgError = true;
				}}
				class="aggregated-item__inner-img"
				src={selectedItem.imageUrl}
				alt={selectedItem.name}
			/>
		{/if}

		{#if !isImgLoaded}
			<div class="aggregated-item__loading">Loading...</div>
		{/if}
	{/if}
</div>

<style>
	.aggregated-item__error {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		color: white;
	}
	.aggregated-item {
		max-height: calc(100svh - 16rem);
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		height: 100%;
		position: relative;
		z-index: 1;
		gap: 1rem;
		padding-top: 1rem;
	}
	.aggregated-item__inner-title {
		color: white;
		font-size: 1rem;
		line-height: 1.5rem;
		text-align: center;
	}
	.aggregated-item__inner-img {
		width: 100%;
		max-height: calc(100% - 2rem);
		height: auto;
		object-fit: contain;
	}
	.aggregated-item__loading {
		color: white;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
