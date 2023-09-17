import { browser } from '$app/environment';

function storageFunc() {
	const get = (token: string) => {
		if (!browser) return;

		return localStorage.getItem(token) ? JSON.parse(localStorage.getItem(token) as string) : null;
	};

	const set = (token: string, value: object) => localStorage.setItem(token, JSON.stringify(value));

	const clear = (token: string) => localStorage.removeItem(token);

	return { get, set, clear };
}

export default storageFunc();
