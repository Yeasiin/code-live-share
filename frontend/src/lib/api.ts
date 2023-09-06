import { writable, type Writable } from 'svelte/store';

type MutationProps = {
	endPoint: string;
	method?: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';
};

type MutationReturn = [
	(body?: object) => Promise<void>,
	Writable<{
		isLoading: boolean;
		isError: boolean;
		error: object | undefined;
		data: object | undefined;
	}>
];

export function useMutation({ endPoint, method = 'GET' }: MutationProps): MutationReturn {
	const state = { isLoading: false, isSuccess: false, isError: false, error: {}, data: {} };
	const mutationStore = writable(state);

	async function mutation(body: any = {}) {
		try {
			mutationStore.update((state) => ({ ...state, isLoading: true, isError: false }));

			const request = await fetch(endPoint, {
				method: method,
				headers: {
					'Content-Type': 'application/json'
				},
				body: method !== 'GET' ? JSON.stringify(body) : undefined
			});

			const result = await request.json();
			console.log({ result, request });
			if (!request.ok) {
				// failed
				return mutationStore.update((value) => ({
					...value,
					isLoading: false,
					isError: true,
					error: result
				}));
			}

			mutationStore.update((value) => ({
				...value,
				isLoading: false,
				isSuccess: true,
				data: result
			}));
		} catch (err) {
			mutationStore.update((value) => ({
				...value,
				isLoading: false,
				isError: true,
				error: { message: 'Something went wrong' }
			}));
		}
	}

	return [mutation, mutationStore];
}
