<script>
	import Scroller from '$lib/Scroller.svelte';
	import Gallery from '$lib/Gallery.svelte';
	import { photos as data } from '../../../img/photos/_manifest.js';

	const thumbs = import.meta.globEager('../../../img/photos/*.jpg', {
		as: 'w=280&h=280&webp&meta=src'
	});

	let photos = [...data];

	for (const photo of photos) {
		const thumb = thumbs[`../../../img/photos/${photo.slug}.jpg`];
		photo.thumb = thumb.src;

		const date = new Date(photo.date);
		console.log(date);
	}
</script>

<svelte:head>
	<title>Nick Vincent → Etcetera → Photos</title>
</svelte:head>

<Scroller width="40rem">
	<Gallery title="Photos" images={photos} dir={'/etcetera/photos/'} />
</Scroller>
