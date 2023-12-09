<script>
	export let right = 300;
	export let top = 20;

	let moving = false;
	let zIndex = 1; // Initial z-index

	function onMouseDown() {
		moving = true;
		zIndex = 99; // Set z-index to 99 on mousedown
	}

	function onMouseMove(e) {
		if (moving) {
			right -= e.movementX;
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
	on:mousedown={onMouseDown}
	style="right: {right}px; top: {top}px; z-index: {zIndex};"
	class="draggable2 bg-blue-300 rounded-lg"
>
	<slot />
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
	.draggable2 {
		user-select: none;
		cursor: move;
		border: solid 1px gray;
		position: absolute;
	}
</style>
