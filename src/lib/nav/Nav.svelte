<script>
	const navItems = [
		{ text: 'Nick Vincent', href: '/' },
		{ text: 'Expertise', href: '/expertise/' },
		{ text: 'Experience', href: '/experience/' },
		{ text: 'Education', href: '/education/' },
		{ text: 'Etcetera', href: '/etcetera/' }
	];
</script>

<nav>
	<ul>
		{#each navItems as { href, text }, i}
			<li>
				<a sveltekit:prefetch {href}>{text}</a>
			</li>
		{/each}
	</ul>
</nav>
