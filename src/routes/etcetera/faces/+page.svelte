<script>
	import slugify from 'slugify';
	import Scroller from '$lib/Scroller.svelte';
	import Gallery from '$lib/Gallery.svelte';
	import { data } from '../../../img/faces/_manifest.js';

	const files = import.meta.globEager('../../../img/faces/*.png', {
		as: 'w=280&h=280&webp&meta=src'
	});

	const images = [];
	for (let i = 0; i < data.length; i++) {
		const image = { ...data[i] };
		const slug = `${image.date}-${slugify(image.title, { lower: true, strict: true })}`;
		image.src = files[`../../../img/faces/${slug}.png`].src;
		image.url = `/etcetera/faces/${slug}/`;
		image.title = `${image.title}.`;
		images[i] = image;
	}
</script>

<svelte:head>
	<title>Nick Vincent → Etcetera → Faces</title>
</svelte:head>

<Scroller width="40rem">
	<Gallery title="Faces" {images} />
</Scroller>
