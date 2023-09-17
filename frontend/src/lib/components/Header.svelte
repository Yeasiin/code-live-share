<script>
	import { user } from '$lib/store/user';

	const handleLogout = () => {
		user.logOut();
	};
</script>

<!-- navigation -->
<header>
	<div class="container">
		<nav class="header">
			<div class="header__logo">
				<a href="/">LOGO</a>
			</div>

			<ul class="navigation">
				<li class="navigation__item">
					<a class="navigation__link" href="/">Home</a>
				</li>
				<li class="navigation__item">
					<a class="navigation__link" href="/about">About</a>
				</li>
				<li class="navigation__item">
					<a class="navigation__link" href="/contact">Contact</a>
				</li>
			</ul>

			<div>
				{#if $user.data?.firstName}
					hello {$user.data?.firstName}
					<button on:click={handleLogout} class="logout">Logout</button>
				{:else}
					<div class="header__actions">
						<a href="/register">Signup</a>
						<a href="/login">Login</a>
					</div>
				{/if}
			</div>
		</nav>
	</div>
</header>

<style>
	/* header */
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-block: 1.5rem;
	}
	.header__logo {
		font-weight: 600;
		font-size: 2.5rem;
	}

	/*  navigation */
	.navigation {
		display: flex;
		gap: 1rem;
	}
	.navigation__item {
		padding-inline: 1rem;
		margin-inline: 1rem;
		font-weight: 500;
	}
	.logout {
		border: 1px solid rgb(45, 104, 158);
		padding-inline: 1rem;
		padding-block: 0.4rem;
		border-radius: 0.4rem;
		margin-left: 1rem;
		font-weight: 600;
	}
	.header__actions {
		display: flex;
		align-items: center;
		gap: 2rem;
		font-weight: 600;
	}
	.header__actions a {
		border: 1px solid rgb(45, 104, 158);
		padding-inline: 1rem;
		padding-block: 0.4rem;
		border-radius: 0.4rem;
	}
</style>
