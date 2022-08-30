<script>
	import { sineOut } from 'svelte/easing';

	export let url;
	export let src;
	export let alt;

	let loaded = false;

	function onLoad() {
		loaded = true;
	}

	function fadeIn(node, { duration, delay, easing }) {
		const rotation = (Math.random() - 0.5) * 45;
		return {
			delay,
			duration,
			css: (t) => {
				const eased = easing(t);
				return `
					opacity: ${eased};
					transform: scale(${eased}) rotate(${rotation * (1 - eased)}deg);
				`;
			}
		};
	}
</script>

<a sveltekit:prefetch href={url} in:fadeIn={{ duration: 500, easing: sineOut }}>
	<img {src} {alt} class:loaded width="280" height="280" on:load={onLoad} />
</a>

<style>
	a {
		z-index: 1;
		overflow: hidden;
		position: relative;
		display: block;
		border-radius: 0.5rem;
		background-color: var(--image-background);
		box-shadow: var(--image-shadow);
		transition: var(--transition-dom-x-ray), box-shadow 150ms ease, scale 150ms ease;
	}
	a::after {
		display: none;
	}
	a:focus {
		z-index: 2;
		box-shadow: var(--image-shadow-focus);
		scale: 1.1;
	}
	@media (hover: hover) {
		a:hover {
			z-index: 2;
			box-shadow: var(--image-shadow-focus);
			scale: 1.1;
		}
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 0.5rem;
		opacity: 0;
		transition: var(--transition-dom-x-ray), opacity 1s ease;
	}
	img.loaded {
		opacity: 1;
	}
</style>
