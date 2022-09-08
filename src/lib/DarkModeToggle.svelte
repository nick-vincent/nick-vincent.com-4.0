<script>
	import { onMount } from 'svelte';

	let theme;

	$: switchTheme = theme === 'dark' ? 'light' : 'dark';
	$: theme && applyTheme();
	$: cta = `Switch to ${switchTheme} mode`;

	onMount(() => {
		const mql = matchMedia('(prefers-color-scheme: dark)');
		mql.addEventListener('change', onChange);
		setTheme(mql.matches);
		return () => mql.removeEventListener('change', onChange);
	});

	function setTheme(matches) {
		const prefers = matches ? 'dark' : 'light';
		const stored = localStorage.getItem('theme');
		theme = stored || prefers || 'light';
	}

	function applyTheme() {
		if (typeof window === 'undefined') return;
		document.documentElement.classList.add(theme);
		document.documentElement.classList.remove(switchTheme);
	}

	function onClick() {
		theme = switchTheme;
		localStorage.setItem('theme', theme);
	}

	function onChange(e) {
		setTheme(e.matches);
	}
</script>

<button on:click={onClick}>
	<span class="visually-hidden">
		{cta}
	</span>
	<span class="circle {theme}" aria-hidden="true">
		<span class="top" />
		<span class="bottom" />
	</span>
</button>

<style>
	button {
		z-index: 4;
		cursor: pointer;
		pointer-events: auto;
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

	:global(html.light) .circle {
		transform: rotate(-90deg);
	}

	:global(html.dark) .circle {
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

	:global(html.no-js) button {
		display: none;
	}

	@media print {
		button {
			display: none;
		}
	}
</style>
