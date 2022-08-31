<script>
	import { page } from '$app/stores';
	import Scroller from '$lib/Scroller.svelte';
	import Lightbox from '$lib/Lightbox.svelte';
	import { data } from '../../../../img/photos/_manifest.js';

	const photo = data.find((f) => f.slug === $page.params.slug);
	const index = data.indexOf(photo);
	const prevFace = data[index - 1] || data[data.length - 1];
	const nextFace = data[index + 1] || data[0];

	const { id, name, slug, date, caption } = photo;

	const imagePath = `../../../../img/photos/${slug}.jpg`;
	const image = import.meta.globEager('../../../../img/photos/*.jpg', {
		as: 'w=1920&h=1200&webp&quality=100&fit=inside&meta=src;aspect;width;height'
	})[imagePath];

	const { src, aspect, width, height } = image;
</script>

<svelte:head>
	<title>Nick Vincent → Etcetera → Photos → {name}.</title>
	<meta name="description" content={`“${caption}”`} />
</svelte:head>

<Scroller width="40rem">
	<Lightbox
		{src}
		{date}
		{width}
		{height}
		{aspect}
		{caption}
		title={name}
		backUrl="/etcetera/photos/"
		nextUrl={`/etcetera/photos/${nextFace.slug}`}
		previousUrl={`/etcetera/photos/${prevFace.slug}`}
		instagramUrl={`https://instagram.com/p/${id}`}
	/>
</Scroller>
