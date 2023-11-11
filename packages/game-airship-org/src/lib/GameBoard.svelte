<script>
	import { writable } from 'svelte/store';

	const gridCells = 4; // Adjust the number of cells as needed

	const createGridCell = (index) => ({
		id: `cell-${index}`,
		class: `grid-cell ${index % 2 === 0 ? 'bg-color-1' : 'bg-color-2'}`
	});

	const gameBoard = writable(
		Array.from({ length: gridCells }, (_, index) => createGridCell(index))
	);
</script>

<div class="fixed top-0 left-0 z-20">
	<div class="game-board">
		{#each $gameBoard as cell (cell.id)}
			<div class={cell.class} id={cell.id}>Cell</div>
		{/each}
	</div>

	<div class="game-board">
		{#each $gameBoard as cell (cell.id)}
			<div class={cell.class} id={cell.id}>Cell</div>
		{/each}
	</div>

	<div class="game-board">
		{#each $gameBoard as cell (cell.id)}
			<div class={cell.class} id={cell.id}>Cell</div>
		{/each}
	</div>

	<div class="game-board">
		{#each $gameBoard as cell (cell.id)}
			<div class={cell.class} id={cell.id}>Cell</div>
		{/each}
	</div>
</div>

<style>
	:global(body) {
		background-color: #000;
	}

	:global(.bg-color-1) {
		background-color: #fff; /* light color */
	}

	:global(.bg-color-2) {
		background-color: #444; /* dark color */
	}

	:global(.grid-cell) {
		width: 128px; /* Tailwind's w-32 equivalent */
		height: 192px; /* Tailwind's h-48 equivalent */
	}

	:global(.game-board) {
		padding: 48px;
		display: grid;
		/* Set the number of columns and width accordingly */
		grid-template-columns: repeat(4, 128px); /* Adjust '4' based on your grid size */
		gap: 0.5rem;
		justify-content: start;
		align-items: start;
		/* Set a fixed width based on cell size and number of columns */
		width: calc(4 * 128px + 3 * 0.5rem); /* 4 cells, 3 gaps */
		margin-left: auto;
		margin-right: auto;
	}

	@media (max-width: 600px) {
		:global(.grid-cell) {
			width: 64px; /* Smaller size for mobile */
			height: 96px;
		}
		:global(.game-board) {
			grid-template-columns: repeat(4, 64px); /* Adjust for smaller screens */
			width: calc(4 * 64px + 3 * 0.5rem); /* Adjust width for smaller cells */
		}
	}

	/* Additional media queries for other breakpoints can be added here */
</style>
