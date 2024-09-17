import { PUBLIC_GRAPHQL_URL } from '$env/static/public';

/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
	watchSchema: {
		url: PUBLIC_GRAPHQL_URL || 'http://localhost:3000/graphql'
	},
	plugins: {
		'houdini-svelte': {}
	}
};

export default config;
