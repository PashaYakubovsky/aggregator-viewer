import { PUBLIC_REST_URL } from '$env/static/public';
import { refreshToken, token } from '../stores/auth';

export async function login(username: string, password: string) {
	try {
		const response = await fetch(`${PUBLIC_REST_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});

		const data = await response.json();
		if (response.ok) {
			token.set(data.access_token);
			refreshToken.set(data.refresh_token);

			return data.access_token;
		} else {
			// Handle login error
			console.error('Login failed:', data.message);
		}
	} catch (error) {
		console.error('Failed to refresh token:', error);
	}
}

export async function register(username: string, password: string) {
	try {
		const response = await fetch(`${PUBLIC_REST_URL}/auth/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});

		const data = await response.json();
		if (response.ok) {
			token.set(data.access_token);
			refreshToken.set(data.refresh_token);

			return data.access_token;
		} else {
			// Handle registration error
			console.error('Registration failed:', data.message);
		}
	} catch (error) {
		console.error('Failed to register:', error);
	}
}
