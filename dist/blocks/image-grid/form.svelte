<script>
	import { flip } from 'svelte/animate';

	import InputImage from '../../ui/input-image.svelte';

	export let value = [];
	let newImage = null;
	let container;

	const add = () => {
		value = [...(value || []), newImage];
		newImage = null;
	};

	const remove = (image) => () => {
		value = value.filter((i) => i !== image);
	};

	let isDragging = false;
	let isDragAnimating = false;

	const drag = (i) => (e) => {
		isDragging = true;

		const dragEnd = (e) => {
			window.removeEventListener('pointerup', dragEnd);
			window.removeEventListener('pointermove', dragMove);
			isDragging = false;
		};

		const dragMove = (e) => {
			if(isDragAnimating) {
				return;
			}
      
      for (let [j, child] of Object.entries(container.children)) {
        if(j == i) continue;

        const rect = child.getBoundingClientRect();

        if (
          e.clientX > rect.left &&
          e.clientX < (rect.left + rect.width) &&
          e.clientY > rect.top &&
          e.clientY < (rect.top + rect.height)
        ) {
					if(e.clientX < (rect.left + rect.width / 2)) {
						let before = value[j];
						let [item] = value.splice(i, 1);
						let intoIndex = value.indexOf(before);
						value = [...value.slice(0, intoIndex), item, ...value.slice(intoIndex)];
						i = intoIndex;
					} else {
						let after = value[j];
						let [item] = value.splice(i, 1);
						let intoIndex = value.indexOf(after) + 1;
						value = [...value.slice(0, intoIndex), item, ...value.slice(intoIndex)];
						i = intoIndex;
					}
					isDragAnimating = true;
					setTimeout(() => isDragAnimating = false, 200);
        }
      }

		};

		window.addEventListener('pointerup', dragEnd);
		window.addEventListener('pointermove', dragMove);
	};
</script>

<div class="se-image-grid" class:se--dragging={isDragging} bind:this={container}>
	{#each value || [] as image, i (image.url || image.file?.name)}
		<div class="se-image-grid__image" animate:flip={{duration:200}}>
			<InputImage bind:value={image} />
			<nav>
				{#if value.length > 1}
					<button on:pointerdown={drag(i)} class="se-image-grid__drag-handle">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"
							><path
								d="M48 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm0 160a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM96 416A48 48 0 1 0 0 416a48 48 0 1 0 96 0zM208 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48 112a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM208 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
							/></svg
						>
					</button>
				{/if}
				<button on:click={remove(image)}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
						><path
							d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
						/></svg
					>
				</button>
			</nav>
		</div>
	{/each}
	<div class="se-image-grid__image">
		<InputImage bind:value={newImage} on:change={add} />
	</div>
</div>

<style>
	.se-image-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	}

	.se-image-grid.se--dragging {
		cursor: grabbing;
	}

	.se-image-grid :global(img) {
		width: 100%;
		height: auto;
	}

	.se-image-grid__image {
		position: relative;
		z-index: 1000;
	}

	.se-image-grid__image nav {
		position: absolute;
		top: 8px;
		right: 8px;
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.se-image-grid__image button {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 32px;
		width: 32px;
		padding: 0;
		border: none;
		color: var(--se-accent, #aaaaaa);
		fill: var(--se-accent, #aaaaaa);
		text-align: center;
		background: var(--se-background, #eeeeee);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		border-radius: 16px;
		cursor: pointer;
	}

	.se-image-grid__image button svg {
		height: 16px;
		padding: 8px 0;
	}

	.se-image-grid__drag-handle {
		cursor: grab;
	}
</style>
