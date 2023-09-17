import { browser } from '$app/environment';
import storage from '$lib/utils/localStorage';
import { writable } from 'svelte/store';

type State = {
	token: undefined | string;
	data: { firstName: string; lastName: string; email: string; role: string } | undefined;
};

const state: State = {
	token: undefined,
	data: undefined
};

function userStore() {
	const { subscribe, update, set } = writable(storage.get('user') ?? state);

	return {
		subscribe,
		loginUser: (userInfo: Partial<State>) => {
			update((state) => ({ ...state, ...userInfo }));
			storage.set('user', userInfo);
		},
		logOut: () => {
			update((prev) => ({ ...prev, ...state }));
			storage.clear('user');
		}
	};
}

export const user = userStore();
