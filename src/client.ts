// client.ts
import { HoudiniClient } from '$houdini';
import { get } from 'svelte/store';
import { token } from './stores/auth';
import { browser } from '$app/environment';

export default new HoudiniClient({
	url: import.meta.env.VITE_PUBLIC_GRAPHQL_URL,

	fetchParams: () => {
		let currentToken = get(token);

		if (browser && !currentToken) {
			const token = localStorage.getItem('token');
			if (token) {
				currentToken = token;
			}
		}

		const headers: Record<string, string> = {};
		if (currentToken) {
			headers['Authorization'] = `Bearer ${currentToken}`;
		}

		console.log('Current auth headers:', headers);
		return { headers };
	},

	throwOnError: {
		// can be any combination of
		// query, mutation, subscription, and all
		operations: ['all'],
		// the function to call
		error: (errors, ctx) => {
			console.error('Request failed:', errors);
		}
	}
});
