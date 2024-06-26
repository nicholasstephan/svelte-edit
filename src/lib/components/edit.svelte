<script>

	import { fly } from 'svelte/transition';

	export let blocks = [];
	export let value = [];

	let article = null;
	let isEditing = false;
	let addMenuWidth = 0;
	let isAddMenuOpen = false;
	let addingAtIndex = 0;
	let addMenuPosition = [0, 0];

	const add = (i) => (e) => {
		addingAtIndex = i;
		addMenuPosition = [e.clientX, e.clientY];
		isAddMenuOpen = true;
	};

	const close = () => {
		isAddMenuOpen = false;
	};

	const edit = (i) => () => {
		isEditing = isEditing === i ? false : i;
	};

	const remove = (i) => () => {
		value = value.filter((v, index) => index !== i);
		isEditing = false;
	};

	const addBlock = (id) => () => {
		if(!Array.isArray(value)) {
			value = [];
		}

		value = [
			...value?.slice(0, addingAtIndex),
			{ id, value: null },
			...value?.slice(addingAtIndex)
		];
		isAddMenuOpen = false;
		isEditing = addingAtIndex;
	};

	const drag = (i) => (e) => {

		let dragStart = e.clientY;
		let targetBlock = article.children[i];

		const findIndex = (e) => {
			for(let [j, child] of Object.entries(article.children)) {
				if(child === targetBlock) continue;
				let childRect = child.getBoundingClientRect();
				let childMid = childRect.top + childRect.height / 2;
				if (e.clientY < childMid) {
					if(i < j) {
						j -= 1;
					}
					return j;
				} 
			}
			return value.length - 1;
		};

		const dragEnd = (e) => {

			let j = findIndex(e);
			let [element] = value.splice(i, 1);
			value = [
				...value.slice(0, j),
				element,
				...value.slice(j)
			];

			for(let child of article.children) {
				child.style.transform = null;
			}

			article.classList.remove('dragging');
			targetBlock.classList.remove('dragging');
			targetBlock.style.transform = null;

			dragStart = null;
			targetBlock = null;

			window.removeEventListener('pointerup', dragEnd);
			window.removeEventListener('pointermove', dragMove);
		};

		const dragMove = (e) => {
			let diff = e.clientY - dragStart;
			article.classList.add('dragging');
			targetBlock.classList.add('dragging');
			targetBlock.style.transform = `translateY(${diff}px)`;

			let targetRect = targetBlock.getBoundingClientRect();
			let targetTop = targetRect.top;
			let targetBottom = targetRect.top + targetRect.height;

			for(let [j, child] of Object.entries(article.children)) {
				if(child === targetBlock) continue;
				let childRect = child.getBoundingClientRect();
				let childMid = childRect.top + childRect.height / 2;
				if (targetTop < childMid && j < i) {
					child.style.transform = `translateY(${targetBlock.scrollHeight}px)`;
				}
				else if (targetBottom > childMid && j > i) {
					child.style.transform = `translateY(-${targetBlock.scrollHeight}px)`;
				} 
				else {
					child.style.transform = null;
				}
			}

		};

		window.addEventListener('pointerup', dragEnd);
		window.addEventListener('pointermove', dragMove);
	};
</script>

