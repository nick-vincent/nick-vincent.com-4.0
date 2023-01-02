<script>
	import { createObserver } from 'svelte-use-io';

	const { observer } = createObserver();

	let visible = false;
	let rotation = (Math.random() - 0.5) * 45 + 'deg';

	function onVisible() {
		visible = true;
	}
</script>

<div
	class="loader"
	class:visible
	style:--rotation={rotation}
	use:observer={{ once: true }}
	on:intersecting={onVisible}
>
	<slot />
</div>

<style>
	.loader {
		opacity: 0;
		scale: 0;
		rotate: var(--rotation);
		transition: var(--transition-dom-x-ray), opacity 500ms ease, scale 500ms ease, 500ms ease;
	}

	.visible,
	:global(html.no-js) .loader {
		opacity: 1;
		scale: 1;
		rotate: none;
	}
</style>
