<script>
	import { page } from '$app/stores';
	import slugify from 'slugify';
	import Scroller from '$lib/Scroller.svelte';
	import Lightbox from '$lib/Lightbox.svelte';
	import { data } from '../../../../img/photos/_manifest.js';

	const files = import.meta.globEager('../../../../img/photos/*.jpg', {
		as: 'w=1920&h=1200&webp&quality=100&fit=inside&meta=src;aspect;width;height'
	});

	const images = [...data];
	for (const image of images) {
		image.slug = `${image.date}-${slugify(image.title, { lower: true, strict: true })}`;
		image.src = files[`../../../../img/photos/${image.slug}.jpg`].src;
	}

	const photo = images.find((f) => f.slug === $page.params.slug);
	const index = images.indexOf(photo);
	const prevFace = images[index - 1] || images[images.length - 1];
	const nextFace = images[index + 1] || images[0];

	const { id, title, slug, date, caption } = photo;

	const imagePath = `../../../../img/photos/${slug}.jpg`;
	const image = import.meta.globEager('../../../../img/photos/*.jpg', {
		as: 'w=1920&h=1200&webp&quality=100&fit=inside&meta=src;aspect;width;height'
	})[imagePath];

	const { src, aspect, width, height } = image;
</script>

<svelte:head>
	<title>Nick Vincent → Etcetera → Photos → {title}.</title>
	<meta name="description" content={`“${caption}”`} />
</svelte:head>

<Scroller width="40rem">
	<Lightbox
		{src}
		{date}
		{title}
		{width}
		{height}
		{aspect}
		{caption}
		backUrl="/etcetera/photos/"
		nextUrl={`/etcetera/photos/${nextFace.slug}`}
		previousUrl={`/etcetera/photos/${prevFace.slug}`}
		instagramUrl={`https://instagram.com/p/${id}`}
	/>
</Scroller>
