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
		as: 'w=1920&h=1200&webp&quality=100&fit=inside&meta=src;aspect'
	})[imagePath];

	const src = image.src;
	const ratio = image.aspect;

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
	<div class="lightbox {ratio <= 1.25 ? 'portrait' : 'landscape'}">
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
		<div class="left">
			<img {src} alt={`${name}.`} loading="lazy" style:aspect-ratio={ratio} />
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
	}

	.right {
		order: 2;
		max-width: 15rem;
	}

	img {
		display: block;
		width: 100%;
		border-radius: 1rem;
		box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
	}

	.portrait img {
		max-width: 24rem;
	}
</style>
