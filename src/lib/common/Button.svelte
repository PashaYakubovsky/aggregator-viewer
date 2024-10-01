<script lang="ts">
	export let handleClick: (e: Event) => void = () => {};
	export let text: string;
	export let isLoading: boolean = false;
	export let disabled: boolean = false;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let color: 'primary' | 'secondary' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let variant: 'solid' | 'outline' | 'ghost' = 'solid';
	export let rounded: 'none' | 'sm' | 'md' | 'lg' = 'none';
	export let className: string = '';

	let buttonElement: HTMLButtonElement;
	let styles = '';

	if (color === 'primary') {
		styles += ' text-white bg-sky-500 hover:bg-sky-600';
	} else if (color === 'secondary') {
		styles += ' text-sky-950 bg-indigo-100 hover:bg-indigo-200';
	}

	if (variant === 'solid') {
		styles += ' hover:bg-opacity-80';
	} else if (variant === 'outline') {
		styles += ' border border-white hover:bg-white hover:text-gray-900';
	} else if (variant === 'ghost') {
		styles += ' hover:bg-gray-200';
	}

	if (rounded === 'none') {
		styles += ' rounded-none';
	} else if (rounded === 'sm') {
		styles += ' rounded-sm';
	} else if (rounded === 'md') {
		styles += ' rounded-md';
	} else if (rounded === 'lg') {
		styles += ' rounded-lg';
	}

	if (size === 'sm') {
		styles += ' text-xs py-1 px-2';
	} else if (size === 'md') {
		styles += ' text-sm py-2 px-4';
	} else if (size === 'lg') {
		styles += ' text-lg py-3 px-6';
	}

	$: styles += ` ${className || ''}`;
</script>

<button
	bind:this={buttonElement}
	{type}
	disabled={isLoading || disabled}
	on:click={handleClick}
	class="
        w-full
        text-center
        py-2
        px-4
        border
        border-transparent
        text-sm
        font-medium
        rounded-md
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-sky-500
        transition-all
        {styles || ''}
    "
>
	{#if isLoading}
		<svg
			class="animate-spin h-5 w-5 text-white"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
			></circle>
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			></path>
		</svg>
		Loading...
	{:else}
		{text}
	{/if}
</button>

<style>
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}
</style>
