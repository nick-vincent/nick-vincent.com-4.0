<script>
	export let open = false;
</script>

<button class:open on:click={() => (open = !open)}>
	<span class="visually-hidden">
		{#if open}
			Close menu
		{:else}
			Open menu
		{/if}
	</span>
	<span class="top" />
	<span class="bottom" />
	<span class="clockwise" />
	<span class="counterwise" />
</button>

<style>
	button {
		z-index: 4;
		cursor: pointer;
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
	.open .top,
	.open .bottom {
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
	.open .clockwise,
	.open .counterwise {
		opacity: 1;
		transition: var(--transition-dom-x-ray),
			transform var(--duration-menu) var(--easing-decelerate) var(--duration-menu),
			opacity 0ms var(--duration-menu);
	}
	.open .clockwise {
		transform: rotate(45deg);
	}
	.open .counterwise {
		transform: rotate(-45deg);
	}

	@media print {
		button {
			display: none;
		}
	}
</style>
