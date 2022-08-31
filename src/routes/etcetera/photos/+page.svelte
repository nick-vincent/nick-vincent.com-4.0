<script>
	import Scroller from '$lib/Scroller.svelte';
	import Gallery from '$lib/Gallery.svelte';
	import { data } from '../../../img/photos/_manifest.js';

	const files = import.meta.globEager('../../../img/photos/*.jpg', {
		as: 'w=280&h=280&webp&meta=src'
	});

	const photos = [...data];

	for (const photo of photos) {
		photo.src = files[`../../../img/photos/${photo.slug}.jpg`].src;
	}
</script>

<svelte:head>
	<title>Nick Vincent → Etcetera → Photos</title>
</svelte:head>

<Scroller width="40rem">
	<Gallery title="Photos" images={photos} dir={'/etcetera/photos/'} />
</Scroller>
