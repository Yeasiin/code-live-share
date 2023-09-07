import { writable } from 'svelte/store';

type State = {
	token: undefined | string;
	data: undefined | { firstName: string; lastName: string };
};

const state: State = {
	token: undefined,
	data: undefined
};

function userStore() {
	const { subscribe, update, set } = writable(state);

	return {
		subscribe,
		loginUser: (userInfo: Partial<State>) => update((state) => ({ ...state, ...userInfo })),
		logOut: () => update((prev) => ({ ...prev, ...state }))
	};
}

export const user = userStore();
