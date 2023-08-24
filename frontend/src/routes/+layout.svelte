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
	</footer>
</div>

<style>
</style>
