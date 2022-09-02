<script>
	import MenuToggle from '$lib/MenuToggle.svelte';
	import DarkModeToggle from '$lib/DarkModeToggle.svelte';

	export let open = false;

	const durationIn = 1000;
	const durationOut = 500;
	const delay = 250;

	const navItems = [
		{ text: 'Nick Vincent', href: '/' },
		{ text: 'Expertise', href: '/expertise/' },
		{ text: 'Experience', href: '/experience/' },
		{ text: 'Education', href: '/education/' },
		{ text: 'Etcetera', href: '/etcetera/' }
	];

	const itemDurationIn = durationIn / navItems.length;
	const itemDurationOut = durationOut / navItems.length;

	const itemDelayIn = (i) => delay + itemDurationIn * i;
	const itemDelayOut = (i) => (navItems.length - i) * itemDurationOut;
	const itemStyles = (i) => {
		return `
      --duration-in: ${itemDurationIn}ms;
      --duration-out: ${itemDurationOut}ms;
      --delay-in: ${itemDelayIn(i)}ms;
      --delay-out: ${itemDelayOut(i)}ms;
    `;
	};

	function onKeyUp(e) {
		if (e.key === 'Escape') {
			open = false;
		}
	}
</script>

<svelte:window on:keyup={(e) => onKeyUp(e)} />

<MenuToggle bind:open />

<nav class:open style={`--delay-out: ${durationIn}ms`}>
	<ul>
		{#each navItems as { href, text }, i}
			<li style={itemStyles(i)}>
				<a sveltekit:prefetch {href} on:click={() => (open = false)}>{text}</a>
			</li>
		{/each}
	</ul>
</nav>

<DarkModeToggle />

<style>
	nav {
		z-index: 3;
		pointer-events: none;
		position: fixed;
		display: flex;
		flex-direction: column;
		place-content: center;
		align-items: center;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		padding: 1rem;
		font-size: 1.25rem;
		line-height: 1;
		letter-spacing: -0.05rem;
		text-align: center;
		will-change: opacity;
		opacity: 0;
		visibility: hidden;
		transition: var(--transition-dom-x-ray), visibility 0ms linear var(--delay-out),
			opacity 0ms linear var(--delay-out);
	}

	nav.open {
		pointer-events: auto;
		opacity: 1;
		visibility: visible;
		transition: var(--transition-dom-x-ray), visibility 0ms linear, opacity 0ms linear;
	}

	ul {
		display: flex;
		flex-direction: column;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		display: block;
		opacity: 0;
		visibility: hidden;
		will-change: opacity, transform, filter;
		filter: blur(0.25rem);
		transform: translateX(-1rem);
		transition: var(--transition-dom-x-ray),
			visibility var(--duration-out) ease-in-out var(--delay-out),
			opacity var(--duration-out) ease-in-out var(--delay-out),
			filter var(--duration-out) ease-in-out var(--delay-out),
			transform var(--duration-out) ease-in-out var(--delay-out);
	}

	.open li {
		opacity: 1;
		visibility: visible;
		filter: blur(0);
		transform: translateX(0);
		transition: var(--transition-dom-x-ray),
			visibility var(--duration-in) ease-in-out var(--delay-in),
			opacity var(--duration-in) ease-in-out var(--delay-in),
			filter var(--duration-in) ease-in-out var(--delay-in),
			transform var(--duration-in) ease-in-out var(--delay-in);
	}

	a {
		display: block;
		background: none;
		padding: 0.5rem 1rem;
		color: var(--color-h1);
		will-change: opacity;
		transition: var(--transition-dom-x-ray), opacity 0.5s ease-in-out;
	}

	nav:not(.open) a,
	ul:focus-within a:not(:focus) {
		opacity: 0.4;
	}

	@media (hover: hover) {
		ul:hover a:not(:hover) {
			opacity: 0.4;
		}
	}
</style>
