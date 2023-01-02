<script>
	export let open = false;
</script>

<a
	href="#navigation"
	role="button"
	aria-haspopup="true"
	aria-controls="navigation"
	aria-expanded={open ? 'true' : 'false'}
	on:click|preventDefault={() => (open = !open)}
>
	<span class="visually-hidden">
		{#if open}
			Close menu
		{:else}
			Open menu
		{/if}
	</span>
	<span class="hamburger" aria-hidden="true">
		<span class="top" />
		<span class="bottom" />
		<span class="clockwise" />
		<span class="counterwise" />
	</span>
</a>

<style>
	a {
		z-index: 4;
		cursor: pointer;
		pointer-events: auto;
		appearance: none;
		position: fixed;
		left: 0;
		top: 0;
		width: 80px;
		height: 80px;
		border: none;
		border-radius: 0;
		background: none;
		opacity: 0.65;
		transition: var(--transition-dom-x-ray), opacity 200ms var(--easing-standard);
	}

	a:active {
		background: none;
	}

	a::before {
		inset: 0.5em;
	}

	a:focus {
		opacity: 1;
	}

	@media (hover: hover) {
		a:hover {
			opacity: 1;
		}
	}

	.top,
	.bottom,
	.clockwise,
	.counterwise {
		position: absolute;
		display: block;
		height: 2px;
		width: 30%;
		left: 35%;
		top: calc(50% - 1px);
		background-color: var(--color-ui);
		border-radius: 999em;
	}

	.top {
		transform: translateY(-7px);
	}
	.bottom {
		transform: translateY(7px);
	}
	.top,
	.bottom {
		transition: var(--transition-dom-x-ray),
			transform var(--duration-menu) var(--easing-decelerate) var(--duration-menu),
			opacity 0ms var(--duration-menu);
	}
	[aria-expanded='true'] .top,
	[aria-expanded='true'] .bottom {
		opacity: 0;
		transform: translateY(0);
		transition: var(--transition-dom-x-ray), transform var(--duration-menu) var(--easing-accelerate),
			opacity 0ms var(--duration-menu);
	}

	.clockwise,
	.counterwise {
		transition: var(--transition-dom-x-ray), transform var(--duration-menu) var(--easing-accelerate),
			opacity 0ms var(--duration-menu);
	}
	.clockwise {
		opacity: 0;
	}
	[aria-expanded='true'] .clockwise,
	[aria-expanded='true'] .counterwise {
		opacity: 1;
		transition: var(--transition-dom-x-ray),
			transform var(--duration-menu) var(--easing-decelerate) var(--duration-menu),
			opacity 0ms var(--duration-menu);
	}
	[aria-expanded='true'] .clockwise {
		transform: rotate(45deg);
	}
	[aria-expanded='true'] .counterwise {
		transform: rotate(-45deg);
	}

	:global(html.no-js):has(#navigation:target) a {
		opacity: 0;
		visibility: hidden;
	}

	@media print {
		a {
			display: none;
		}
	}
</style>
