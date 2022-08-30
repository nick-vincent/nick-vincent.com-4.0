<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Scroller from '$lib/Scroller.svelte';
	import { faces } from '../../../../img/faces/faces.js';

	const face = faces.find((f) => f.slug === $page.params.slug);
	const index = faces.indexOf(face);
	const prevFace = faces[index - 1] || faces[faces.length - 1];
	const nextFace = faces[index + 1] || faces[0];

	const { id, name, slug, date, caption } = face;

	const imagePath = `../../../../img/faces/${slug}.png`;
	const image = import.meta.globEager('../../../../img/faces/*.png', {
		as: 'w=960&h=1200&webp&quality=100&metadata'
	})[imagePath];

	console.log(image);
	const src = image.src;

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
	<div class="lightbox">
		<div class="right">
			<h2>{name}.</h2>
			<p class="date">{date}</p>
			{#if caption}<p class="caption">“{caption}”</p>{/if}
			<p>
				<a href="https://instagram.com/p/${id}" rel="external" target="_blank">View on Instagram</a>
			</p>
			<p>
				<a sveltekit:prefetch href={`/etcetera/faces/`}>Back to faces</a>
			</p>
		</div>
		<div class="left">
			<img {src} alt={`${name}.`} loading="lazy" width="480" height="600" />
		</div>
	</div>
</Scroller>

<style>
	.lightbox {
		display: grid;
		grid-auto-flow: column;
		justify-content: center;
		gap: 1rem;
	}

	.left {
		order: 1;
		grid-column-start: 1;
		grid-row-start: 1;
	}

	.right {
		order: 2;
		max-width: 15rem;
		grid-column-start: 2;
		grid-row-start: 1;
	}

	img {
		display: block;
		width: calc(100vw - 2rem);
		height: auto;
		max-width: 20rem;
		object-fit: cover;
		aspect-ratio: 4 / 5;
		border-radius: 1rem;
		border-radius: 0.5rem;
	}

	@media (max-width: 800px) {
		.lightbox {
			display: flex;
			flex-wrap: wrap;
		}
	}
</style>
