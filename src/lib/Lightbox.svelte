<script>
	import { goto } from '$app/navigation';
	import { spring } from 'svelte/motion';
	import { onMount } from 'svelte';
	import { createObserver } from 'svelte-use-io';
	import { pannable } from '$lib/pannable';
	import InstagramLink from '$lib/InstagramLink.svelte';

	export let image;
	export let prevImage;
	export let nextImage;
	export let backUrl;

	const { id, title, date, caption, imageData } = image;
	const webp = imageData.default[0].src;
	const png = imageData.default[1].src;

	const { aspect, width, height } = imageData.default[0];

	const { observer } = createObserver();

	let img;
	let source;
	let loaded = false;
	let grabbing = false;
	let scrolling = undefined;

	onMount(() => {
		img.removeAttribute('src');
		source.removeAttribute('srcset');
	});

	function onLoad() {
		loaded = true;
	}

	function onVisible() {
		img.src = png;
		source.srcset = webp;
	}

	function onKeyUp(e) {
		switch (e.key) {
			case 'Escape':
				if (backUrl) {
					goto(backUrl);
				}
				break;
			case 'ArrowLeft':
				if (prevImage) {
					goto(prevImage.url);
				}
				break;
			case 'ArrowRight':
				if (nextImage) {
					goto(nextImage.url);
				}
				break;
		}
	}

	const coords = spring(
		{ x: 0 },
		{
			stiffness: 0.25,
			damping: 1
		}
	);

	function onPanStart(e) {
		grabbing = true;
		scrolling = undefined;
	}
	function onPanMove(e) {
		const { dx, dy, originalEvent } = e.detail;

		if (scrolling === undefined) {
			scrolling = Math.abs(dy) > Math.abs(dx);
		}

		if (scrolling) {
			return;
		} else {
			originalEvent.preventDefault();
		}

		coords.update(($coords) => ({
			x: $coords.x + dx
		}));
	}
	function onPanEnd(e) {
		if (scrolling) {
			scrolling = undefined;
			return;
		}

		const { dx, time } = e.detail;
		const swiped = time < 250 || Math.abs(dx) > img.clientWidth / 2;

		grabbing = false;
		scrolling = undefined;

		if (swiped && dx < -10 && prevImage) {
			goto(prevImage.url);
		} else if (swiped && dx > 10 && nextImage) {
			goto(nextImage.url);
		} else {
			coords.set({ x: 0 });
		}
	}
</script>

<svelte:window on:keyup={(e) => onKeyUp(e)} />

<div
	class="lightbox {aspect < 1.6 ? 'portrait' : 'landscape'}"
	style="transform: translateX({$coords.x}px);"
>
	<div class="right">
		{#if title}<h1>{title}</h1>{/if}
		{#if date}<p class="date">{date}</p>{/if}
		{#if caption}<p class="caption">{caption}</p>{/if}
		{#if id || prevImage || nextImage || backUrl}
			<ul class="inline">
				{#if id}
					<li><InstagramLink url={`https://instagram.com/p/${id}`} /></li>
				{/if}
				{#if prevImage}
					<li>
						<a href={prevImage.url}>Prev</a>
					</li>
				{/if}
				{#if nextImage}
					<li>
						<a href={nextImage.url}>Next</a>
					</li>
				{/if}
				{#if backUrl}
					<li>
						<a class="arrow-link" href={backUrl}>See all</a>
					</li>
				{/if}
			</ul>
		{/if}
	</div>
	<div class="left" style:aspect-ratio={aspect}>
		<picture>
			<source bind:this={source} type="image/webp" srcset={webp} />
			<img
				bind:this={img}
				src={png}
				{width}
				{height}
				alt={title}
				class:loaded
				class:grabbing
				style:aspect-ratio={aspect}
				on:load|once={onLoad}
				use:observer={{ once: true }}
				on:intersecting={onVisible}
				use:pannable
				on:panstart={onPanStart}
				on:panmove={onPanMove}
				on:panend={onPanEnd}
				on:dragstart|preventDefault
			/>
		</picture>
	</div>
</div>

<style>
	h1 {
		font-size: 1.5rem;
		letter-spacing: -0.025rem;
	}

	.lightbox {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		will-change: transform;
		transition: var(--transition-dom-x-ray), transform 0s;
	}

	.left {
		order: 1;
		max-width: 100%;
		border-radius: 1rem;
		background-color: rgba(0, 0, 0, 0.1);
		box-shadow: var(--image-shadow);
	}
	.right {
		order: 2;
		width: 100%;
		max-width: 15rem;
	}
	.landscape .left {
		width: 40rem;
	}
	.portrait .left {
		width: 24rem;
	}

	ul {
		font-size: 0.75rem;
		line-height: 1rem;
		margin: 1.5rem 0 0;
	}

	img {
		cursor: grab;
		display: block;
		width: 100%;
		height: auto;
		border-radius: 1rem;
		opacity: 0;
		will-change: opacity;
		transition: var(--transition-dom-x-ray), opacity 1s ease;
	}
	img.loaded,
	:global(html.no-js) img {
		opacity: 1;
	}
	img.grabbing {
		cursor: grabbing;
	}
</style>
