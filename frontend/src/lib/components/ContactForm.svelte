<script lang="ts">
	export const ssr = false;
	import * as yup from 'yup';
	import { createForm } from 'svelte-forms-lib';
	import Button from './common/Button.svelte';
	import Input from './common/Input.svelte';
	import { baseUrl } from '$lib/utils/apiEndPoints';

	function sendMail(value: { email: string; fullName: string; message: string }) {
		console.log(value, 'send mail', `${baseUrl}v1/util/contact`);
		const result = fetch(`${baseUrl}v1/util/contact`, {
			method: 'POST',
			body: JSON.stringify(value)
		}).then((data) => data.json);

		console.log(result);
		return result;
	}

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			fullName: '',
			email: '',
			message: ''
		},
		validationSchema: yup.object().shape({
			fullName: yup.string().required(),
			email: yup.string().email().trim().required(),
			message: yup.string().min(5, 'Message is too short').required()
		}),
		onSubmit: async (value) => {
			console.log(value);

			sendMail(value);

			// const { success, data } = await sendContactMail.send({ data: value });
			// console.log({ data, success });
			return;
		}
	});
</script>

<form class="contact__form" on:submit={handleSubmit}>
	<Input
		inputLabel="Full Name"
		{handleChange}
		name="fullName"
		placeholder="Enter Full name"
		error={$errors.fullName}
	/>
	<Input
		inputLabel="Email"
		name="email"
		{handleChange}
		placeholder="Your Email address"
		error={$errors.email}
	/>

	<Input
		type="textarea"
		inputLabel="Message"
		name="message"
		{handleChange}
		placeholder=""
		error={$errors.message}
	/>
	<Button type={'submit'}>Send</Button>
</form>

<style>
	.contact__form {
		margin-inline: auto;
		width: 100%;
		max-width: 50rem;
	}
</style>
