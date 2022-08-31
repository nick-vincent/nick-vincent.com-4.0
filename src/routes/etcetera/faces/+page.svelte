<script>
	import Scroller from '$lib/Scroller.svelte';
	import Thumbnail from '$lib/Thumbnail.svelte';
	import { faces as data } from '../../../img/faces/faces.js';

	const thumbs = import.meta.globEager('../../../img/faces/*.png', {
		as: 'w=280&h=280&webp&meta=src'
	});

	let faces = [...data];

	for (const face of faces) {
		const thumb = thumbs[`../../../img/faces/${face.slug}.png`];
		face.thumb = thumb.src;
	}
</script>

<svelte:head>
	<title>Nick Vincent → Etcetera → Faces</title>
</svelte:head>

<Scroller width="40rem">
	<h1>Faces</h1>
	<ul>
		{#each faces as { name, slug, thumb }}
			<li>
				<Thumbnail src={thumb} alt={`${name}.`} url={`/etcetera/faces/${slug}`} />
			</li>
		{/each}
	</ul>
</Scroller>

<style>
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
		gap: 1rem;
		margin: 0;
		padding: 0;
	}

	li {
		margin: 0;
		width: 100%;
		height: auto;
		aspect-ratio: 1;
	}
</style>
