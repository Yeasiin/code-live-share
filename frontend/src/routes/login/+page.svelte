<script lang="ts">
	import { fly } from 'svelte/transition';
	import { createForm } from 'svelte-forms-lib';
	import { useMutation } from '$lib/api';
	import Button from '$lib/components/common/Button.svelte';
	import Input from '$lib/components/common/Input.svelte';
	import { baseUrl } from '$lib/utils/apiEndPoints';

	type RequestResponse = {
		status: string;
		success: boolean;
		message: string;
		data: unknown;
		token: string;
	};

	const [login, data] = useMutation<RequestResponse>({
		endPoint: `${baseUrl}v1/auth/login`,
		method: 'POST'
	});

	const { form, errors, handleChange, handleSubmit, handleReset } = createForm({
		initialValues: {
			email: '',
			password: ''
		},

		onSubmit: async (value) => {
			await login(value);
			handleReset();
		}
	});
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login with your email and password" />
</svelte:head>

<section>
	<div class="login">
		<div class="container">
			<p class="login__heading">Login into your account</p>
			<div class="login__form">
				<form on:submit={handleSubmit}>
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
							Login Successful, Redirecting...
						</div>
					{/if}

					<Input
						type="email"
						value={$form.email}
						error={$errors.email}
						serverError={$data.error?.errors?.email}
						{handleChange}
						name="email"
						inputLabel="Email Address"
						placeholder="Email Address"
					/>
					<Input
						error={$errors.password}
						value={$form.password}
						serverError={$data.error?.errors?.password}
						{handleChange}
						inputLabel="Password"
						name="password"
						type="password"
						placeholder="Password"
					/>

					<p class="forgot">Forgot Password?</p>
					<Button type="submit">Login</Button>
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
	.login__heading {
		text-align: center;
		margin-bottom: 1.5rem;
		font-size: 2rem;
		font-weight: 600;
	}
	.login {
		width: 100%;
	}
	.login__form {
		background: #fff;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
		padding: 4rem;
		border-radius: 0.4rem;
		width: 100%;
		max-width: 40rem;
		margin-inline: auto;
	}

	.forgot {
		text-align: right;
		font-size: 1.4rem;
		color: rgb(120, 62, 255);
		font-weight: 600;
		margin-top: -0.5rem;
		margin-bottom: 0.5rem;
	}
</style>
