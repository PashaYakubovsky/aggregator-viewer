/// <references types="houdini-svelte">
/** @type {import('houdini').ConfigFile} */

let PUBLIC_GRAPHQL_URL = '';

PUBLIC_GRAPHQL_URL = import.meta?.env?.VITE_PUBLIC_GRAPHQL_URL;
console.log('PUBLIC_GRAPHQL_URL', PUBLIC_GRAPHQL_URL);
const config = {
	watchSchema: {
		url: PUBLIC_GRAPHQL_URL
	},
	plugins: {
		'houdini-svelte': {}
	}
};

export default config;
