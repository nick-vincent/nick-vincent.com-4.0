<script>
	import { page } from '$app/stores';
	import Scroller from '$lib/Scroller.svelte';
	import Lightbox from '$lib/Lightbox.svelte';
	import { getImageData } from '../../data';

	const images = getImageData('photos');
	const image = images.find((i) => i.slug === $page.params.slug);
	const index = images.indexOf(image);
	const prevImage = images[index - 1] || images[images.length - 1];
	const nextImage = images[index + 1] || images[0];
	const { id, title, date, caption, src, aspect, width, height } = image;
</script>

<svelte:head>
	<title>Nick Vincent → Etcetera → Photos → {title}</title>
	<meta name="description" content={caption} />
</svelte:head>

<Scroller width="40rem">
	<Lightbox
		{src}
		{date}
		{title}
		{caption}
		{width}
		{height}
		{aspect}
		backUrl="/etcetera/photos/"
		nextUrl={nextImage.url}
		previousUrl={prevImage.url}
		instagramUrl={`https://instagram.com/p/${id}`}
	/>
</Scroller>
