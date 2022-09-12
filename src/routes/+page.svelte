<script>
	import Scroller from '$lib/Scroller.svelte';
	import Image from '../img/nick-vincent.jpg?webp&w=480&h=480&meta=src';
</script>

<svelte:head>
	<title>Nick Vincent</title>
	<meta
		name="description"
		content="Fluent in both design & code. Prefers work to speak for itself."
	/>
</svelte:head>

<Scroller>
	<img alt="Portrait of Nick Vincent" src={Image.src} width="480" height="480" />
	<h1>Nick Vincent</h1>
	<p>Fluent in both design & code</p>
	<p>Prefers work to speak for itself</p>
	<p>
		<a class="arrow-link" href="mailto:the.nick.vincent@gmail.com" target="_blank"
			>the.nick.vincent@gmail.com</a
		>
	</p>
</Scroller>

<style>
	h1 {
		margin: 0;
		text-align: center;
		font-size: 2.5rem;
	}

	p {
		margin: 0;
		text-align: center;
	}

	img {
		width: 10rem;
		height: auto;
		margin: 0 auto;
		border-radius: 50%;
		background-color: var(--image-background);
		box-shadow: var(--image-shadow);
		transition: var(--transition-dom-x-ray), var(--transition-profile-image);
	}

	@media (hover: hover) {
		img:hover {
			rotate: 15deg;
			box-shadow: var(--image-shadow-focus);
		}
	}
</style>
