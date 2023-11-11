<script>
	let cats = [
		{ id: 1, name: 'Keyboard Cat' },
		{ id: 2, name: 'Maru' },
		{ id: 3, name: 'Henri The Existential Cat' }
	];
	let visible = false;

	function reverse(node, { targets, duration }) {
		return {
			css: (t) => {
				return anime({
					targets,
					duration,
					easing: 'easeInOutCirc',
					opacity: [1, 0],
					translateX: [0, -500],
					scale: [1, 0],
					delay: anime.stagger(200)
				});
			}
		};
	}
	function forward(node, { targets, duration }) {
		return {
			css: (t) => {
				anime({
					targets,
					duration,
					easing: 'easeInOutCirc',
					opacity: [0, 1],
					translateX: [-500, 0],
					scale: [0, 1],
					delay: anime.stagger(200)
				});
			}
		};
	}
</script>

<div class="p-16 bg-white">
	<input type="checkbox" bind:checked={visible} />
	<ul>
		{#each cats as { name }, i}
			{#if visible}
				<h1
					class="animate"
					in:forward={{ targets: '.animate', duration: 1500 }}
					out:reverse={{ targets: '.animate', duration: 1500 }}
				>
					{i + 1}.{name}
				</h1>
			{/if}
		{/each}
	</ul>
</div>
