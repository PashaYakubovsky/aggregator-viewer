// client.ts
import { HoudiniClient } from '$houdini';
import { get } from 'svelte/store';
import { token } from './stores/auth';
import { browser } from '$app/environment';
import { subscription } from '$houdini/plugins';
import { createClient } from 'graphql-ws';

export default new HoudiniClient({
	url: import.meta.env.VITE_PUBLIC_GRAPHQL_URL,

	fetchParams: ({ session }) => {
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
	},
	plugins: [
		subscription(() =>
			createClient({
				shouldRetry: () => true,
				retryAttempts: 5,
				url: import.meta.env.VITE_PUBLIC_GRAPHQL_WS_URL,
				on: {
					connected: () => console.log('WebSocket connected'),
					closed: () => console.log('WebSocket closed'),
					error: (error) => console.error('WebSocket error:', error)
				},
				connectionParams: () => {
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

					return { headers };
				}
			})
		)
	]
});
