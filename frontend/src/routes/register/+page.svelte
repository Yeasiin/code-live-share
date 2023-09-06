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
	<title>Register new account</title>
	<meta name="description" content="Register new account before login" />
</svelte:head>

<section>
	<div class="register">
		<div class="container">
			<div class="register__heading">Register a account before login</div>
			<div class="register__form">
				<form action="" method="post">
					<Input
						errors={$errors}
						{handleChange}
						name="firstName"
						inputLabel="First Name"
						placeholder="First Name"
					/>
					<Input
						errors={$errors}
						{handleChange}
						name="lastName"
						inputLabel="Last Name"
						placeholder="Last Name"
					/>
					<Input
						errors={$errors}
						{handleChange}
						name="email"
						type="email"
						inputLabel="Email Address"
						placeholder="Email Address"
					/>
					<Input
						errors={$errors}
						{handleChange}
						name="password"
						type="password"
						inputLabel="Password"
						placeholder="Password"
					/>

					<Button type="submit">Register</Button>
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
