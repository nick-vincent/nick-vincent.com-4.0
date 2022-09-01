export function pannable(node) {
	let x;
	let y;
	let startX;
	let startY;
	let startTime;

	function handleDown(event) {
		startTime = Date.now();
		x = startX = event.clientX || event.touches[0].clientX;
		y = startY = event.clientY || event.touches[0].clientY;

		node.dispatchEvent(
			new CustomEvent('panstart', {
				detail: { x, y, originalEvent: event }
			})
		);

		window.addEventListener('touchmove', handleMove, { passive: false });
		window.addEventListener('mousemove', handleMove);
		window.addEventListener('touchend', handleUp);
		window.addEventListener('mouseup', handleUp);
	}

	function handleMove(event) {
		const dx = (event.clientX || event.touches[0].clientX) - x;
		const dy = (event.clientY || event.touches[0].clientY) - y;

		x = event.clientX || event.touches[0].clientX;
		y = event.clientY || event.touches[0].clientY;

		node.dispatchEvent(
			new CustomEvent('panmove', {
				detail: { x, y, dx, dy, originalEvent: event }
			})
		);
	}

	function handleUp(event) {
		const time = Date.now() - startTime;

		x = event.clientX || x;
		y = event.clientY || y;

		const dx = startX - x;
		const dy = startY - y;

		node.dispatchEvent(
			new CustomEvent('panend', {
				detail: { x, y, dx, dy, time, originalEvent: event }
			})
		);

		window.removeEventListener('touchmove', handleMove);
		window.removeEventListener('mousemove', handleMove);
		window.removeEventListener('touchend', handleUp);
		window.removeEventListener('mouseup', handleUp);
	}

	node.addEventListener('touchstart', handleDown);
	node.addEventListener('mousedown', handleDown);

	return {
		destroy() {
			node.removeEventListener('touchstart', handleDown);
			node.removeEventListener('mousedown', handleDown);
		}
	};
}
