<script>
	export let cardno;
	export let value;
	export let suit;

	let suits = {
		H: '♥️', // Hearts
		D: '♦️', // Diamonds
		S: '♠️', // Spades
		C: '♣️' // Clubs
	};

	let colors = ['cyan', 'magenta', 'yellow', 'green', 'orange'];

	// Determine the color of the suit based on the card symbol
	let isRedSuit = suit === 'H' || suit === 'D';

	// Function to get random color
	const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

	// Assign two random colors for the squares
	let color1 = getRandomColor();
	let color2 = getRandomColor();

	// Ensure that both colors are not the same
	while (color1 === color2) {
		color2 = getRandomColor();
	}
</script>

<div
	class="w-24 h-32 card opacity-80 {isRedSuit
		? 'text-red-500'
		: 'text-black'} backdrop-blur-2xl backdrop-brightness-50 bg-purple-800 opacity-70"
>
	<div class="text-xs font-bold mt-2 mb-4 leading-4 text-white text-center">BONUS {cardno}</div>
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
		border: 1px solid white;
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
