<script></script>

<!-- navigation -->
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

		<div class="header__actions">
			<a href="/register">Signup</a>
			<a href="/login">Login</a>
		</div>
	</nav>
</div>

<style>
	/* header */
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
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
</style>
