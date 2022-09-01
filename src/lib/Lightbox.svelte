<script>
	import { goto } from '$app/navigation';
	import { createObserver } from 'svelte-use-io';

	export let src;
	export let title;
	export let date;
	export let caption;
	export let width;
	export let height;
	export let aspect;

	export let backUrl;
	export let nextUrl;
	export let previousUrl;
	export let instagramUrl;

	const { observer } = createObserver();

	let img;
	let loaded = false;

	function onLoad() {
		loaded = true;
	}

	function onVisible() {
		img.src = src;
	}

	function onKeyUp(e) {
		switch (e.key) {
			case 'Escape':
				if (backUrl) {
					goto(backUrl);
				}
				break;
			case 'ArrowLeft':
				if (previousUrl) {
					goto(previousUrl);
				}
				break;
			case 'ArrowRight':
				if (nextUrl) {
					goto(nextUrl);
				}
				break;
		}
	}
</script>

<svelte:window on:keyup={(e) => onKeyUp(e)} />

<div class="lightbox {aspect <= 1.25 ? 'portrait' : 'landscape'}">
	<div class="right">
		{#if title}<h1>{title}</h1>{/if}
		{#if date}<p class="date">{date}</p>{/if}
		{#if caption}<p class="caption">{caption}</p>{/if}
		<ul>
			<li>
				<a sveltekit:prefetch href={backUrl}>Back to the gallery</a>
			</li>
			<li>
				<a href={instagramUrl} rel="external" target="_blank">On Instagram</a>
			</li>
		</ul>
	</div>
	<div class="left" style:aspect-ratio={aspect}>
		<img
			bind:this={img}
			{width}
			{height}
			alt={title}
			class:loaded
			style:aspect-ratio={aspect}
			use:observer={{ once: true }}
			on:intersecting={onVisible}
			on:load|once={onLoad}
		/>
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
	}

	.left {
		order: 1;
		max-width: 100%;
		border-radius: 1rem;
		background-color: rgba(0, 0, 0, 0.1);
		box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
	}
	.right {
		order: 2;
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
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 1rem;
		opacity: 0;
		transition: var(--transition-dom-x-ray), opacity 1s ease;
	}
	img.loaded {
		opacity: 1;
	}
</style>
