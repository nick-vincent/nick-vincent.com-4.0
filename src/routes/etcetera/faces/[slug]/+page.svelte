<script>
	import { page } from '$app/stores';
	import slugify from 'slugify';
	import Scroller from '$lib/Scroller.svelte';
	import Lightbox from '$lib/Lightbox.svelte';
	import { data } from '../../../../img/faces/_manifest.js';

	const files = import.meta.globEager('../../../../img/faces/*.png', {
		as: 'w=1920&h=1200&webp&quality=100&fit=inside&meta=src;aspect;width;height'
	});

	const images = [...data];
	for (const image of images) {
		image.slug = `${image.date}-${slugify(image.title, { lower: true, strict: true })}`;
		image.src = files[`../../../../img/faces/${image.slug}.png`].src;
		image.url = `/etcetera/faces/${image.slug}/`;
	}

	const face = images.find((f) => f.slug === $page.params.slug);
	const index = images.indexOf(face);
	const prevFace = images[index - 1] || images[images.length - 1];
	const nextFace = images[index + 1] || images[0];

	const { id, title, slug, date, caption } = face;

	const imagePath = `../../../../img/faces/${slug}.png`;
	const image = import.meta.globEager('../../../../img/faces/*.png', {
		as: 'w=1920&h=1200&webp&quality=100&fit=inside&meta=src;aspect;width;height'
	})[imagePath];

	const { src, aspect, width, height } = image;
</script>

<svelte:head>
	<title>Nick Vincent → Etcetera → Faces → {title}.</title>
	<meta name="description" content={`“${caption}”`} />
</svelte:head>

<Scroller width="40rem">
	<Lightbox
		{src}
		{date}
		{width}
		{height}
		{aspect}
		title={`${title}.`}
		caption={`“${caption}”`}
		backUrl="/etcetera/faces/"
		nextUrl={`/etcetera/faces/${nextFace.slug}`}
		previousUrl={`/etcetera/faces/${prevFace.slug}`}
		instagramUrl={`https://instagram.com/p/${id}`}
	/>
</Scroller>
