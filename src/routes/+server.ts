// get grqphql token and set to the store in server.ts

import { login } from '$lib/login';

try {
	login('admin', 'admin');
} catch (error) {
	console.error('Failed to login:', error);
}
