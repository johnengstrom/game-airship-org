<script>
	import { onMount } from 'svelte';
	import Radio from '$lib/Radio.svelte';
	import { game } from '$lib/stores/game.store';
	import GameTurn from './GameTurn.svelte';
	import { loadingstore } from './stores/loading.store';

	import { scenariostore, updateScenario } from '$lib/stores/scenario.store';
	import { fade } from 'svelte/transition';

	import { toggleMenu } from '$lib/runes/togglemenu.svelte.js';
	import { createCounter } from '$lib/runes/counter.svelte.js';

	const toggle = toggleMenu();

	import { newGame } from '$lib/runes/newGame.svelte.js';
	const newgame = newGame();
	const counter = createCounter();

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

	$effect(() => {
		console.log('$effect count ---->', counter.count);

		if (newgame.game?.game) {
			_game = newgame.game.game;
			console.log('$effect _game ---->', _game, newgame.game.loading);
		}
	});

	onMount(async () => {
		scenariostore.subscribe(async (scenario) => {
			if (scenario.length) {
				console.log('CREATING NEW MISSION ---->');
				_scenario = scenario;
				game.set({});
				loadingstore.set(true);

				try {
					const response = await fetch('http://192.168.1.13:3001/game/new', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							game: scenario
						})
					});

					if (response.ok) {
						const data = await response.json();
						console.log('data ~~~~~>>>', data);

						newgame.update({ ...data });
					} else {
					}
				} catch (error) {
					newgame.update(error);
					console.log(error);
				}
			}
		});

		game.subscribe((data) => {
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

{#if !toggle.showMission}
	<div
		transition:fade
		class="fixed right-0 top-0 m-4 opacity-80 backdrop-blur-3xl backdrop-brightness-50 text-white overflow-y-auto pt-0 z-[99] rounded"
	>
		<div>
			<button onclick={() => toggle.toggleMission()} class="btn text-xs">Show</button>
		</div>
	</div>
{/if}

<div
	transition:fade
	class="fixed right-0 top-0 card opacity-80 backdrop-blur-3xl backdrop-brightness-50 h-full w-96 text-white overflow-y-auto pt-0 z-[99] rounded"
>
	<!-- <div class="flex flex-row justify-between mb-4">
		<div></div>
		<div>
			{newgame.state} <button onclick={toggle.toggleMission} class="btn text-xs">Hide</button>
		</div>
	</div> -->

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
				onclick={() => {
					makeNewGame();
				}}>New Game</button
			>
		</div>
	{/if}

	{#if _game?.gameDescription}
		{#if turn < 0 || showdescription}
			<h1 class="font-bold text-xl leading-6 mb-4">
				{_game.gameTitle} / {newgame.game.game?.gameTitle}
			</h1>

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
							onclick={() => {
								toggleDescription();
							}}>Hide Description</button
						>
					</div>
				{/if}
			</div>

			<div class="my-4">
				<button class="btn w-full" onclick={startGame}>Start Game</button>
			</div>
		{/if}

		{#if turn > -1}
			<GameTurn {turn} {_game} {choose} {choices} />

			{#if turn < 2}
				<div class="my-4 flex flex-row place-content-between">
					<button
						class="btn bg-green-900 hover:bg-green-700 w-full"
						onclick={() => {
							clickTurn(1);
						}}>Next Turn</button
					>
				</div>
			{/if}

			{#if turn > 0}
				<div class="my-4 flex flex-row place-content-between">
					<button
						class="btn w-full"
						onclick={() => {
							clickTurn(-1);
						}}>Previous Turn</button
					>
				</div>
			{/if}

			{#if turn == 2}
				<div class="my-4 flex flex-row place-content-between">
					<button
						class="btn w-full"
						onclick={() => {
							makeNewGame();
						}}>New Game</button
					>
				</div>
			{/if}

			{#if turn > -1 && !showdescription}
				<div class="my-4 flex flex-row place-content-between">
					<button
						class="btn w-full"
						onclick={() => {
							toggleDescription();
						}}>Show Description</button
					>
				</div>
			{/if}
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
