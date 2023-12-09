<script>
	import { onMount, tick } from 'svelte';
	import { besthand } from './stores/besthand.store';
	import C2 from './cards/C2.svelte';

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

	const crewCardsBasePath = '/games/game-1/cards/crew';

	let _besthand;
	let imagePath; // Reactive variable for the image path

	onMount(() => {
		imagePath = getRandomImagePath(); // Initialize the image path

		besthand.subscribe((data) => {
			_besthand = data;
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

	async function flipCard(cardno) {
		anime({
			targets: '.card-container' + cardno,
			rotateY: flipped ? 180 : 0,
			easing: 'easeInOutQuad',
			duration: 800
		});
		await tick();
		flipped = !flipped;
	}

	function handleKeydown(event) {
		if (event.key === 'Enter' || event.key === ' ') {
			flipCard();
		}
	}

	// Function to generate a random image path
	// Function to generate a random image path
	const getRandomImagePath = () => {
		// Define the base path

		// Define the structure of the folders and how many images each contains
		const folderStructure = {
			'crew-1': 11,
			'crew-2': 13,
			'crew-3': 2,
			'crew-4': 13,
			'crew-5': 23,
			'crew-6': 3,
			'crew-7': 5
		};

		// Create an array to hold all image paths
		let imagePaths = [];

		// Populate the imagePaths array with all possible paths
		for (const [folderName, imageCount] of Object.entries(folderStructure)) {
			for (let i = 1; i <= imageCount; i++) {
				imagePaths.push(`${folderName}-${i}`);
			}
		}

		// Select a random image path
		const randomIndex = Math.floor(Math.random() * imagePaths.length);
		return imagePaths[randomIndex];
	};

	function extractCrewBase(crewString) {
		if (!crewString?.length) return 'x';

		// Split the string by hyphen
		let parts = crewString.split('-');

		// Join the first two parts and return
		return `${parts[0]}-${parts[1]}`;
	}

	function makeImagePath(imagePath) {
		return `${crewCardsBasePath}/${extractCrewBase(imagePath)}/${imagePath}.jpg`;
	}
</script>

<div
	class="card-container {flipped ? 'flipped' : ''}"
	ondblclick={() => {
		flipCard(cardno);
	}}
	onkeydown={handleKeydown}
	tabindex="0"
	role="button"
>
	{#if flipped}
		<!-- Add Bubble -->
		<div class="absolute -top-2 -right-2">
			<div
				onkeydown={handleKeydown}
				tabindex="0"
				role="button"
				class="flex items-center justify-center w-4 h-4 rounded {color === 'red'
					? ' bg-red-500'
					: ' bg-blue-500'} text-white cursor-pointer"
				onclick={() => updateBesthand(value, suit, cardno, action)}
				style="margin-top: -2px; margin-right: -2px;"
			>
				<!-- The plus icon. If you're using a graphic, replace the content with an <img> or <svg> -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 4v16m8-8H4"
					/>
				</svg>
			</div>
		</div>
	{/if}

	{#if !flipped}
		<div
			class="relative cardfront card opacity-80 backdrop-blur-2xl backdrop-brightness-50 overflow-clip"
		>
			<div
				class="w-full h-full bg-cover"
				style="background-image: url({makeImagePath(imagePath)});"
			></div>

			<div class="fixed bottom-[1px] flex flex-row opacity-90">
				<div class="square2" style="background-color: var(--{color1});" />
				<div class="square2" style="background-color: var(--{color2});" />
			</div>
		</div>
	{/if}

	{#if flipped}
		<div
			class="card h-full rounded-xl"
			style="background: url({makeImagePath(imagePath)}); background-size: cover;"
		>
			<C2 width="100%" />
		</div>
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
		width: 80px;
		height: 120px;
		/* Add padding, border, rounded corners, and background */

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

	.cardfront {
		background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
		background-size: cover;
		/* Other styling as needed, similar to .card */
	}
</style>
