<script>
	import { onMount } from 'svelte';
	import { besthand } from '$lib/stores/besthand.store';
	import { betcards } from '$lib/stores/betcards.store';

	export let cardno;
	export let action;
	export let color;
	export let value;
	export let suit;
	export let bgcolor;

	let _betcards;
	let betcard;

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

	// Updated base path
	const crewCardsBasePath = '/games/game-1/cards/bonus';

	let _besthand;
	let imagePath; // Reactive variable for the image path

	onMount(() => {
		imagePath = getRandomImagePath(); // Initialize the image path

		besthand.subscribe((data) => {
			_besthand = data;
		});

		betcards.subscribe((data) => {
			if (data.length) {
				_betcards = data;
				betcard = _betcards[Math.floor(Math.random() * data.length)];
			}
		});
	});

	function updateBesthand(value, suit, cardno, action) {
		const newcard = {
			value,
			suit,
			cardno
		};

		const index = _besthand[color].findIndex(
			(card) => card.value === value && card.suit === suit && card.cardno === cardno
		);

		console.log(action, index);

		if (action === 'add' && index === -1) {
			if (_besthand[color]?.length === 5) {
				_besthand[color].pop();
			}

			_besthand[color].push(newcard);
			besthand.set(_besthand);
		}

		if (action === 'remove') {
			if (index > -1) {
				_besthand[color].splice(index, 1); // Remove the card at the found index
			}
			besthand.set(_besthand);
		}
	}

	let flipped = false;

	function flipCard() {
		flipped = !flipped;
	}

	function handleKeydown(event) {
		if (event.key === 'Enter' || event.key === ' ') {
			flipCard();
		}
	}

	// Function to generate a random image path
	// Function to generate a random image path
	// Simplified getRandomImagePath function
	const getRandomImagePath = () => {
		// Define the total number of bonus images
		const totalImages = 20; // Assuming there are 20 images

		// Generate a random image index
		const randomIndex = Math.floor(Math.random() * totalImages) + 1; // +1 because image names start from 1

		// Return the image path
		return `bonus-${randomIndex}`;
	};

	function extractCrewBase(crewString) {
		if (!crewString?.length) return 'x';

		// Split the string by hyphen
		let parts = crewString.split('-');

		// Join the first two parts and return
		return `${parts[0]}-${parts[1]}`;
	}

	function makeImagePath(imagePath) {
		return `${crewCardsBasePath}/${imagePath}.png`;
	}
</script>

{#snippet li(item)}
<div
			class="cardfront relative card opacity-80 backdrop-blur-2xl backdrop-brightness-50 h-full p-1 select-none overflow-hidden"
		>
			<div
				class="min-w-full h-full bg-cover p-1"
				style="background-image: url({makeImagePath(imagePath)});"
			></div>

			<div class="fixed bottom-[1px] flex flex-row opacity-90 z-20">
				<div class="square2" style="background-color: var(--{color1});" />
				<div class="square2" style="background-color: var(--{color2});" />
			</div>
		</div>
{/snippet}

<div
	class="card-container {flipped ? 'flipped' : ''}"
	ondblclick={flipCard}
	onkeydown={handleKeydown}
	tabindex="0"
	role="button"
>
	{#if !flipped}
		{@render li()}
	{/if}

	{#if flipped}
		{#if betcard}
			<div
				class="card opacity-80 {isRedSuit ? 'text-red-500' : 'text-black'} "
				style="background: url({makeImagePath(imagePath)});"
			>
				<div class="w-20 text-white mb-2 backdrop-blur backdrop-brightness-25 rounded-lg m-1">
					<small>
						<ol class="p-0 m-0">
							<li class="capitalize text-xs leading-3 text-center font-bold px-[2px] py-1">
								<small class="shadow-xl">
									{betcard.effect}
								</small>
							</li>
						</ol>
					</small>
				</div>
				<div class="flex flex-row">
					<div class="square" style="background-color: var(--{color1});" />
					<div class="square" style="background-color: var(--{color2});" />
				</div>
			</div>
		{/if}
	{/if}
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
		min-width: 80px;
		height: 112px;
		/* Add padding, border, rounded corners, and background */

		border-radius: 0.5rem;
		/* Tailwind CSS utilities */
		@apply m-1 flex flex-col items-center justify-center shadow-md;
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
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

	.square2 {
		border: 1px solid white;
		width: 8px;
		height: 8px;
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
