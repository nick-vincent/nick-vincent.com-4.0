<script>
	import Scroller from '$lib/Scroller.svelte';
</script>

<svelte:head>
	<title>Nick Vincent → Etcetera → Rock</title>
	<meta
		name="description"
		content="My band Annum Ford, filmed at Freakin’ Frog in Las Vegas on December 14, 2006."
	/>
</svelte:head>

<Scroller width="40rem">
	<h1>Rock</h1>
	<p>My band Annum Ford, filmed at Freakin’ Frog in Las Vegas on December 14, 2006.</p>

	<iframe
		width="560"
		height="315"
		src="https://www.youtube.com/embed/videoseries?list=PLkCSJIvjbqhu3i1saWiZRxZefRkCqjoN_&modestbranding=1&color=white"
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
	/>
</Scroller>

<style>
	p {
		margin-bottom: 2rem;
	}

	iframe {
		width: 100%;
		height: auto;
		aspect-ratio: 16 / 9;
		border-radius: 1rem;
	}
</style>
