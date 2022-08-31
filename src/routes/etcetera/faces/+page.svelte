<script>
	import Scroller from '$lib/Scroller.svelte';
	import Gallery from '$lib/Gallery.svelte';
	import { data } from '../../../img/faces/_manifest.js';

	const files = import.meta.globEager('../../../img/faces/*.png', {
		as: 'w=280&h=280&webp&meta=src'
	});

	const faces = [...data];

	for (const face of faces) {
		face.src = files[`../../../img/faces/${face.slug}.png`].src;
	}
</script>

<svelte:head>
	<title>Nick Vincent → Etcetera → Faces</title>
</svelte:head>

<Scroller width="40rem">
	<Gallery title="Faces" images={faces} dir={'/etcetera/faces/'} />
</Scroller>
