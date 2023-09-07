<script lang="ts">
	import type { HTMLInputTypeAttribute, KeyboardEventHandler } from 'svelte/elements';

	export let type: HTMLInputTypeAttribute | 'textarea' = 'text';
	export let handleChange: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
	export let value: string;
	export let serverError: string | undefined;
	export let inputLabel: string;
	export let placeholder: string;
	export let name: string;
	export let error: any;
	const uuid = crypto.randomUUID();
</script>

<div>
	<label for={uuid}>{inputLabel}</label>
	<div class="inputGroup">
		{#if type === 'textarea'}
			<textarea {value} on:keyup={handleChange} {name} id={uuid} cols="30" rows="10" />
		{:else}
			<input {value} on:keyup={handleChange} {type} {name} {placeholder} id={uuid} />
		{/if}

		{#if serverError}
			<small class="error_msg">{serverError}</small>
		{/if}
		{#if error}
			<small class="error_msg">{error}</small>
		{/if}
	</div>
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
		border: 1px solid #e2e8f0;
		border-radius: 0.4rem;
		padding: 1rem 1.5rem;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
	}
	.inputGroup {
		margin-bottom: 1.5rem;
	}
</style>
