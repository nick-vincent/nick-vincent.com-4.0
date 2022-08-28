<script>
	import { sineInOut } from 'svelte/easing';

	export let pathname = '';

	function fadeIn(node, { duration, delay, easing }) {
		return {
			delay,
			duration,
			css: (t) => {
				const eased = easing(t);
				return `
					opacity: ${eased};
					filter: blur(${1 - eased}rem);
				`;
			}
		};
	}

	function fadeOut(node, { duration, easing }) {
		return {
			duration,
			css: (t) => {
				const eased = easing(t);
				return `
					opacity: ${eased};					
					filter: blur(${1 - eased}rem);
				`;
			}
		};
	}
</script>

{#key pathname}
	<div
		class="transition"
		in:fadeIn={{ duration: 500, delay: 500, easing: sineInOut }}
		out:fadeOut={{ duration: 500, easing: sineInOut }}
	>
		<slot />
	</div>
{/key}

<style>
	.transition {
		height: 100%;
	}
</style>
