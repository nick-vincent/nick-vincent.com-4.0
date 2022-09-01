<script>
	import slugify from 'slugify';
	import Scroller from '$lib/Scroller.svelte';
	import Gallery from '$lib/Gallery.svelte';
	import { data } from '../../../img/photos/_manifest.js';

	const files = import.meta.globEager('../../../img/photos/*.jpg', {
		as: 'w=280&h=280&webp&meta=src'
	});

	const images = [...data];
	for (const image of images) {
		image.slug = `${image.date}-${slugify(image.title, { lower: true, strict: true })}`;
		image.src = files[`../../../img/photos/${image.slug}.jpg`].src;
	}
</script>

<svelte:head>
	<title>Nick Vincent → Etcetera → Photos</title>
</svelte:head>

<Scroller width="40rem">
	<Gallery title="Photos" {images} dir={'/etcetera/photos/'} />
</Scroller>
