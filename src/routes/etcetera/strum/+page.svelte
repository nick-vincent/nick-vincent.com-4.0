<script>
	import Scroller from '$lib/Scroller.svelte';
</script>

<svelte:head>
	<title>Nick Vincent → Etcetera → Strum</title>
	<meta
		name="description"
		content="Annum Ford, filmed at Freakin’ Frog in Las Vegas on December 14, 2006."
	/>
</svelte:head>

<Scroller width="40rem">
	<h1>Strum</h1>
	<p>Just me and my guitar. Lots of cover songs and a few originals.</p>
	<iframe
		width="560"
		height="315"
		src="https://www.youtube.com/embed/videoseries?list=PLmMZSDatGk4ckjfFE82f7O-s97zjN-NL8&modestbranding=1&color=white"
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
