<script>
	import { onMount } from 'svelte';
	import { createObserver } from 'svelte-use-io';

	export let url;
	export let src;
	export let alt;

	const { observer } = createObserver();
	const rotation = (Math.random() - 0.5) * 45;

	let img;
	let visible = false;
	let loaded = false;

	onMount(() => {
		img.removeAttribute('src');
		img.removeAttribute('loading');
	});

	function onLoad() {
		loaded = true;
	}

	function onVisible() {
		visible = true;
		img.src = src;
	}
</script>

<a
	href={url}
	class:loaded
	class:visible
	style:--rotation={`${rotation}deg`}
	use:observer={{ once: true }}
	on:intersecting={onVisible}
>
	<img bind:this={img} {src} {alt} width="280" height="280" loading="lazy" on:load|once={onLoad} />
</a>

<style>
	a {
		z-index: 1;
		position: relative;
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 1;
		border-radius: 0.5rem;
		background-color: var(--image-background);
		will-change: opacity, transform;
		opacity: 0;
		transform: scale(0) rotate(var(--rotation));
		transition: var(--transition-dom-x-ray), opacity 500ms ease, transform 500ms ease;
	}

	a::before,
	a::after {
		content: '';
		display: block;
		position: absolute;
		inset: 0;
		border-radius: 0.5rem;
	}
	a::before {
		box-shadow: var(--image-shadow);
	}
	a::after {
		will-change: opacity;
		opacity: 0;
		box-shadow: var(--image-shadow-focus);
		transition: var(--transition-dom-x-ray), opacity 150ms ease;
	}

	a.visible,
	:global(html.no-js) a {
		opacity: 1;
		transform: scale(1) rotate(0deg);
	}

	a.loaded {
		transition: var(--transition-dom-x-ray), transform 150ms ease;
	}

	a:focus {
		z-index: 2;
		transform: scale(1.1);
	}
	a:focus::after {
		opacity: 1;
	}
	@media (hover: hover) {
		a:hover {
			z-index: 2;
			transform: scale(1.1);
		}
		a:hover::after {
			opacity: 1;
		}
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 0.5rem;
		will-change: opacity;
		opacity: 0;
		transition: var(--transition-dom-x-ray), opacity 1s linear;
	}
	a.loaded img,
	:global(html.no-js) img {
		opacity: 1;
	}
</style>
