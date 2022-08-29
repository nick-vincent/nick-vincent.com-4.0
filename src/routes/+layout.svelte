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
		transition: var(--transition-dom-x-ray), filter 500ms var(--easing-decelerate) 500ms,
			visibility 500ms var(--easing-decelerate) 500ms, opacity 500ms var(--easing-decelerate) 500ms,
			scale 500ms var(--easing-decelerate) 500ms;
	}

	main.navOpen {
		opacity: 0;
		visibility: hidden;
		scale: 0.9;
		filter: blur(1rem);
		transition: var(--transition-dom-x-ray), filter 500ms var(--easing-accelerate),
			visibility 500ms var(--easing-accelerate), opacity 500ms var(--easing-accelerate),
			scale 500ms var(--easing-accelerate);
	}
</style>