<article bind:this={article} class:editable={isEditing === false}>
	{#each Array.isArray(value) ? value : [] as v, i}
		{@const block = blocks.find((b) => b.id === v.id)}
		{@const component = isEditing === i ? block?.edit : block?.display}

		{#if component}
			<div class="se-block" class:editing={isEditing === i}>
				<svelte:component this={component} bind:value={v.value} />

				<div class="se-action se-drag-handle">
					<button on:pointerdown={drag(i)}>
						<svg viewBox="0 0 448 512"
							><path
								d="M336 176a48 48 0 1 0 96 0 48 48 0 1 0 -96 0zm-160 0a48 48 0 1 0 96 0 48 48 0 1 0 -96 0zM64 224a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM336 336a48 48 0 1 0 96 0 48 48 0 1 0 -96 0zM224 384a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM16 336a48 48 0 1 0 96 0 48 48 0 1 0 -96 0z"
							/></svg
						>
					</button>
				</div>
				<div class="se-action se-edit">
					<button on:click={edit(i)}>
						<svg viewBox="0 0 512 512"
							><path
								d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
							/></svg
						>
					</button>
				</div>
				<div class="se-action se-add-before">
					<button on:click={add(i)}>
						<svg viewBox="0 0 448 512"
							><path
								d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
							/></svg
						>
					</button>
				</div>
				<div class="se-action se-add-after">
					<button on:click={add(i + 1)}>
						<svg viewBox="0 0 448 512"
							><path
								d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
							/></svg
						>
					</button>
				</div>
				<div class="se-action se-done">
					<button on:click={edit(false)}>
						<svg viewBox="0 0 448 512"
							><path
								d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
							/></svg
						>
					</button>
				</div>
				<div class="se-action se-remove">
					<button on:click={remove(i)}>
						<svg viewBox="0 0 448 512"
							><path
								d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
							/></svg
						>
					</button>
				</div>
			</div>
		{/if}
	{:else}
		<button on:click={add(0)} class="se-action se-add-first">
			<svg viewBox="0 0 448 512"
				><path
					d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
				/></svg
			>
		</button>
	{/each}
</article>

{#if isAddMenuOpen}
	<button class="se-overlay" on:click={close}>
		<nav
			class="se-add-menu"
			style="left:{addMenuPosition[0] - addMenuWidth / 2}px; top:{addMenuPosition[1] - 40}px"
			transition:fly={{ y: 16, duration: 200 }}
			bind:clientWidth={addMenuWidth}
		>
			{#each blocks as block}
				<button on:click={addBlock(block.id)}>
					{@html block.icon}
				</button>
			{/each}
		</nav>
	</button>
{/if}

<style>
	article {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
	}

	.se-block {
		position: relative;
	}

	:global(.dragging .se-block:not(.dragging)) {
		transition: transform 200ms ease-in-out;
	}

	/* Actions */

	.se-action svg {
		height: 16px;
	}

	.se-add-before {
		position: absolute;
		top: calc(-40px - 24px);
		left: calc(50% - 48px - 24px);
		z-index: 101;
		padding: 24px 48px;
	}

	.se-add-before button {
		height: 32px;
		width: 48px;
		border: none;
		color: var(--accent, #aaaaaa);
		fill: var(--accent, #aaaaaa);
		border-radius: 8px 8px 0 0;
		background: var(--accent-light, #f0f0f0);
		cursor: pointer;
	}

	.se-add-after {
		position: absolute;
		bottom: calc(-40px - 24px);
		left: calc(50% - 48px - 24px);
		z-index: 101;
		padding: 24px 48px;
	}

	.se-add-after button {
		height: 32px;
		width: 48px;
		border: none;
		color: var(--accent, #aaaaaa);
		fill: var(--accent, #aaaaaa);
		border-radius: 0 0 8px 8px;
		background: var(--accent-light, #f0f0f0);
		cursor: pointer;
	}

	.se-edit {
		position: absolute;
		top: calc(-40px - 24px);
		right: 0px;
		z-index: 101;
		padding: 24px 0 24px 48px;
	}

	.se-edit button {
		height: 32px;
		width: 48px;
		border: none;
		color: var(--accent, #aaaaaa);
		fill: var(--accent, #aaaaaa);
		border-radius: 8px 8px 0 0;
		background: var(--accent-light, #f0f0f0);
		cursor: pointer;
	}

	.se-done {
		position: absolute;
		bottom: -40px;
		right: 0px;
		z-index: 101;
	}

	.se-done button {
		height: 32px;
		width: 48px;
		border: none;
		color: var(--accent, #aaaaaa);
		fill: var(--accent, #aaaaaa);
		border-radius: 0 0 8px 8px;
		background: var(--accent-light, #f0f0f0);
		cursor: pointer;
	}

	.se-remove {
		position: absolute;
		bottom: -40px;
		right: 64px;
		z-index: 101;
	}

	.se-remove button {
		height: 32px;
		width: 48px;
		border: none;
		color: var(--accent, #aaaaaa);
		fill: var(--accent, #aaaaaa);
		border-radius: 0 0 8px 8px;
		background: var(--accent-light, #f0f0f0);
		cursor: pointer;
	}

	.se-drag-handle {
		position: absolute;
		top: calc(50% - 32px);
		left: -48px;
		z-index: 101;
    padding: 16px 0;
	}

  .se-drag-handle button {
    height: 32px;
		width: 48px;
		border: none;
		fill: var(--accent, #aaaaaa);
		background: none;
		cursor: grab;
  }

	.se-block.editing:before {
		content: '';
		position: absolute;
		top: -8px;
		left: -8px;
		right: -8px;
		bottom: -8px;
		z-index: -1;
		outline: 4px solid var(--accent-light, #f0f0f0);
		border-radius: 4px;
		pointer-events: none;
	}

	.se-block .se-done,
	.se-block .se-remove {
		display: none;
	}

	.se-block.editing .se-done,
	.se-block.editing .se-remove {
		display: block;
	}

	@media (hover: hover) {
		.editable .se-block:not(.dragging):hover:before {
			content: '';
			position: absolute;
			top: -8px;
			left: -8px;
			right: -8px;
			bottom: -8px;
			z-index: -1;
			outline: 4px solid var(--accent-light, #f0f0f0);
			border-radius: 4px;
		}

		.se-action {
			display: none;
		}

		.editable .se-block:not(.dragging):hover .se-add-after,
		.editable .se-block:not(.dragging):hover .se-add-before,
		.editable .se-block:not(.dragging):hover .se-edit,
		.editable .se-block:hover .se-drag-handle,
		.editable .se-block.dragging .se-drag-handle {
			display: block;
		}

		.se-action button:hover svg {
			fill: var(--accent-dark, #424242);
		}
	}

	.se-add-first {
		display: flex;
		align-items: center;
		justify-content: center;

		height: 32px;
		width: 64px;

		border: none;
		margin: 0 auto;

		color: var(--accent, #aaaaaa);
		fill: var(--accent, #aaaaaa);

		border-radius: 8px;
		background: var(--accent-light, #f0f0f0);
		cursor: pointer;
	}

	:global(.editable .se-block.dragging .se-add-after),
	:global(.editable .se-block.dragging .se-add-before),
	:global(.editable .se-block.dragging .se-edit) {
		display: none;
	}

	/* Add Module Menu */

	.se-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 105;
		background: none;
		border: none;
	}

	.se-add-menu {
		position: absolute;
		padding: 16px;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;

		border-radius: 16px;
		background: var(--accent-light, #f0f0f0);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

		transform-origin: 0 0;
	}

	.se-add-menu button {
		width: 64px;
		height: 64px;
		border: 1px solid var(--accent, #aaaaaa);
		border-radius: 8px;
		background: none;
		color: var(--accent, #aaaaaa);
		cursor: pointer;
		white-space: nowrap;
	}

	.se-add-menu button :global(svg) {
		height: 32px;
		fill: var(--accent, #aaaaaa);
	}

	@media (hover: hover) {
		.se-add-menu button:hover {
			background-color: var(--accent, #aaaaaa);
		}

		.se-add-menu button:hover :global(svg) {
			fill: var(--accent-light, #f0f0f0);
		}
	}
</style>
