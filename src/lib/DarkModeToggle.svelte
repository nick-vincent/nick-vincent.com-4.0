<script>
	import { afterUpdate } from 'svelte';
	import DarkMode from 'svelte-dark-mode';

	let theme = 'light';

	$: switchTheme = theme === 'dark' ? 'light' : 'dark';

	afterUpdate(() => {
		document.documentElement.classList.add(theme);
		document.documentElement.classList.remove(switchTheme);
	});
</script>

<DarkMode bind:theme />

<button on:click={() => (theme = switchTheme)}>
	<span class="text">
		Switch to {switchTheme} mode
	</span>
	<span class="circle {theme}">
		<span class="top" />
		<span class="bottom" />
	</span>
</button>

<style>
	button {
		z-index: 4;
		cursor: pointer;
		appearance: none;
		position: fixed;
		right: 0;
		top: 0;
		width: 80px;
		height: 80px;
		border: none;
		border-radius: 0;
		background: none;
		opacity: 0.65;
		transition: var(--transition-dom-x-ray), opacity 200ms var(--easing-standard);
	}

	button::after {
		display: none;
	}

	button:active {
		background: none;
	}

	button:focus {
		opacity: 1;
	}

	@media (hover: hover) {
		button:hover {
			opacity: 1;
		}
	}

	.text {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}

	.circle {
		display: block;
		position: absolute;
		overflow: hidden;
		width: 20px;
		height: 20px;
		left: 30px;
		top: 30px;
		border: 2px solid var(--color-ui);
		border-radius: 50%;
	}

	.circle.light {
		transform: rotate(-90deg);
	}

	.circle.dark {
		transform: rotate(90deg);
	}

	.top,
	.bottom {
		display: block;
		position: absolute;
		width: 16px;
		height: 8px;
		left: 0;
	}

	.top {
		top: 0;
		background-color: var(--color-ui);
	}

	.bottom {
		bottom: 0;
		background-color: var(--color-ui-invert);
	}

	@media print {
		button {
			display: none;
		}
	}
</style>
