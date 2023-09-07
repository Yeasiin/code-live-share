<script lang="ts">
	import { fly } from 'svelte/transition';
	import { useMutation } from '$lib/api';
	import Button from '$lib/components/common/Button.svelte';
	import Input from '$lib/components/common/Input.svelte';
	import { baseUrl } from '$lib/utils/apiEndPoints';
	import { createForm } from 'svelte-forms-lib';

	type RequestResponse = {
		status: string;
		success: boolean;
		message: string;
		data: unknown;
		token: string;
	};

	const [registerUser, data] = useMutation<RequestResponse>({
		endPoint: `${baseUrl}v1/auth/register`,
		method: 'POST'
	});

	const { form, errors, handleChange, handleSubmit, handleReset } = createForm({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: ''
		},

		onSubmit: async (value) => {
			await registerUser(value);
			handleReset();
		}
	});
</script>

<svelte:head>
	<title>Register new account</title>
	<meta name="description" content="Register new account before login" />
</svelte:head>

<section>
	<div class="register">
		<div class="container">
			<div class="register__heading">Register a account before login</div>
			<div class="register__form">
				<form on:submit={handleSubmit} method="post">
					{#if $data.isError}
						<div class="error_msg" style="margin-bottom:1rem;text-transform:capitalize">
							{$data?.error?.message}
						</div>
					{/if}

					{#if $data.isSuccess && $data.data?.success}
						<div
							transition:fly={{
								opacity: 0.5,
								y: 50,
								duration: 3
							}}
							class="success__msg"
						>
							User Registration Successful
						</div>
					{/if}
					<Input
						error={$errors.firstName}
						value={$form.firstName}
						{handleChange}
						name="firstName"
						inputLabel="First Name"
						placeholder="First Name"
					/>
					<Input
						error={$errors.lastName}
						value={$form.lastName}
						{handleChange}
						name="lastName"
						inputLabel="Last Name"
						placeholder="Last Name"
					/>
					<Input
						error={$errors.email}
						value={$form.email}
						{handleChange}
						name="email"
						type="email"
						inputLabel="Email Address"
						placeholder="Email Address"
					/>
					<Input
						error={$errors.password}
						value={$form.password}
						{handleChange}
						name="password"
						type="password"
						inputLabel="Password"
						placeholder="Password"
					/>
					<Input
						error={$errors.confirmPassword}
						value={$form.confirmPassword}
						{handleChange}
						name="confirmPassword"
						type="password"
						inputLabel="Confirm Password"
						placeholder="Confirm Password"
					/>

					<Button isLoading={$data.isLoading} type="submit">Register</Button>
				</form>
			</div>
		</div>
	</div>
</section>

<style>
	section {
		display: flex;
		align-items: center;
		flex-grow: 1;
		background: rgb(238, 238, 238);
	}
	.register__heading {
		text-align: center;
		font-size: 2rem;
		margin-bottom: 1.5rem;
		font-weight: 600;
	}
	.register {
		width: 100%;
		margin-block: 5rem;
	}
	.register__form {
		background: #fff;
		border-radius: 0.4rem;
		padding: 4rem;
		margin-inline: auto;
		max-width: 40rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}
</style>
