<script>
	import { page } from '$app/stores';
	import dayjs from 'dayjs';
	import slugify from 'slugify';
	import Scroller from '$lib/Scroller.svelte';
	import Lightbox from '$lib/Lightbox.svelte';
	import { data } from '../../../../img/faces/_manifest.js';

	const files = import.meta.globEager('../../../../img/faces/*.png', {
		as: 'w=1920&h=1200&webp&quality=100&fit=inside&meta=src;aspect;width;height'
	});

	const images = [];
	for (let i = 0; i < data.length; i++) {
		const image = { ...data[i] };
		image.slug = `${image.date}-${slugify(image.title, { lower: true, strict: true })}`;
		image.path = `../../../../img/faces/${image.slug}.png`;
		image.url = `/etcetera/faces/${image.slug}/`;
		image.title = `${image.title}.`;
		image.date = dayjs(image.date).format('MMMM D, YYYY');
		image.caption = `“${image.caption}”`;
		images[i] = image;
	}

	const image = images.find((i) => i.slug === $page.params.slug);
	const index = images.indexOf(image);
	const prevImage = images[index - 1] || images[images.length - 1];
	const nextImage = images[index + 1] || images[0];

	const metadata = files[image.path];
	const { id, title, date, caption } = image;
	const { src, aspect, width, height } = metadata;
</script>

<svelte:head>
	<title>Nick Vincent → Etcetera → Faces → {title}</title>
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
		backUrl="/etcetera/faces/"
		nextUrl={nextImage.url}
		previousUrl={prevImage.url}
		instagramUrl={`https://instagram.com/p/${id}`}
	/>
</Scroller>
