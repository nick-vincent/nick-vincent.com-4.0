<script>
	import Thumbnail from '$lib/Thumbnail.svelte';

	export let title;
	export let images = [];
</script>

<h1>{title}</h1>
<ul>
	{#each images as { title, url, src }}
		<li>
			<Thumbnail {src} alt={title} {url} />
		</li>
	{/each}
</ul>

<style>
	h1 {
		margin-bottom: 1rem;
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
		width: 100%;
		height: auto;
		aspect-ratio: 1;
	}
</style>
