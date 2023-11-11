<script>
	import { onMount } from 'svelte';

	onMount(() => {
		const audio = document.getElementById('audioPlayer');
		const radioStreamUrl = 'https://radio.airship.org/hls/airship_radio/live.m3u8';

		if (Hls.isSupported()) {
			const hls = new Hls();
			hls.loadSource(radioStreamUrl);
			hls.attachMedia(audio);
			hls.on(Hls.Events.MANIFEST_PARSED, function () {});
		} else if (audio.canPlayType('application/vnd.apple.mpegurl')) {
			console.log('application/vnd.apple.mpegurl');
			// This will run on Safari, where HLS is natively supported
			audio.src = radioStreamUrl;
			audio.addEventListener('loadedmetadata', function () {});
			audio.volume = 0.1;
		} else {
			console.error('HLS format is not supported in this browser.');
		}
	});
</script>

<!-- Audio player container -->
<div class="flex items-center justify-center w-full pt-8">
	<!-- Audio player element -->
	<audio id="audioPlayer" class="w-full mt-8" controls></audio>
</div>
<p class="mt-4 text-center text-sm">
	<small>Airship Radio</small>
</p>
