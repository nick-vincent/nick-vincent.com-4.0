<script>
	import Scroller from '$lib/Scroller.svelte';
</script>

<svelte:head>
	<title>Nick Vincent → Etcetera</title>
</svelte:head>

<Scroller>
	<h1>Etcetera</h1>
	<p>
		I made
		<a
			href="https://chrome.google.com/webstore/detail/dom-x-ray/olfkgegmjhgehnakignkabhbdchkhnkj"
			rel="external"
			target="_blank">DOM X-Ray</a
		><br />
		a dev tool to see<br />
		through the DOM<br />
		<button on:click={() => document.documentElement.classList.toggle('dom-x-ray')}
			>Demo it here!</button
		>
	</p>

	<p>I’m also known to:</p>
	<ul class="bullet">
		<li>
			<a sveltekit:prefetch href="/etcetera/faces/">make faces</a>
		</li>
		<li>
			<a sveltekit:prefetch href="/etcetera/photos/">snap photos</a>
		</li>
		<li>
			<a href="https://youtube.com/sixftdwarf" rel="external" target="_blank">strum tunes</a>
		</li>
		<li>
			<a href="https://annumford.com" rel="external" target="_blank">pen odes</a>
		</li>
	</ul>

	<p>This website features:</p>
	<ul class="bullet">
		<li><a href="https://kit.svelte.dev" rel="external" target="_blank">sveltekit</a></li>
		<li>
			<a
				href="https://css-tricks.com/snippets/css/system-font-stack/"
				rel="external"
				target="_blank">system fonts</a
			>
		</li>
		<li>
			<a href="https://css-tricks.com/dark-modes-with-css/" rel="external" target="_blank"
				>dark mode</a
			>
		</li>
	</ul>
</Scroller>
