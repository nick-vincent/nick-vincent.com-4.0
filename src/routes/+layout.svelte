<script>
	import Nav from '$lib/nav/Nav.svelte';
	import '../app.css';
</script>

<Nav />

<main>
	<div class="content">
		<slot />
	</div>
</main>

<style>
	main {
		--gradientMask: linear-gradient(
			to bottom,
			transparent 3em,
			black 7em,
			black calc(100% - 4em),
			transparent 100%
		);
		z-index: 2;
		overflow-y: scroll;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		padding: 6rem 1rem;
		mask-image: var(--gradientMask);
		-webkit-mask-image: var(--gradientMask);
		transform-origin: center;
		transition-property: opacity, filter, transform;
		transition-duration: var(--duration-blur);
		transition-timing-function: var(--easing-standard);
		transition-delay: var(--duration-nav-out);
	}

	main.navOpen {
		opacity: 0;
		filter: blur(1rem);
		transform: scale(0.9);
		transition-delay: 0ms;
	}

	.content {
		max-width: 15rem;
		min-height: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		place-content: center;
	}

	@media print {
		main {
			position: static;
			padding: 0;
			mask-image: none;
			-webkit-mask-image: none;
		}
		.content {
			max-width: none;
		}
	}
</style>
