import { PUBLIC_REST_URL } from '$env/static/public';
import { refreshToken, token } from '../stores/auth';
import fs from 'fs';

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

			// create json file and safe in public directory
			const json = JSON.stringify(data);
			if (process.env.NODE_ENV !== 'development') {
				fs.writeFileSync('token.json', json);
			} else {
				fs.writeFileSync('static/token.json', json);
			}
			return data;
		} else {
			// Handle login error
			console.error('Login failed:', data.message);
			return Promise.reject(data.message);
		}
	} catch (error) {
		console.error('Failed to refresh token:', error);
		return Promise.reject(error);
	}
}
