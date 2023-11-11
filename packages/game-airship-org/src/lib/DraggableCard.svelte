<script>
	export let card;
	let x = 0;
	let y = 0;
	let dragging = false;

	function onMouseDown(event) {
		dragging = true;
		event.stopPropagation();
	}

	function onMouseMove(event) {
		if (dragging) {
			x += event.movementX;
			y += event.movementY;
		}
	}

	function onMouseUp() {
		dragging = false;
	}
</script>

<div
	class="draggable-card {dragging ? 'dragging' : ''}"
	style="left: {x}px; top: {y}px;"
	on:mousedown={onMouseDown}
	on:mousemove={onMouseMove}
	on:mouseup={onMouseUp}
	on:mouseleave={onMouseUp}
>
	<!-- Card content here, e.g., displaying the value and suit of the card -->
	<Card value={card.value} suit={card.suit} />
</div>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
	.draggable-card {
		position: absolute;
		cursor: grab;
		user-select: none;
	}

	.dragging {
		cursor: grabbing;
	}
</style>
