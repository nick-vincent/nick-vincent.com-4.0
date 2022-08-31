<script>
	import Scroller from '$lib/Scroller.svelte';
	import Gallery from '$lib/Gallery.svelte';
	import { faces as data } from '../../../data/faces.js';

	const thumbs = import.meta.globEager('../../../img/faces/*.png', {
		as: 'w=280&h=280&webp&meta=src'
	});

	let faces = [...data];

	for (const face of faces) {
		const thumb = thumbs[`../../../img/faces/${face.slug}.png`];
		face.thumb = thumb.src;
	}
</script>

<svelte:head>
	<title>Nick Vincent → Etcetera → Faces</title>
</svelte:head>

<Scroller width="40rem">
	<Gallery title="Faces" images={faces} dir={'/etcetera/faces/'} />
</Scroller>
