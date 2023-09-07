import { writable, type Writable } from 'svelte/store';

type MutationProps = {
	endPoint: string;
	method?: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';
};

type MutationReturn<TData = undefined, TError = undefined> = [
	(body?: object) => Promise<void>,
	Writable<{
		isLoading: boolean;
		isSuccess: boolean;
		isError: boolean;
		error: TError | undefined;
		data: TData | undefined;
	}>
];
type ErrorType = undefined | { message: string; errors?: { [key: string]: string } };

export function useMutation<TData = undefined, TError = ErrorType>({
	endPoint,
	method = 'GET'
}: MutationProps): MutationReturn<TData, TError> {
	const state = {
		isLoading: false,
		isSuccess: false,
		isError: false,
		error: undefined,
		data: undefined
	};
	const mutationStore = writable(state);

	async function mutation(body: any = {}) {
		try {
			mutationStore.update((state) => ({
				...state,
				isLoading: true,
				isSuccess: false,
				isError: false,
				error: undefined
			}));

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
					isSuccess: false,
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
				isSuccess: false,
				isError: true,
				error: { message: 'Something went wrong' } as any
			}));
		}
	}

	return [mutation, mutationStore];
}
