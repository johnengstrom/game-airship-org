<script>
	import { onMount } from 'svelte';
	import anime from 'animejs';
	import { game } from '$lib/stores/game.store';

	let _game;

	let visiblePanel = 0;
	let hiddenPanel = 2;

	const images = [
		'/games/game-1/game-1.png',
		'/games/game-1/game-2.png',
		'/games/game-1/game-3.png',
		'/games/game-1/game-4.png',
		'/games/game-1/game-5.png',
		'/games/game-1/game-6.png',
		'/games/game-1/game-7.png',
		'/games/game-1/game-8.png',
		'/games/game-1/game-9.png',
		'/games/game-1/game-10.png',
		'/games/game-1/game-11.png',
		'/games/game-1/game-12.png',
		'/games/game-1/game-13.png',
		'/games/game-1/game-14.png',
		'/games/game-1/game-15.png',
		'/games/game-1/game-16.png',
		'/games/game-1/game-17.png'
	];

	// Shuffle the images array
	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}
	function getRandomIndex() {
		return Math.floor(Math.random() * images.length);
	}

	onMount(() => {
		game.subscribe((data) => {
			_game = data;
		});

		shuffle(images);

		const panels = document.querySelectorAll('.game-panel');
		panels.forEach((panel, index) => {
			panel.style.backgroundImage = `url(${images[getRandomIndex()]})`;
			if (index !== hiddenPanel) {
				panel.style.opacity = 1;
			}
		});

		startFading(panels);
	});

	function startFading(panels) {
		setInterval(() => {
			// Set the next image for the hidden panel
			panels[hiddenPanel].style.backgroundImage = `url(${images[getRandomIndex()]})`;

			// Fade in the hidden panel
			anime({
				targets: panels[hiddenPanel],
				opacity: [0, 1],
				easing: 'easeInOutQuad',
				duration: 3000, // Extended fade duration
				complete: () => {
					// Prepare panels for next iteration
					let temp = visiblePanel;
					visiblePanel = hiddenPanel;
					hiddenPanel = (hiddenPanel + 1) % 3;
					panels[temp].style.opacity = 0;
				}
			});
		}, 12000); // Extended delay between new images
	}
</script>

<div class="game w-screen h-screen fixed top-0 left-0 z-0">
	<div class="game-panel w-screen h-screen"></div>
	<div class="game-panel w-screen h-screen"></div>
	<div class="game-panel w-screen h-screen" style="opacity: 0;"></div>
</div>

<style>
	.game-panel {
		position: absolute;
		top: 0;
		left: 0;
		background-size: cover;
        background-position: center;
		transition: background-image 2s ease;
	}
</style>
