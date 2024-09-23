import { writable } from 'svelte/store';

// Create a writable store for the current scroll index
export const timelineStore = writable<{
	selectedItem: Aggregation | null;
	aggregations: Aggregation[];
}>({ selectedItem: null, aggregations: [] });
