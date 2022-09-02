<script>
	export let width = '15rem';
</script>

<div class="scroller">
	<div class="inner" style={`max-width: ${width};`}>
		<slot />
	</div>
</div>

<style>
	.scroller {
		--gradientMask: linear-gradient(
			to bottom,
			transparent 3rem,
			black 6rem,
			black calc(100% - 4rem),
			transparent 100%
		);
		overflow-y: scroll;
		position: fixed;
		inset: 0;
		padding: 6rem 1rem;
		will-change: scroll-position;
		mask-image: var(--gradientMask);
		-webkit-mask-image: var(--gradientMask);
	}

	.inner {
		display: flex;
		flex-direction: column;
		place-content: center;
		min-height: 100%;
		margin: 0 auto;
	}

	@media print {
		.scroller {
			position: static;
			padding: 0;
			mask-image: none;
			-webkit-mask-image: none;
		}

		.inner {
			max-width: none;
		}
	}
</style>
