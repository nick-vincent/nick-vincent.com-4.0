<script>
	import slugify from 'slugify';
	import Scroller from '$lib/Scroller.svelte';
	import Gallery from '$lib/Gallery.svelte';
	import { data } from '../../../img/photos/_manifest.js';

	const files = import.meta.globEager('../../../img/photos/*.jpg', {
		as: 'w=280&h=280&webp&meta=src'
	});

	const images = [];
	for (let i = 0; i < data.length; i++) {
		const image = { ...data[i] };
		const slug = `${image.date}-${slugify(image.title, { lower: true, strict: true })}`;
		image.src = files[`../../../img/photos/${slug}.jpg`].src;
		image.url = `/etcetera/photos/${slug}/`;
		images[i] = image;
	}
</script>

<svelte:head>
	<title>Nick Vincent → Etcetera → Photos</title>
	<meta name="description" content="Pictures at various locales around the world." />
</svelte:head>

<Scroller width="40rem">
	<h1>Photos</h1>
	<p>Pictures at various locales around the world.</p>
	<Gallery {images} />
</Scroller>

<style>
	p {
		margin-bottom: 2rem;
	}
</style>
