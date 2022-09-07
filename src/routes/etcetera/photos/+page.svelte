<script>
	import Scroller from '$lib/Scroller.svelte';
	import Gallery from '$lib/Gallery.svelte';
	import { getImageData } from '../data';

	const images = getImageData('photos');
</script>

<svelte:head>
	<title>Nick Vincent → Etcetera → Photos</title>
	<meta name="description" content="Photography from various locales around the world." />
</svelte:head>

<Scroller width="40rem">
	<h1>Photos</h1>
	<p>Photography from various locales around the world.</p>
	<Gallery {images} />
</Scroller>

<style>
	p {
		margin-bottom: 2rem;
	}
</style>
