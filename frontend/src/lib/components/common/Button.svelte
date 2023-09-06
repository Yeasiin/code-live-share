<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' | null | undefined;
</script>

<button {type}> <slot /></button>

<style>
	button {
		margin-top: 1rem;
		background: #141414;
		color: #fff;
		padding: 1rem 3rem;
		border-radius: 0.4rem;
		width: 100%;
		transition: 0.3s ease-in;
	}

	button:hover {
		background: #1f1f1fdd;
	}
</style>
