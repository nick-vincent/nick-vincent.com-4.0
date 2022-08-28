<script>
	import { cubicInOut } from 'svelte/easing';
	import { fade, crossfade } from 'svelte/transition';
	import Scroller from '$lib/Scroller.svelte';
	import { faces as data } from '../../../img/faces/faces.js';

	const images = import.meta.globEager('../../../img/faces/*.png', {
		as: 'w=960&h=1200&webp&metadata'
	});
	const thumbs = import.meta.globEager('../../../img/faces/*.png', {
		as: 'w=200&h=250&webp&metadata'
	});

	let activeImage;
	let lightboxActive = false;
	let faces = [...data];

	for (const face of faces) {
		const image = images[`../../../img/faces/${face.slug}.png`];
		const thumb = thumbs[`../../../img/faces/${face.slug}.png`];
		face.src = image.src;
		face.thumb = thumb.src;
	}

	const [send, receive] = crossfade({
		duration: 500,
		easing: cubicInOut
	});

	function showFace(id) {
		const face = faces.find((f) => f.id === id);
		face.active = true;
		faces = [...faces];
		lightboxActive = true;
	}

	function hideFace() {
		const face = faces.find((f) => f.active);
		face.active = false;
		faces = [...faces];
		lightboxActive = false;
	}

	function advance(step) {
		const active = faces.find((face) => face.active);
		const activeIndex = faces.indexOf(active);
		const nextIndex = Math.min(Math.max(activeIndex + step, 0), faces.length - 1);
		const next = faces[nextIndex];
		active.active = false;
		next.active = true;
		activeImage = next;
		faces = [...faces];
	}

	function onKeyUp(e) {
		if (!lightboxActive) {
			return;
		}
		switch (e.key) {
			case 'Escape':
				hideFace();
				break;
			case 'ArrowLeft':
				advance(-1);
				break;
			case 'ArrowRight':
				advance(1);
				break;
		}
	}
</script>

<Scroller width="40rem">
	<div class="gallery" class:visible={!lightboxActive}>
		<h1>Faces</h1>
		<ul>
			{#each faces as { id, name, src, thumb, active } (id)}
				<li>
					<a href={src} target="_blank" on:click|preventDefault={() => showFace(id)}>
						{#if !active}
							<img
								src={thumb}
								alt={`${name}.`}
								loading="lazy"
								width="240"
								height="300"
								in:receive={{ key: id }}
								out:send={{ key: id }}
							/>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<div class="lightbox" class:visible={lightboxActive}>
		{#each faces.filter((f) => f.active) as { id, name, src, date, caption } (id)}
			<div class="right" in:fade={{ duration: 250, delay: 500 }} out:fade={{ duration: 250 }}>
				<h2>{name}.</h2>
				<p class="date">{date}</p>
				{#if caption}
					<p class="caption">“{caption}”</p>
				{/if}
				<p>
					<a href="https://instagram.com/p/${id}" rel="external" target="_blank"
						>View on Instagram</a
					>
				</p>
			</div>
			<div class="left">
				<img
					{src}
					alt={`${name}.`}
					loading="lazy"
					width="480"
					height="600"
					in:receive={{ key: id }}
					out:send={{ key: id }}
					on:click|preventDefault={() => hideFace()}
				/>
			</div>
		{/each}
	</div>
</Scroller>

<svelte:window on:keyup={(e) => onKeyUp(e)} />

<style>
	.gallery {
		opacity: 0;
		visibility: hidden;
		transition: var(--transition-dom-x-ray), visibility 250ms ease-in-out, opacity 250ms ease-in-out;
	}
	.gallery.visible {
		opacity: 1;
		visibility: visible;
		transition: var(--transition-dom-x-ray), visibility 250ms ease-in-out 250ms,
			opacity 250ms ease-in-out 250ms;
	}

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

	.gallery a {
		display: block;
	}
	.gallery a::after {
		display: none;
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		object-fit: cover;
		aspect-ratio: 4 / 5;
		border-radius: 0.5rem;
	}

	.lightbox {
		pointer-events: none;
		z-index: 2;
		position: fixed;
		display: grid;
		grid-auto-flow: column;
		justify-content: center;
		gap: 1rem;
		inset: 0;
		margin: 0 auto;
		padding: 6rem 1rem 2rem;
		overflow-y: auto;
	}
	.lightbox.visible {
		pointer-events: auto;
	}

	.left {
		order: 1;
		grid-column-start: 1;
		grid-row-start: 1;
	}
	.right {
		order: 2;
		max-width: 15rem;
		grid-column-start: 2;
		grid-row-start: 1;
	}

	.lightbox img {
		width: calc(100vw - 2rem);
		max-width: 20rem;
		border-radius: 1rem;
	}

	@media (max-width: 800px) {
		.lightbox {
			display: flex;
			flex-wrap: wrap;
		}
	}
</style>
