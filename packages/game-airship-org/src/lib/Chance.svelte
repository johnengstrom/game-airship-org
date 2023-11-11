<script>
	export let bgcolor = 'bg-red-900';
	let colors = ['cyan', 'magenta', 'yellow', 'green', 'orange'];

	// Function to get random color
	const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

	// Assign two random colors for the squares
	let color1 = getRandomColor();
	let color2 = getRandomColor();
	let color3 = getRandomColor();
	let color4 = getRandomColor();

	// Ensure that both colors are not the same
	while (color1 === color2) {
		color2 = getRandomColor();
	}
</script>

<div class="card backdrop-blur-2xl backdrop-brightness-125 {bgcolor} opacity-90">
	<div class="flex flex-row">
		<div class="square" style="background-color: var(--{color1});" />
		<div class="square" style="background-color: var(--{color2});" />
	</div>

</div>

<style>
	:root {
		--cyan: #00ffff;
		--magenta: #ff00ff;
		--yellow: #ffff00;
		--green: #008000;
		--orange: #ffa500;
	}

	.card {
		/* Apply aspect ratio for the card */
		aspect-ratio: 3 / 4;
		/* Add padding, border, rounded corners, and background */
		padding: 1rem;
		border: 2px solid #d4d4d8;
		border-radius: 0.5rem;
		/* Tailwind CSS utilities */
		@apply m-1 flex flex-col items-center justify-center shadow-md;
	}

	.value {
		/* Styling for the value and suit */
		@apply text-xl mb-2;
	}

	.square {
		/* Styling for the colored squares */
		width: 18px;
		height: 18px;
		@apply m-[2px];
	}

	/* Tailwind CSS classes for colors */
	.text-red-500 {
		color: #ef4444;
	}
	.text-black {
		color: #000;
	}
</style>
