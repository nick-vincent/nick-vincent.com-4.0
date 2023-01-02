<script>
	import Thumbnail from '$lib/Thumbnail.svelte';
	import ThumbnailLoader from '$lib/ThumbnailLoader.svelte';

	export let images = [];
</script>

<ul>
	{#each images as image}
		<li>
			<ThumbnailLoader>
				<Thumbnail {image} />
			</ThumbnailLoader>
		</li>
	{/each}
</ul>

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
