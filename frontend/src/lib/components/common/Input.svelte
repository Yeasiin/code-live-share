<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	export let type: HTMLInputTypeAttribute | 'textarea' = 'text';
	export let inputLabel: string;
	export let placeholder: string;
	export let name: string;
	const uuid = crypto.randomUUID();
</script>

<div>
	<label for={uuid}>{inputLabel}</label>
	{#if type === 'textarea'}
		<textarea {name} id={uuid} cols="30" rows="10" />
	{:else}
		<input {type} {name} {placeholder} id={uuid} />
	{/if}
</div>

<style>
	label {
		font-weight: 600;
		margin-bottom: 0.5rem;
		display: block;
	}
	input,
	textarea {
		width: 100%;
		margin-bottom: 1.5rem;
		border: 1px solid #e2e8f0;
		border-radius: 0.4rem;
		padding: 1rem 1.5rem;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
	}
</style>
