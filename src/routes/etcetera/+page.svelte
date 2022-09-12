<script>
	import Scroller from '$lib/Scroller.svelte';
</script>

<svelte:head>
	<title>Nick Vincent → Etcetera</title>
</svelte:head>

<Scroller>
	<h1>Etcetera</h1>

	<p>I’m also known to:</p>
	<ul class="bullet">
		<li>
			<a class="arrow-link" href="/etcetera/faces/">make faces</a>
		</li>
		<li>
			<a class="arrow-link" href="/etcetera/photos/">snap photos</a>
		</li>
		<li>
			<a class="arrow-link" href="/etcetera/strum/">strum tunes</a>
		</li>
		<li>
			<a class="arrow-link" href="/etcetera/rock/">rock out</a>
		</li>
	</ul>

	<hr />

	<p>
		I made
		<a
			class="arrow-link"
			href="https://chrome.google.com/webstore/detail/dom-x-ray/olfkgegmjhgehnakignkabhbdchkhnkj"
			rel="external"
			target="_blank">DOM X-Ray</a
		><br />
		a dev tool to see<br />
		through the DOM<br />
		<button
			class="arrow-link"
			on:click={() => document.documentElement.classList.toggle('dom-x-ray')}>Demo it here!</button
		>
	</p>

	<hr />

	<p>
		This site was built with <a
			href="https://kit.svelte.dev"
			class="arrow-link"
			rel="external"
			target="_blank">SvelteKit</a
		>
	</p>
</Scroller>
