<script>
	import Button from '$lib/components/common/Button.svelte';
	import Input from '$lib/components/common/Input.svelte';
</script>

<svelte:head>
	<title>Contact Us</title>
	<meta name="description" content="Contact Us and let us know your query" />
</svelte:head>

<section>
	<div class="container">
		<div class="contactus">
			<h3 class="contactus__heading">Contact us</h3>

			<form class="contact__form">
				<Input inputLabel="Email" name="email" placeholder="Your Email address" />
				<Input inputLabel="Subject" name="subject" placeholder="Enter Subject" />
				<Input type="textarea" inputLabel="message" name="message" placeholder="Enter Subject" />
				<Button>Send</Button>
			</form>
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

	.contact__form {
		margin-inline: auto;
		width: 100%;
		max-width: 50rem;
	}
</style>
