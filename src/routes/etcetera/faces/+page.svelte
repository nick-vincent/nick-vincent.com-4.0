<script>
	import Scroller from '$lib/Scroller.svelte';
	import Gallery from '$lib/Gallery.svelte';
	import { data } from '../../../img/faces/_manifest.js';

	const files = import.meta.globEager('../../../img/faces/*.png', {
		as: 'w=280&h=280&webp&meta=src'
	});

	const images = [...data];

	for (const image of images) {
		image.src = files[`../../../img/faces/${image.slug}.png`].src;
	}
</script>

<svelte:head>
	<title>Nick Vincent → Etcetera → Faces</title>
</svelte:head>

<Scroller width="40rem">
	<Gallery title="Faces" {images} dir={'/etcetera/faces/'} />
</Scroller>
