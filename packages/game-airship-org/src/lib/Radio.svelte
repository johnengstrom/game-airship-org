<script>
	import { onMount } from 'svelte';

	let volume = 0.2; // Default volume level

	let audio;

	onMount(() => {
		audio = document.getElementById('audioPlayer');
		const radioStreamUrl = 'https://radio.airship.org/hls/airship_radio/live.m3u8';

		if (Hls.isSupported()) {
			const hls = new Hls();
			hls.loadSource(radioStreamUrl);
			hls.attachMedia(audio);
			hls.on(Hls.Events.MANIFEST_PARSED, function () {});
			audio.volume = 0.2;
		} else if (audio.canPlayType('application/vnd.apple.mpegurl')) {
			console.log('application/vnd.apple.mpegurl');
			// This will run on Safari, where HLS is natively supported
			audio.src = radioStreamUrl;
			audio.addEventListener('loadedmetadata', function () {});
			audio.volume = 0.2;
		} else {
			console.error('HLS format is not supported in this browser.');
		}
	});

	// Reactive statement to update volume
	$: {
		if (audio) {
			audio.volume = volume;
		}
	}
</script>

<div class="flex items-center justify-center w-full pt-8">
	<audio id="audioPlayer" class="w-full mt-8 h-8" controls></audio>
</div>

<style>
	/* Custom styles for the slider */
	input[type='range'].styled-slider {
		-webkit-appearance: none;
		width: 100%;
		height: 20px;
		background: linear-gradient(to right, #4fd1c5, #38b2ac);
		border-radius: 0px;
		outline: none;
	}

	input[type='range'].styled-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 20px;
		height: 20px;
		background: #fff;
		border: 1px solid #4fd1c5;
		border-radius: 0%;
		cursor: pointer;
	}

	input[type='range'].styled-slider::-moz-range-thumb {
		width: 20px;
		height: 20px;
		background: #fff;
		border: 1px solid #4fd1c5;
		border-radius: 0%;
		cursor: pointer;
	}
</style>
