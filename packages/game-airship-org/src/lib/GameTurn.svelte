<script>
	import Chance from './Chance.svelte';

	export let turn;
	export let _game;
	export let choose;
	export let choices;

	const bonus = {
		none: 'No team won a bonus card',
		blueTeam: 'Blue team wins bonus card',
		redTeam: 'Red tean wins bonus card',
		shared: 'Both teams win bonus card'
	};
</script>

<div class="my-4">
	<h1 class="mb-2 font-bold text-xl">Turn {turn + 1}</h1>
	<h2>Scenario: {_game.turns[turn].scenario}</h2>
</div>

<div class="my-4">
	<h2>Option A: <em>{_game.turns[turn].options.A}</em></h2>
	<button
		class="btn mt-2 bg-red-900"
		onclick={() => {
			choose('player1', 'choice1', 'A');
		}}>Choose A</button
	>
	<button
		class="btn mt-2 bg-blue-900"
		onclick={() => {
			choose('player2', 'choice1', 'A');
		}}>Choose A</button
	>
</div>

<div class="my-4">
	<h2>Option B: <em>{_game.turns[turn].options.B}</em></h2>
	<button
		class="mt-2 btn bg-red-900"
		onclick={() => {
			choose('player1', 'choice1', 'B');
		}}>Choose B</button
	>
	<button
		class="mt-2 btn bg-blue-900"
		onclick={() => {
			choose('player2', 'choice1', 'B');
		}}>Choose B</button
	>
</div>
{#if choices.player1['choice1'] !== '' && choices.player2['choice1'] !== ''}
	<div class="my-4">
		<h1 class="mb-2 font-bold text-xl">Outcome</h1>
		<em
			>{_game.turns[turn].outcomes[`${choices.player1['choice1']}${choices.player2['choice1']}`]
				.narrative}</em
		>
	</div>

	<div class="my-4">
		<h1 class="mb-2 font-bold text-xl">Bonus Card</h1>

		<h2 class="mb-2 italic">
			{bonus[
				_game.turns[turn].outcomes[`${choices.player1['choice1']}${choices.player2['choice1']}`]
					.bonusCard
			]}
		</h2>
	</div>

	<script>
	</script>

	<!--<div class="flex flex-row">
		<div>
			{#if _game.turns[turn].outcomes[`${choices.player1['choice1']}${choices.player2['choice1']}`].bonusCard === 'shared'}<Chance
					bgcolor="bg-red-900"
				/>{/if}
		</div>
		 <div>
			{#if _game.turns[turn].outcomes[`${choices.player1['choice1']}${choices.player2['choice1']}`].bonusCard === 'shared'}
				<Chance bgcolor="bg-blue-900" />
			{/if}
		</div>
	</div> -->
{/if}
