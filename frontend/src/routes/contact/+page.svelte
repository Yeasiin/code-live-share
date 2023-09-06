<script>
	import ContactForm from '$lib/components/ContactForm.svelte';
</script>

<svelte:head>
	<title>Contact Us</title>
	<meta name="description" content="Contact Us and let us know your query" />
</svelte:head>

<section>
	<div class="container">
		<div class="contactus">
			<h3 class="contactus__heading">Contact us</h3>
			<ContactForm />
		</div>
	</div>
</section>

<style>
	.contactus {
		padding-block: 3rem;
	}
	.contactus__heading {
		text-align: center;
		font-size: 2.5rem;
		margin-bottom: 2rem;
	}
</style>
