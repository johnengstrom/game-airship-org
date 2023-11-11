<script>
	import { onMount } from 'svelte';
	import { loadingstore } from './stores/loading.store';
	import { game } from '$lib/stores/game.store';
	import Rules from './Rules.svelte';
	let loading = true;
	onMount(() => {
		loadingstore.subscribe((data) => {
			loading = data;
		});

		game.subscribe((data) => {
			console.log('game ===>', data);
			if (data?.gameDescription) {
				loadingstore.set(false);
			}
		});
	});
</script>

{#if loading}
	<div class="w-screen h-screen backdrop-blur fixed top-0 w-full left-0 z-50">
		<div class="flex items-center justify-center h-screen">
			<div class="flex flex-col">
				<div>
					<button class="btn btn-primary btn-lg text-white font-bold py-2 px-4 rounded">
						Loading New Game...
					</button>
				</div>
				<div class="pt-8"><Rules /></div>
			</div>
		</div>
	</div>
{/if}
