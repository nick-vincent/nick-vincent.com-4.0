export function swipeable(node, { timeout = 250, buffer = 10 } = {}) {
	let x;
	let y;
	let startX;
	let startY;
	let startTime;
	let scrolling;

	function handleDown(event) {
		scrolling = undefined;
		startTime = Date.now();
		x = startX = event.clientX || event.touches[0].clientX;
		y = startY = event.clientY || event.touches[0].clientY;

		node.dispatchEvent(new CustomEvent('swipestart', { detail: { x, y } }));

		window.addEventListener('touchmove', handleMove, { passive: false });
		window.addEventListener('mousemove', handleMove);
		window.addEventListener('touchend', handleUp);
		window.addEventListener('mouseup', handleUp);
	}

	function handleMove(event) {
		const newX = event.clientX || event.touches[0].clientX;
		const newY = event.clientY || event.touches[0].clientY;
		const dx = newX - x;
		const dy = newY - y;
		const direction = dx > 1 ? 'left' : 'right';

		x = newX;
		y = newY;

		if (scrolling === undefined) {
			scrolling = Math.abs(dy) > Math.abs(dx);
		}

		if (scrolling) {
			removeHandlers();
			scrolling = undefined;
			node.dispatchEvent(new CustomEvent('swipecancel', { detail: { x, y, dx, dy, direction } }));
		} else {
			event.preventDefault();
			node.dispatchEvent(new CustomEvent('swipemove', { detail: { x, y, dx, dy, direction } }));
		}
	}

	function handleUp(event) {
		scrolling = undefined;
		x = event.clientX || x;
		y = event.clientY || y;

		const time = Date.now() - startTime;
		const dx = startX - x;
		const dy = startY - y;
		const direction = dx > 1 ? 'left' : 'right';
		const swiped = time < timeout && Math.abs(dx) > buffer;

		removeHandlers();

		if (swiped) {
			node.dispatchEvent(new CustomEvent('swipe', { detail: { x, y, dx, dy, direction } }));
		} else {
			node.dispatchEvent(new CustomEvent('swipecancel', { detail: { x, y, dx, dy, direction } }));
		}
	}

	function removeHandlers() {
		window.removeEventListener('touchmove', handleMove);
		window.removeEventListener('mousemove', handleMove);
		window.removeEventListener('touchend', handleUp);
		window.removeEventListener('mouseup', handleUp);
	}

	function handleDrag(event) {
		event.preventDefault();
	}

	node.addEventListener('touchstart', handleDown);
	node.addEventListener('mousedown', handleDown);
	node.addEventListener('dragstart', handleDrag);

	return {
		destroy() {
			node.removeEventListener('touchstart', handleDown);
			node.removeEventListener('mousedown', handleDown);
			node.removeEventListener('dragstart', handleDrag);
		}
	};
}
