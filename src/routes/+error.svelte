<script>
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		// repeat load requests to the graphql server
		// because token file never be available on 1st global user coming
		invalidate('/');
	});
</script>
