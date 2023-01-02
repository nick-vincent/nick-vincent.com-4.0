<script>
	import { onMount } from 'svelte';
	import { createObserver } from 'svelte-use-io';

	export let image;

	const { title, url, thumbData } = image;
	const { src } = thumbData;
	const { observer } = createObserver();

	let img;
	let mouseX = 0;
	let mouseY = 0;
	let loaded = false;

	$: rotateY = mouseX ? `${(mouseX / img.clientWidth) * 2 * 10}deg` : '0deg';
	$: rotateX = mouseY ? `${(mouseY / img.clientHeight) * 2 * 10}deg` : '0deg';

	onMount(() => {
		img.removeAttribute('src');
		img.removeAttribute('loading');
	});

	function onLoad() {
		loaded = true;
	}

	function onVisible() {
		img.src = src;
	}

	function onMouseMove(e) {
		mouseX = e.offsetX - e.target.clientWidth / 2;
		mouseY = e.target.clientHeight / 2 - e.offsetY;
	}

	function onMouseLeave(e) {
		mouseX = 0;
		mouseY = 0;
	}
</script>

<a
	href={url}
	class:loaded
	use:observer={{ once: true }}
	on:intersecting={onVisible}
	on:mousemove={(e) => onMouseMove(e)}
	on:mouseleave={(e) => onMouseLeave(e)}
>
	<span
		class="card"
		style:--mouseX={mouseX}
		style:--mouseY={mouseY}
		style:--rotateX={rotateX}
		style:--rotateY={rotateY}
	>
		<span class="shine" />
		<img
			bind:this={img}
			{src}
			alt={title}
			width="280"
			height="280"
			loading="lazy"
			on:load|once={onLoad}
		/>
	</span>
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
	}
	a::before {
		display: none;
	}

	.card {
		--scale: 1;
		position: relative;
		display: block;
		border-radius: 0.5rem;
		background-color: var(--image-background);
		box-shadow: var(--image-shadow);
		overflow: hidden;
		will-change: transform;
		backface-visibility: hidden;
		transform-style: preserve-3d;
		transform: perspective(10em) scale(var(--scale)) rotateY(var(--rotateY)) rotateX(var(--rotateX));
		transition: var(--transition-dom-x-ray), box-shadow 150ms ease-in, transform 150ms ease-in;
	}

	/* light gradient */
	.shine {
		z-index: 2;
		pointer-events: none;
		content: '';
		display: block;
		position: absolute;
		inset: -50%;
		will-change: opacity, transform;
		opacity: 0;
		background-image: radial-gradient(circle closest-side, white, transparent);
		background-repeat: no-repeat;
		transition: var(--transition-dom-x-ray), transform 150ms ease-in, opacity 150ms ease-in;
		transform: translateX(calc(var(--mouseX) * 1px)) translateY(calc(var(--mouseY) * -1px));
	}

	a:focus .card {
		--scale: 1.075;
		z-index: 2;
		box-shadow: var(--image-shadow-focus);
		transition: var(--transition-dom-x-ray), box-shadow 150ms ease-out, transform 150ms ease-out;
	}
	a:focus .shine {
		opacity: 0.1;
		transition: var(--transition-dom-x-ray), transform 150ms ease-out, opacity 150ms ease-out;
	}

	@media (hover: hover) {
		a:hover .card {
			--scale: 1.075;
			z-index: 2;
			box-shadow: var(--image-shadow-focus);
			transition: var(--transition-dom-x-ray), box-shadow 150ms ease-out, transform 150ms ease-out;
		}
		a:hover .shine {
			opacity: 0.2;
			transition: var(--transition-dom-x-ray), transform 150ms ease-out, opacity 150ms ease-out;
		}
	}

	img {
		pointer-events: none;
		display: block;
		width: 100%;
		height: auto;
		border-radius: 0.5rem;
		will-change: opacity;
		opacity: 0;
		transition: var(--transition-dom-x-ray), opacity 500ms ease-in-out;
	}
	a.loaded img,
	:global(html.no-js) img {
		opacity: 1;
	}
</style>
