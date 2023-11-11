<script>
	import { onMount } from 'svelte';
	import Radio from '$lib/Radio.svelte';
	import { game } from '$lib/stores/game.store';
	import GameTurn from './GameTurn.svelte';
	import { loadingstore } from './stores/loading.store';
	import { newGame } from '$lib/stores/newGame.store';
	import { scenariostore, updateScenario } from './stores/scenario.store';
	let _game;
	let _scenario;
	let turn = -1;
	let showdescription = false;
	let scored = false;

	let _choices = {
		player1: { choice1: '', choice2: '', choice3: '' },
		player2: { choice1: '', choice2: '', choice3: '' }
	};

	let choices = {
		player1: { choice1: '', choice2: '', choice3: '' },
		player2: { choice1: '', choice2: '', choice3: '' }
	};

	const newgame = newGame();

	onMount(() => {
		scenariostore.subscribe((scenario) => {
			if (scenario.length) {
				console.log('CREATING NEW GAME ---->');
				_scenario = scenario;
				game.set({});
				loadingstore.set(true);

				newgame.create({
					game: scenario
				});
			}
		});

		newgame.subscribe((data) => {
			console.log('newgame --->', data?.data);
			if (data?.data) {
				game.set(data.data);
			}

			if (data?.error) {
				game.set({ error: true });
			}
		});

		game.subscribe((data) => {
			console.log('game --->', data);
			if (data?.gameTitle) {
				_game = data;
			}

			if (data?.error) {
				_game = { error: true };
			}

			if (data.reset) {
				_game = {};
			}
		});
	});

	function toggleDescription() {
		showdescription = !showdescription;
	}

	function startGame() {
		turn = ++turn;
	}

	function clickTurn(increment) {
		turn = turn + increment;
		choices = {
			player1: { choice1: '', choice2: '', choice3: '' },
			player2: { choice1: '', choice2: '', choice3: '' }
		};
	}

	function turnEnd() {}

	function choose(player, choose, choice) {
		choices[player][choose] = choice;
	}

	function makeNewGame() {
		scored = true;
		updateScenario();
		game.set({ reset: true });
		loadingstore.set(true);
	}

	function cancelGame() {
		game.set({});
		loadingstore.set(true);
	}
</script>

<div
	class="fixed right-0 top-0 card opacity-80 backdrop-blur-3xl backdrop-brightness-50 h-full w-96 text-white overflow-y-auto pt-0 z-[99]"
>
	{#if !_game?.gameDescription && !_game?.error}
		<h1 class="font-bold text-xl leading-6 mb-4">ChatGPT generating new game ...</h1>
		<p><em>Wait time under 5 minutes.</em></p>

		<div class="relative mt-8">
			<div class="lds-ripple my-8">
				<div></div>
				<div></div>
			</div>
		</div>
	{/if}

	{#if _game?.error}
		<h1 class="font-bold text-xl leading-6 my-4">Error Generating Game</h1>
		<div class="my-4 flex flex-row place-content-between">
			<button
				class="btn w-full"
				on:click={() => {
					makeNewGame();
				}}>New Game</button
			>
		</div>
	{/if}

	{#if _game?.gameDescription}
		{#if turn < 0 || showdescription}
			<h1 class="font-bold text-xl leading-6 mb-4">{_game.gameTitle}</h1>

			<div>
				<h1 class="mb-2">Current Location: <strong>{_game.setting.location}</strong></h1>
				<h1 class="mb-2">Mission Start: <strong>{_game.setting.missionStart}</strong></h1>
				<h1 class="mb-2">Mission End: <strong>{_game.setting.missionEnd}</strong></h1>
			</div>

			<div>
				<h1 class="mb-2 font-bold text-xl">Teams</h1>
				<h1 class="mb-2">Blue Team: <strong>{_game.teams.blueTeam.name}</strong></h1>
				<p class="italic">{_game.teams.blueTeam.description}</p>
				<h1 class="mt-6 mb-2">Red Team: <strong>{_game.teams.redTeam.name}</strong></h1>
				<p class="italic">
					{_game.teams.redTeam.description}
				</p>
			</div>

			<div>
				<h1 class="mt-6 mb-2 font-bold text-xl">Mission Description</h1>
				{_game.gameDescription}

				{#if turn > -1}
					<div class="my-4 flex flex-row place-content-between">
						<button
							class="btn w-full"
							on:click={() => {
								toggleDescription();
							}}>Hide Description</button
						>
					</div>
				{/if}
			</div>

			<div class="my-4">
				<button class="btn w-full" on:click={startGame}>Start Game</button>
			</div>
		{/if}

		{#if turn > -1}
			<GameTurn {turn} {_game} {choose} {choices} />

			{#if turn < 2}
				<div class="my-4 flex flex-row place-content-between">
					<button
						class="btn bg-green-900 hover:bg-green-700 w-full"
						on:click={() => {
							clickTurn(1);
						}}>Next Turn</button
					>
				</div>
			{/if}

			{#if turn > 0}
				<div class="my-4 flex flex-row place-content-between">
					<button
						class="btn w-full"
						on:click={() => {
							clickTurn(-1);
						}}>Previous Turn</button
					>
				</div>
			{/if}

			{#if turn == 2}
				<div class="my-4 flex flex-row place-content-between">
					<button
						class="btn w-full"
						on:click={() => {
							makeNewGame();
						}}>New Game</button
					>
				</div>
			{/if}

			{#if turn > -1 && !showdescription}
				<div class="my-4 flex flex-row place-content-between">
					<button
						class="btn w-full"
						on:click={() => {
							toggleDescription();
						}}>Show Description</button
					>
				</div>
			{/if}
		{/if}
	{/if}

	<Radio />
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

		/* Add padding, border, rounded corners, and background */
		padding: 1rem;
		border: 2px solid #d4d4d8;
		border-radius: 0.5rem;
		/* Tailwind CSS utilities */
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

	lds-ripple {
		top: 100px;
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}
	.lds-ripple div {
		position: absolute;
		border: 4px solid #fff;
		opacity: 1;
		border-radius: 50%;
		animation: lds-ripple 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}
	.lds-ripple div:nth-child(2) {
		animation-delay: -0.5s;
	}
	@keyframes lds-ripple {
		0% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 0;
		}
		4.9% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 0;
		}
		5% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 1;
		}
		100% {
			top: 0px;
			left: 0px;
			width: 72px;
			height: 72px;
			opacity: 0;
		}
	}
</style>
