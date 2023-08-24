<script>
	import Header from '$lib/components/Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<Header />
	<main>
		<slot />
	</main>

	<footer>
		<!-- footer will be here -->
		<!-- <div class="container">footer</div> -->
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	main {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}
</style>
