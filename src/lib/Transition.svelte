<script>
	import { sineIn, sineOut } from 'svelte/easing';

	export let pathname = '';

	function fadeIn(node, { duration, delay, easing }) {
		return {
			delay,
			duration,
			css: (t) => {
				const eased = easing(t);
				return `
					opacity: ${eased};
					transform: scale(${0.9 + 0.1 * eased});
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
					transform: scale(${0.9 + 0.1 * eased});
					filter: blur(${1 - eased}rem);
				`;
			}
		};
	}
</script>

{#key pathname}
	<div
		class="transition"
		in:fadeIn={{ duration: 500, delay: 500, easing: sineOut }}
		out:fadeOut={{ duration: 500, easing: sineIn }}
	>
		<slot />
	</div>
{/key}

<style>
	.transition {
		height: 100%;
	}
</style>
