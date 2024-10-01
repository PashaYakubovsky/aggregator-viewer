import { writable } from 'svelte/store';

export type Topic = {
	from: string;
	name: string;
	selected: boolean;
};

export const sessionStore = writable<{
	user: User | null;
	topics: Topic[];
}>({ user: null, topics: [] });
