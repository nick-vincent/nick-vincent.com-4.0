<script>
	import Scroller from '$lib/Scroller.svelte';
	import Gallery from '$lib/Gallery.svelte';
	import { getImageData } from '../data';

	const images = getImageData(
		'faces',
		'png',
		(t) => `${t}.`,
		(c) => `“${c}”`
	);
</script>

<svelte:head>
	<title>Nick Vincent → Etcetera → Faces</title>
	<meta name="description" content="Portraits of various famous folks." />
</svelte:head>

<Scroller width="40rem">
	<h1>Faces</h1>
	<p>Portraits of various famous folks.</p>
	<Gallery {images} />
</Scroller>

<style>
	p {
		margin-bottom: 2rem;
	}
</style>
