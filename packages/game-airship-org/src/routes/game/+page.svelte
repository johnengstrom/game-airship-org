<script>
	import { onMount, afterUpdate } from 'svelte';
	import Board from '$lib/Board.svelte';
	import Cards from '$lib/Cards.svelte';
	import Turns from '$lib/Turns.svelte';
	import { game } from '$lib/stores/game.store';
	import Backdrop from '$lib/Backdrop.svelte';

	let _game;

	onMount(() => {
		game.subscribe((data) => {
			console.log('game data ---->', data);
			_game = data;
		});
	});
</script>

<div class="fixed top-0 z-20 game flex flex-row h-screen">
	<div class="grow">
		<Board />
		{#if true || _game?.gameDescription}
			<Cards />
		{/if}
	</div>
	<div class="shrink">
		<Turns />
	</div>
</div>

<Backdrop />
