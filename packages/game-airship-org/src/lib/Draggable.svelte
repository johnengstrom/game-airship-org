<script>
	export let left = 20;
	export let top = 20;

	let moving = false;
	let zIndex = 1; // Initial z-index

	function onMouseDown() {
		moving = true;
		zIndex = 99; // Set z-index to 99 on mousedown
	}

	function onMouseMove(e) {
		if (moving) {
			left += e.movementX;
			top += e.movementY;
		}
	}

	function onMouseUp() {
		moving = false;
		zIndex = 98; // Reset z-index to 98 on mouseup
	}

	$: console.log(moving);
</script>

<section
	role="button"
	tabindex="0"
	on:mousedown={onMouseDown}
	style="left: {left}px; top: {top}px; z-index: {zIndex};"
	class="draggable bg-red-300 rounded-lg"
>
	<slot />
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
	.draggable {
		user-select: none;
		cursor: move;
		border: solid 1px gray;
		position: absolute;
	}
</style>
