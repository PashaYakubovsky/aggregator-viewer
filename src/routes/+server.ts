import { login } from '$lib/login';

try {
	login('admin', 'admin');
} catch (error) {
	console.error('Failed to login:', error);
}
