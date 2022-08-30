<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Scroller from '$lib/Scroller.svelte';
	import IntersectionObserver from '$lib/IntersectionObserver.svelte';
	import { faces } from '../../../../img/faces/faces.js';

	const face = faces.find((f) => f.slug === $page.params.slug);
	const index = faces.indexOf(face);
	const prevFace = faces[index - 1] || faces[faces.length - 1];
	const nextFace = faces[index + 1] || faces[0];

	const { id, name, slug, date, caption } = face;

	const imagePath = `../../../../img/faces/${slug}.png`;
	const image = import.meta.globEager('../../../../img/faces/*.png', {
		as: 'w=1920&h=1200&webp&quality=100&fit=inside&meta=src;aspect;width;height'
	})[imagePath];

	const { src, aspect, width, height } = image;

	let loaded = false;

	function onLoad() {
		loaded = true;
	}

	function onKeyUp(e) {
		switch (e.key) {
			case 'Escape':
				goto('/etcetera/faces/');
				break;
			case 'ArrowLeft':
				if (prevFace) {
					goto(`/etcetera/faces/${prevFace.slug}`);
				}
				break;
			case 'ArrowRight':
				if (nextFace) {
					goto(`/etcetera/faces/${nextFace.slug}`);
				}
				break;
		}
	}
</script>

<svelte:head>
	<title>Nick Vincent → Etcetera → Faces → {name}.</title>
	<meta name="description" content={`“${caption}”`} />
</svelte:head>

<svelte:window on:keyup={(e) => onKeyUp(e)} />

<Scroller width="40rem">
	<div class="lightbox {aspect <= 1.25 ? 'portrait' : 'landscape'}">
		<div class="right">
			<h1>{name}.</h1>
			<p class="date">{date}</p>
			{#if caption}<p class="caption">“{caption}”</p>{/if}
			<p>
				<a href="https://instagram.com/p/${id}" rel="external" target="_blank">View on Instagram</a>
			</p>
			<p>
				<a sveltekit:prefetch href={`/etcetera/faces/`}>Back to faces</a>
			</p>
		</div>
		<div class="left" style:aspect-ratio={aspect}>
			<IntersectionObserver once={true} let:intersecting>
				{#if intersecting}
					<img
						{src}
						{width}
						{height}
						alt={`${name}.`}
						style:aspect-ratio={aspect}
						class:loaded
						on:load={onLoad}
					/>
				{/if}
			</IntersectionObserver>
		</div>
	</div>
</Scroller>

<style>
	h1 {
		font-size: 1.5rem;
		letter-spacing: -0.025rem;
	}

	.lightbox {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}

	.left {
		order: 1;
		max-width: 100%;
		border-radius: 1rem;
		background-color: rgba(0, 0, 0, 0.1);
		box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
	}
	.right {
		order: 2;
		max-width: 15rem;
	}
	.landscape .left {
		width: 40rem;
	}
	.portrait .left {
		width: 24rem;
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 1rem;
		opacity: 0;
		transition: var(--transition-dom-x-ray), opacity 1s ease;
	}
	img.loaded {
		opacity: 1;
	}
</style>
