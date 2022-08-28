<svelte:head>
	<title>Nick Vincent: Fluent in both design & code</title>
</svelte:head>

<a class="image-link" href="/nick-vincent.jpg" target="_blank"
	><img alt="Portrait of Nick Vincent" src="/nick-vincent.jpg" width="960" height="960" /></a
>
<h1>Nick Vincent</h1>
<p>Fluent in both design & code</p>
<p>Prefers work to speak for itself</p>
<p><a href="mailto:the.nick.vincent@gmail.com" target="_blank">the.nick.vincent@gmail.com</a></p>

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

	.image-link {
		z-index: 2;
		width: 10rem;
		margin: 0 auto;
		border-radius: 50%;
	}

	img {
		border-radius: 50%;
	}

	.image-link:focus img {
		transform: rotate(15deg);
	}

	@media (hover: hover) {
		.image-link:hover img {
			transform: rotate(15deg);
		}
	}
</style>
