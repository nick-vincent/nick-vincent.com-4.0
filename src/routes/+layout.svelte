<script>
	import Nav from '$lib/Nav.svelte';
	import Transition from '$lib/Transition.svelte';
	import '../app.css';

	export let data;

	let navOpen = false;
</script>

<Nav bind:open={navOpen} />

<main class:navOpen>
	<Transition pathname={data.pathname}>
		<slot />
	</Transition>
</main>

<style>
	main {
		z-index: 2;
		position: fixed;
		inset: 0;
		transition: var(--transition-dom-x-ray), filter 500ms ease-in-out 500ms,
			visibility 500ms ease-in-out 500ms, opacity 500ms ease-in-out 500ms;
	}

	main.navOpen {
		opacity: 0;
		visibility: hidden;
		filter: blur(1rem);
		transition: var(--transition-dom-x-ray), filter 500ms ease-in-out, visibility 500ms ease-in-out,
			opacity 500ms ease-in-out;
	}
</style>
