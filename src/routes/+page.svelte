<script>
	import Scroller from '$lib/Scroller.svelte';
</script>

<svelte:head>
	<title>Nick Vincent</title>
	<meta
		name="description"
		content="Fluent in both design & code. Prefers work to speak for itself."
	/>
</svelte:head>

<Scroller>
	<img alt="Portrait of Nick Vincent" src="/nick-vincent.jpg" width="960" height="960" />
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
		font-size: 2.8rem;
	}

	p {
		text-align: center;
		margin: 0;
		font-size: 1.1rem;
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
