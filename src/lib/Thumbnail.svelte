<script>
	export let url;
	export let src;
	export let alt;
	export let visible = false;

	const rotation = (Math.random() - 0.5) * 45;

	let img;
	let loaded = false;
	function onLoad() {
		loaded = true;
	}

	$: if (visible) {
		img.src = src;
	}
</script>

<a sveltekit:prefetch class:loaded class:visible href={url} style:--rotation={`${rotation}deg`}>
	<img bind:this={img} {alt} width="280" height="280" on:load|once={onLoad} />
</a>

<style>
	a {
		z-index: 1;
		overflow: hidden;
		position: relative;
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 1;
		border-radius: 0.5rem;
		background-color: var(--image-background);
		box-shadow: var(--image-shadow);
		opacity: 0;
		transform: scale(0) rotate(var(--rotation));
		transition: var(--transition-dom-x-ray), opacity 500ms ease, transform 500ms ease;
	}
	a::after {
		display: none;
	}
	a.visible {
		opacity: 1;
		transform: scale(1) rotate(0deg);
	}
	a.loaded {
		transition: var(--transition-dom-x-ray), box-shadow 150ms ease, scale 150ms ease;
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
		transition: var(--transition-dom-x-ray), opacity 1s linear;
	}
	a.loaded img {
		opacity: 1;
	}
</style>
