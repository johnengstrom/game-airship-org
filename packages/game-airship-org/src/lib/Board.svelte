<script>
	import Card from '$lib/Card.svelte';
	import Placeholder from '$lib/Placeholder.svelte';
	import Prize from '$lib/Prize.svelte';
	import Turn from '$lib/Turn.svelte';
	import { besthand } from '$lib/stores/besthand.store';
	import { onMount } from 'svelte';

	// Use this store in a Svelte component
	import { newGame } from '$lib/stores/newGame.store';
	import { game } from '$lib/stores/game.store';
	import { scenariostore } from './stores/scenario.store';
	import BetPlaceholder from './BetPlaceholder.svelte';
	import Mission from '$lib/Mission.svelte';
	import Hand from './Hand.svelte';
	let _besthand;

	onMount(() => {
		besthand.subscribe((data) => {
			console.log(data);
			_besthand = data;
		});

		// create the store
	});

	// Construct a complete deck of cards
	const suits = ['H', 'D', 'S', 'C'];
	const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
	const deck = suits.flatMap((suit) => values.map((value) => ({ value, suit })));

	// Shuffle the deck
	function shuffle(deck) {
		for (let i = deck.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[deck[i], deck[j]] = [deck[j], deck[i]];
		}
	}

	// Function to deal cards to a player
	function dealCards(number) {
		return deck.splice(-number, number);
	}

	// Initialize the game
	function initializeGame() {
		shuffle(deck);
		playerRed = {
			game: dealCards(1),
			crew: dealCards(5),
			gameCard: dealCards(1)[0],
			turnCard: dealCards(3),
			prize: dealCards(4),
			bet: dealCards(3),
			hand: dealCards(5)
		};

		playerBlue = {
			game: dealCards(1),
			crew: dealCards(5),
			gameCard: dealCards(1)[0],
			turnCard: dealCards(3),
			prize: dealCards(4),
			bet: dealCards(3),
			hand: dealCards(5)
		};
	}

	let playerRed = { crew: [], gameCard: {}, turnCard: {}, prize: [] };
	let playerBlue = { crew: [], gameCard: {}, turnCard: {}, prize: [] };

	initializeGame();
</script>

<div class="game pl-16 ml-16 py-4 w-full h-screen">
	<div class="flex flex-row">
		<div class="grow">
			<div class="flex flex-col items-center">
				<!-- Player Red's Side -->
				<div class="flex justify-center mb-4 px-2">
					{#each playerRed.game as card, i}
						<div>
							<Mission
								action="add"
								color="red"
								bgcolor="bg-red-800"
								cardno={i + 1}
								value={card.value}
								suit={card.suit}
							/>
						</div>
					{/each}
				</div>

				<div class="flex justify-center mb-4 px-2">
					{#each playerRed.crew as card, i}
						<div>
							<Placeholder
								cardno={i + 1}
								bgcolor="bg-red-500"
								value={card.value}
								suit={card.suit}
							/>
						</div>
					{/each}
				</div>

				<div class="flex justify-center mb-4 px-2">
					{#each playerRed.turnCard as card, i}
						<div>
							<Turn
								cardno={i + 1}
								value={playerRed.turnCard.value}
								suit={playerRed.turnCard.suit}
							/>
						</div>
					{/each}
				</div>

				<!-- prize row -->
				<div class="flex justify-center mb-4 px-2">
					{#each playerRed.prize as card, i}
						<div>
							<Prize cardno={i + 1} value={card.value} suit={card.suit} />
						</div>
					{/each}
				</div>

				<!-- bet row -->
				<div class="flex justify-center mb-4 px-2">
					{#each playerRed.bet as card, i}
						<div>
							<BetPlaceholder cardno={i + 1} value={card.value} suit={card.suit} />
						</div>
					{/each}
				</div>
				<!-- hand row -->
				<div class="flex justify-center mb-4 px-2">
					{#each playerRed.hand as card, i}
						<div>
							<Hand cardno={i + 1} value={card.value} suit={card.suit} />
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="grow">
			<div class="flex flex-col items-center">
				<!-- Player Blue's Side -->

				<div class="flex justify-center mb-4 px-2">
					{#each playerBlue.game as card, i}
						<Mission
							action="add"
							color="blue"
							bgcolor="bg-blue-800"
							cardno={i + 1}
							value={card.value}
							suit={card.suit}
						/>
					{/each}
				</div>

				<div class="flex justify-center mb-4 px-2">
					{#each playerBlue.crew as card, i}
						<div>
							<Placeholder
								cardno={i + 1}
								bgcolor="bg-blue-500"
								value={card.value}
								suit={card.suit}
							/>
						</div>
					{/each}
				</div>
				<div class="flex justify-center mb-4 px-2">
					{#each playerBlue.turnCard as card, i}
						<div>
							<Turn
								cardno={i + 1}
								value={playerBlue.turnCard.value}
								suit={playerBlue.turnCard.suit}
							/>
						</div>
					{/each}
				</div>

				<!-- prize row -->
				<div class="flex justify-center mb-4 px-2">
					{#each playerBlue.prize as card, i}
						<div>
							<Prize cardno={i + 1} value={card.value} suit={card.suit} />
						</div>
					{/each}
				</div>

				<!-- bet row -->
				<div class="flex justify-center mb-4 px-2">
					{#each playerBlue.bet as card, i}
						<div>
							<BetPlaceholder cardno={i + 1} value={card.value} suit={card.suit} />
						</div>
					{/each}
				</div>
				<!-- hand row -->
				<div class="flex justify-center mb-4 px-2">
					{#each playerBlue.hand as card, i}
						<div>
							<Hand cardno={i + 1} value={card.value} suit={card.suit} />
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-row mb-4 z-50 w-full">
		<div class="w-1/2">
			{#if _besthand?.red?.length}
				<div class="flex flex-row">
					{#each _besthand?.red as card}
						<Card
							action="remove"
							color="red"
							bgcolor="bg-red-400"
							value={card.value}
							suit={card.suit}
						/>
					{/each}
				</div>
			{/if}
		</div>
		<div class="w-1/2 justify-end flex">
			{#if _besthand?.blue?.length}
				<div class="flex flex-row">
					{#each _besthand?.blue as card}
						<Card
							action="remove"
							color="blue"
							bgcolor="bg-blue-400"
							value={card.value}
							suit={card.suit}
						/>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- The rest of your HTML here -->
