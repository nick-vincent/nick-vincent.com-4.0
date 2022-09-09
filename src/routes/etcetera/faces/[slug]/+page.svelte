<script>
	import { page } from '$app/stores';
	import Scroller from '$lib/Scroller.svelte';
	import Lightbox from '$lib/Lightbox.svelte';
	import { getImageData } from '../../data';

	const images = getImageData(
		'faces',
		'png',
		(t) => `${t}.`,
		(c) => `“${c}”`
	);

	const image = images.find((i) => i.slug === $page.params.slug);
	const index = images.indexOf(image);
	const prevImage = images[index - 1] || images[images.length - 1];
	const nextImage = images[index + 1] || images[0];
	const { title, caption } = image;
</script>

<svelte:head>
	<title>Nick Vincent → Etcetera → Faces → {title}</title>
	<meta name="description" content={caption} />
</svelte:head>

<Scroller width="40rem">
	<Lightbox {image} {prevImage} {nextImage} backUrl="/etcetera/faces/" />
</Scroller>
