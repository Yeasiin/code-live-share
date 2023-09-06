<script>
	import Button from '$lib/components/common/Button.svelte';
	import Input from '$lib/components/common/Input.svelte';
	import { createForm } from 'svelte-forms-lib';

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: '',
			fullName: '',
			message: ''
		},

		onSubmit: (value) => {
			console.log('famil');
			alert(JSON.stringify(value));
			return null;
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
				<form class="" action="" method="post">
					<Input
						type="email"
						errors={$errors}
						{handleChange}
						name="email"
						inputLabel="Email Address"
						placeholder="Email Address"
					/>
					<Input
						errors={$errors}
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
