<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' | null | undefined;
	export let isLoading: boolean = false;
</script>

<button {type}>
	<div class="vertical-center">
		<slot />
		{#if isLoading}
			<div class={`spinner__container`}>
				<span class="spinner" />
			</div>
		{/if}
	</div>
</button>

<style>
	.spinner__container {
		display: inline-flex;
		margin-inline: 0.6rem;
	}
	.spinner {
		--size: 16px;
		height: var(--size);
		width: var(--size);
		border-width: 3px;
		border-color: #fff;
		display: inline-block;
		border-style: solid;
		border-right-color: transparent;
		border-radius: 100%;
		animation: spin 1s linear infinite;
	}
	@keyframes spin {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
	button {
		font-size: 1.4rem;
		font-weight: 600;
		background: #141414;
		color: #fff;
		padding: 0.7rem 3rem;
		border-radius: 0.4rem;
		width: 100%;
		line-height: 2;
		transition: 0.3s ease-in;
	}

	button:hover {
		background: #1f1f1fdd;
	}
	.vertical-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
