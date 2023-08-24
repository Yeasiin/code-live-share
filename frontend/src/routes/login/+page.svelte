<script>
	import HeroArea from '$lib/components/HeroArea.svelte';
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login with your email and password" />
</svelte:head>

<section>
	<div class="login">
		<div class="container">
			<div class="login__form">
				<form class="" action="" method="post">
					<div>
						<label for="email">Email Address</label>
						<input type="text" name="email" placeholder="Email Address" id="email" />
					</div>
					<div>
						<label for="password">Password</label>
						<input type="password" name="password" placeholder="Password" id="password" />
					</div>
					<button>Login</button>
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
	.login {
		width: 100%;
	}
	.login__form {
		background: #fff;
		padding-block: 4rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
		padding-inline: 4rem;
		border-radius: 0.4rem;
		width: 100%;
		max-width: 35rem;
		margin-inline: auto;
	}

	label {
		font-weight: 600;
		margin-bottom: 0.5rem;
		display: block;
	}
	input {
		width: 100%;
		margin-bottom: 1.5rem;
		border: 1px solid #e2e8f0;
		border-radius: 0.4rem;
		padding: 1rem 1.5rem;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
	}

	button {
		margin-top: 1rem;
		background: #383838dd;
		color: #fff;
		padding: 1rem 3rem;
		border-radius: 0.4rem;
	}
</style>
