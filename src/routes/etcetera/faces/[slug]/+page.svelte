<script>
	import { page } from '$app/stores';
	import Scroller from '$lib/Scroller.svelte';
	import Lightbox from '$lib/Lightbox.svelte';
	import { faces } from '../../../../img/faces/_manifest.js';

	const face = faces.find((f) => f.slug === $page.params.slug);
	const index = faces.indexOf(face);
	const prevFace = faces[index - 1] || faces[faces.length - 1];
	const nextFace = faces[index + 1] || faces[0];

	const { id, name, slug, date, caption } = face;

	const imagePath = `../../../../img/faces/${slug}.png`;
	const image = import.meta.globEager('../../../../img/faces/*.png', {
		as: 'w=1920&h=1200&webp&quality=100&fit=inside&meta=src;aspect;width;height'
	})[imagePath];

	const { src, aspect, width, height } = image;
</script>

<svelte:head>
	<title>Nick Vincent → Etcetera → Faces → {name}.</title>
	<meta name="description" content={`“${caption}”`} />
</svelte:head>

<Scroller width="40rem">
	<Lightbox
		{src}
		{date}
		{width}
		{height}
		{aspect}
		title={`${name}.`}
		caption={`“${caption}”`}
		backUrl="/etcetera/faces/"
		nextUrl={`/etcetera/faces/${nextFace.slug}`}
		previousUrl={`/etcetera/faces/${prevFace.slug}`}
		instagramUrl={`https://instagram.com/p/${id}`}
	/>
</Scroller>
