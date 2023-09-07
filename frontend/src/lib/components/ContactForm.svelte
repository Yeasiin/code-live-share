<script lang="ts">
	import { fly } from 'svelte/transition';
	import * as yup from 'yup';
	import { createForm } from 'svelte-forms-lib';
	import Button from './common/Button.svelte';
	import Input from './common/Input.svelte';
	import { baseUrl } from '$lib/utils/apiEndPoints';
	import { useMutation } from '$lib/api';

	const [mutateMail, data] = useMutation({
		endPoint: `${baseUrl}v1/util/contact`,
		method: 'POST'
	});

	async function sendMail(value: { email: string; fullName: string; message: string }) {
		await mutateMail(value);
	}

	const { form, errors, handleChange, handleSubmit, handleReset } = createForm({
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
			await sendMail(value);
			handleReset();
		}
	});
</script>

<form class="contact__form" on:submit={handleSubmit}>
	{#if $data.isError}
		<div class="error_msg" style="margin-bottom:1rem;text-transform:capitalize">
			{$data?.error?.message}
		</div>
	{/if}

	{#if $data.isSuccess}
		<div
			transition:fly={{
				opacity: 0.5,
				y: 50,
				duration: 3
			}}
			class="success__msg"
		>
			Thank You for Contacting Us, We have received your email
		</div>
	{/if}

	<Input
		value={$form.fullName}
		inputLabel="Full Name"
		{handleChange}
		name="fullName"
		placeholder="Enter Full name"
		error={$errors.fullName}
		serverError={$data?.error?.errors?.fullName}
	/>
	<Input
		value={$form.email}
		inputLabel="Email"
		name="email"
		{handleChange}
		placeholder="Your Email address"
		error={$errors.email}
		serverError={$data?.error?.errors?.email}
	/>

	<Input
		value={$form.message}
		type="textarea"
		inputLabel="Message"
		name="message"
		{handleChange}
		placeholder=""
		error={$errors.message}
		serverError={$data?.error?.errors?.message}
	/>

	<Button type={'submit'} isLoading={$data.isLoading}>Send</Button>
</form>

<style>
	.contact__form {
		margin-inline: auto;
		width: 100%;
		max-width: 50rem;
	}
	.success__msg {
		text-align: center;
		margin-block: 1rem;
	}
</style>
