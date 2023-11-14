<script>
	import { onMount } from 'svelte';
	import { besthand } from './stores/besthand.store';

	export let action;
	export let cardno;
	export let color;
	export let value;
	export let suit;
	export let bgcolor;

	const missionCardsBasePath = '/games/game-1/cards/mission';

	let flipped = false;

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

	let color3 = getRandomColor();
	let color4 = getRandomColor();

	let color5 = getRandomColor();
	let color6 = getRandomColor();

	let color7 = getRandomColor();
	let color8 = getRandomColor();

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

	function flipCard() {
		flipped = !flipped;
	}

	function handleKeydown(event) {
		if (event.key === 'Enter' || event.key === ' ') {
			flipCard();
		}
	}

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

	function makeImagePath() {
		return `${missionCardsBasePath}/mission-1.png`;
	}
</script>

<div
	on:dblclick={() => {
		flipCard(cardno);
	}}
	on:keydown={handleKeydown}
	tabindex="0"
	role="button"
	class="relative cardfront card {isRedSuit
		? 'text-red-500'
		: 'text-black'} backdrop-blur-2xl backdrop-brightness-50 {bgcolor} opacity-80"
>
	{#if flipped}
		<!-- Add Bubble -->
		<div class="absolute -top-2 -right-2">
			<div
				on:keydown={handleKeydown}
				tabindex="0"
				role="button"
				class="flex items-center justify-center w-4 h-4 rounded {color === 'red'
					? ' bg-red-500'
					: ' bg-blue-500'} text-white cursor-pointer"
				on:click={() => updateBesthand(value, suit, cardno, action)}
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
			class="relative cardfront card opacity-80 backdrop-blur-2xl backdrop-brightness-50 overflow-clip w-48 h-32"
		>
			<div
				class="w-full h-full bg-cover"
				style="background-image: url(/games/game-1/cards/mission/mission-{Math.ceil(
					Math.random() * 4
				)}.png); background-size: cover; background-position: center; opacity: 50%;"
			></div>

			<div class="fixed bottom-[15%]">
				<div class="font-bold text-white text-2xl p-2 mb-0 text-center">MISSION</div>

				<div>
					<div class="flex flex-row mt-0">
						<div class="font-bold text-xs text-white w-20 p-1">CREW:</div>
						<div class="square" style="background-color: var(--{color1});" />
						<div class="square" style="background-color: var(--{color2});" />
					</div>
					<div class="flex flex-row">
						<div class="font-bold text-xs text-white w-20 p-1">TURN:</div>
						<div class="square" style="background-color: var(--{color3});" />
						<div class="square" style="background-color: var(--{color4});" />
					</div>
				</div>
			</div>
		</div>
	{/if}

	{#if flipped}
		<div
			class="relative cardfront card opacity-80 backdrop-blur-2xl backdrop-brightness-50 overflow-clip w-48 h-48"
		>
			<div
				class="w-full h-full bg-cover"
				style="background-image: url(/games/game-1/cards/mission/mission-{Math.ceil(
					Math.random() * 4
				)}.png); background-size: cover; background-position: center; opacity: 50%;"
			></div>

			<div class="fixed bottom-[15%]">
				<div class="value bg-white rounded-lg px-2 pt-2 pb-4 w-12 mx-auto">
					{value}{suits[suit]}
				</div>

				<div>
					<div class="flex flex-row mt-2">
						<div class="font-bold text-xs text-white w-20 p-1">CREW:</div>
						<div class="square" style="background-color: var(--{color1});" />
						<div class="square" style="background-color: var(--{color2});" />
					</div>
					<div class="flex flex-row">
						<div class="font-bold text-xs text-white w-20 p-1">TURN:</div>
						<div class="square" style="background-color: var(--{color3});" />
						<div class="square" style="background-color: var(--{color4});" />
					</div>
				</div>
			</div>
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
		/* Add padding, border, rounded corners, and background */
		border: 2px solid #d4d4d8;
		border-radius: 0.5rem;
		/* Tailwind CSS utilities */
		@apply m-1 flex flex-col items-center justify-center shadow-md;
	}

	.square2 {
		border: 1px solid white;
		width: 12px;
		height: 12px;
		@apply m-[2px];
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
