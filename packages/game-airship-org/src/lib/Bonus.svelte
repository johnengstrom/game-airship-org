<script>
	import { onMount } from 'svelte';
	import { besthand } from './stores/besthand.store';

	export let cardno;
	export let action;
	export let color;
	export let value;
	export let suit;
	export let bgcolor;

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

	let _besthand;

	onMount(() => {
		besthand.subscribe((data) => {
			_besthand = data;
		});
	});

	function updateBesthand(value, suit) {
		const newcard = {
			value,
			suit
		};

		if (action !== 'remove') {
			if (_besthand[color]?.length === 5) {
				_besthand[color].pop();
			}

			_besthand[color].push(newcard);
			besthand.set(_besthand);
		} else {
			const index = _besthand[color].findIndex(
				(card) => card.value === value && card.suit === suit
			);
			if (index > -1) {
				_besthand[color].splice(index, 1); // Remove the card at the found index
			}
			besthand.set(_besthand);
		}
	}
</script>

<div
	class="relative w-20 h-30 card opacity-80 {isRedSuit
		? 'text-red-500'
		: 'text-black'} backdrop-blur-2xl backdrop-brightness-50"
>
	<!-- Card Content -->

	<div class="text-sm font-bold mb-2 text-white">Bonus</div>

	<div class="value bg-white rounded-lg p-2">
		{value}{suits[suit]}
	</div>

	<div class="flex flex-row">
		<div class="square" style="background-color: var(--{color1});" />
		<div class="square" style="background-color: var(--{color2});" />
	</div>

	<!-- Add Bubble -->
	<div class="absolute -top-2 -right-2">
		<div
			class="flex items-center justify-center w-6 h-6 rounded-full{color === 'red'
				? ' bg-red-500'
				: ' bg-blue-500'} text-white cursor-pointer"
			on:click={() => updateBesthand(value, suit)}
			style="margin-top: -6px; margin-right: -6px;"
		>
			<!-- The plus icon. If you're using a graphic, replace the content with an <img> or <svg> -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
			</svg>
		</div>
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
		padding: 0.5rem;
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
