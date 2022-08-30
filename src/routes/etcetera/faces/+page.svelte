<script>
	import Scroller from '$lib/Scroller.svelte';
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
		{#each faces as { id, name, slug, thumb, active } (id)}
			<li>
				<a sveltekit:prefetch href={`/etcetera/faces/${slug}`}>
					{#if !active}
						<img src={thumb} alt={`${name}.`} loading="lazy" width="280" height="280" />
					{/if}
				</a>
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
		padding: 0;
	}

	a {
		display: block;
		transition: var(--transition-dom-x-ray), scale 150ms ease;
	}
	a:hover,
	a:focus {
		scale: 1.1;
	}
	a::after {
		display: none;
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		object-fit: cover;
		aspect-ratio: 1;
		border-radius: 0.5rem;
	}
</style>
