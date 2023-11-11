<script>
	import Card from '$lib/Card.svelte';
	import Bet from './Bet.svelte';
	import Draggable from './Draggable.svelte';
	import Draggable2 from './Draggable2.svelte';

	// Reactive variable to keep track of the z-index of the last card dragged
	let zIndexCounter = 0;
	let betcardstotal = 57;

	// Function to increment zIndexCounter
	function incrementZIndex() {
		zIndexCounter++;
	}

	// Construct a complete deck of cards
	function createDeck() {
		const suits = ['H', 'D', 'S', 'C'];
		const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
		return suits.flatMap((suit) => values.map((value) => ({ value, suit })));
	}

	// Shuffle the deck
	function shuffle() {
		let deck = createDeck();
		let m = deck.length,
			t,
			i;
		// While there remain elements to shuffle…
		while (m) {
			// Pick a remaining element…
			i = Math.floor(Math.random() * m--);
			// And swap it with the current element.
			t = deck[m];
			deck[m] = deck[i];
			deck[i] = t;
		}

		console.log(deck);
		return deck;
	}

	// Initialize the game
	function initializeGame() {
		// Create and shuffle decks for each player
		let playerRedDeck = shuffle();
		let playerBlueDeck = shuffle();
		let playerRedPrizeDeck = shuffle();
		let playerBluePrizeDeck = shuffle();

		// Assign the shuffled decks to each player
		playerRed.crew = playerRedDeck;
		playerBlue.crew = playerBlueDeck;
		playerRed.bet = playerRedPrizeDeck;
		playerBlue.bet = playerBluePrizeDeck;
	}

	let playerRed = { crew: [], gameCard: {}, turnCard: {}, prize: [], bet: [] };
	let playerBlue = { crew: [], gameCard: {}, turnCard: {}, prize: [], bet: [] };

	initializeGame();
</script>

<div class="game">
	<div class="flex flex-row">
		<div class="grow">
			<div class="flex flex-col items-center">
				<!-- Player Red's Side -->
				<div class="flex justify-center">
					{#each playerRed.crew as card, i}
						<Draggable>
							<Card
								action="add"
								cardno={i + 1}
								color="red"
								bgcolor="bg-red-700"
								value={card.value}
								suit={card.suit}
							/>
						</Draggable>
					{/each}

					{#each playerRed.bet as card, i}
						<Draggable top={160}>
							<Bet
								cardno={i + 1}
								color="red"
								bgcolor="bg-red-900"
								value={card.value}
								suit={card.suit}
							/>
						</Draggable>
					{/each}

					{#each playerBlue.crew as card, i}
						<Draggable2 right={-160}>
							<Card
								action="add"
								cardno={i + 1}
								color="blue"
								bgcolor="bg-blue-700"
								value={card.value}
								suit={card.suit}
							/>
						</Draggable2>
					{/each}

					{#each playerBlue.bet as card, i}
						<Draggable2 right={-160} top={160}>
							<Bet
								cardno={i + 1}
								betno={i +
									1 +
									(Math.floor() * Math.random() * betcardstotal - playerBlue.bet.length)}
								color="blue"
								bgcolor="bg-blue-900"
								value={card.value}
								suit={card.suit}
							/>
						</Draggable2>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
