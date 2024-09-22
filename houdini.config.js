/// <references types="houdini-svelte">
/** @type {import('houdini').ConfigFile} */

let PUBLIC_GRAPHQL_URL = '';

PUBLIC_GRAPHQL_URL = import.meta?.env?.VITE_PUBLIC_GRAPHQL_URL;
const config = {
	watchSchema: {
		// url: 'http://localhost:3000/graphql'
		url: PUBLIC_GRAPHQL_URL
	},
	plugins: {
		'houdini-svelte': {}
	},
	scalars: {
		// Add any custom scalar definitions here
		Date: {
			type: 'Date',
			// You might need to adjust this depending on your date format
			unmarshal: (val) => new Date(val),
			marshal: (date) => date.toISOString()
		}
	}
};

export default config;
