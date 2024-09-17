import { writable, get } from 'svelte/store';

export const token = writable<string | null>(null);

export function setToken(value: string | null) {
	token.set(value);
}

export function getToken() {
	return get(token);
}

export const refreshToken = writable<string | null>(null);
