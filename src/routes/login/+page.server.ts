import { login } from '$lib/login.js';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request, url }) => {
		const data = await request.formData();
		const email = data.get('name') + '';
		const password = data.get('password') + '';
		console.log('[login][url]', url);

		if (!email || !password) {
			return fail(400, { message: 'Email and password are required', success: false });
		}
		try {
			const token = await login(email, password);
			console.log('[login][token]', token);
		} catch (e) {
			console.log('[login][error]', e);
			return fail(401, { message: JSON.stringify(e), success: false });
		}

		redirect(303, '/');
	}
};
