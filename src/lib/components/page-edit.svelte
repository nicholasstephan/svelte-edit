<script>
	import { fly } from "svelte/transition";
	import { createEventDispatcher, onDestroy } from "svelte";

	const dispatch = createEventDispatcher();

	export let blocks = [];
	export let value = null;

	// I'm creating a deep copy of the value to avoid mutating the original. 
	// When this component unmounts, I'll dispatch the new value to the parent.
	let val = JSON.parse(JSON.stringify(value || {}));

	// If there's only one block option, automatically add it
	// and don't give the user the ability to add more.
	$: if(val && Object.keys(val)?.length == 0 && blocks?.length == 1) {
		val = [{ id: blocks[0].id, value: null }];
	}

	let article = null;
	let isEditing = false;
	let isDragging = false;
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
		// If `isEditing` exists, it means we're completing the edit on a block,
		// and should emit a change.
		if (isEditing !== false) {
			dispatch('change', val);
		}
		isEditing = isEditing === i ? false : i;
	};

	const remove = (i) => () => {

		if(Array.isArray(val)) {
			val = val.filter((v, index) => index !== i);
		}
		else {
			val = Object.keys(val).reduce((acc, key, index) => {
				if (index !== i) {
					acc[key] = val[key];
				}
				return acc;
			}, {});
		}
		isEditing = false;
	};

	const addBlock = (id) => () => {
		if (!Array.isArray(val)) {
			val = Object.values(val);
		}
		val = [
			...val?.slice(0, addingAtIndex),
			{ id, val: null },
			...val?.slice(addingAtIndex),
		];
		isAddMenuOpen = false;
		isEditing = addingAtIndex;
	};

	const drag = (i) => (e) => {

		if (!Array.isArray(val)) {
			val = Object.values(val);
		}

		isDragging = i;

		let dragStart = e.clientY;
		let targetBlock = article.children[i];

		const findIndex = (e) => {
			for (let [j, child] of Object.entries(article.children)) {
				if (child === targetBlock) continue;
				let childRect = child.getBoundingClientRect();
				let childMid = childRect.top + childRect.height / 2;
				if (e.clientY < childMid) {
					if (i < j) {
						j -= 1;
					}
					return j;
				}
			}
			return val.length - 1;
		};

		const dragEnd = (e) => {
			let j = findIndex(e);
			let [element] = val.splice(i, 1);
			val = [...val.slice(0, j), element, ...val.slice(j)];

			for (let child of article.children) {
				child.style.transform = null;
			}

			targetBlock.style.transform = null;

			dragStart = null;
			targetBlock = null;

			window.removeEventListener("pointerup", dragEnd);
			window.removeEventListener("pointermove", dragMove);

			isDragging = false;
		};

		const dragMove = (e) => {
			let diff = e.clientY - dragStart;
			targetBlock.style.transform = `translateY(${diff}px)`;

			let targetRect = targetBlock.getBoundingClientRect();
			let targetTop = targetRect.top;
			let targetBottom = targetRect.top + targetRect.height;

			for (let [j, child] of Object.entries(article.children)) {
				if (child === targetBlock) continue;
				let childRect = child.getBoundingClientRect();
				let childMid = childRect.top + childRect.height / 2;
				if (targetTop < childMid && j < i) {
					child.style.transform = `translateY(${targetBlock.scrollHeight}px)`;
				} else if (targetBottom > childMid && j > i) {
					child.style.transform = `translateY(-${targetBlock.scrollHeight}px)`;
				} else {
					child.style.transform = null;
				}
			}
		};

		window.addEventListener("pointerup", dragEnd);
		window.addEventListener("pointermove", dragMove);
	};

	$: console.log(val);

</script>

{#if Object.keys(val).length}
	<article bind:this={article} class:se-dragging={isDragging}>
		{#each Object.keys(val) as key, i}

			{@const block = blocks.find((b) => b?.id === val[key]?.id)}
			{@const component = isEditing === i ? block?.edit : block?.preview || block?.display}

			{#if component}
				<div
					class="se-block"
					class:se-editing={isEditing === i}
					class:se-dragging={isDragging === i}
				>
					<svelte:component this={component} bind:value={val[key].value} />

          {#if Object.keys(val).length > 1}
            <div class="se-action se-drag-handle">
              <button on:pointerdown={drag(i)}>
                <svg viewBox="0 0 448 512"
                  ><path
                    d="M336 176a48 48 0 1 0 96 0 48 48 0 1 0 -96 0zm-160 0a48 48 0 1 0 96 0 48 48 0 1 0 -96 0zM64 224a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM336 336a48 48 0 1 0 96 0 48 48 0 1 0 -96 0zM224 384a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM16 336a48 48 0 1 0 96 0 48 48 0 1 0 -96 0z"
                  /></svg
                >
              </button>
            </div>
          {/if}
					<div class="se-action se-edit">
						<button on:click={edit(i)}>
							<svg viewBox="0 0 512 512"
								><path
									d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
								/></svg
							>
						</button>
					</div>
					{#if blocks?.length > 1}
						<div class="se-action se-add-before">
							<button on:click={add(i)}>
								<svg viewBox="0 0 448 512"
									><path
										d="M248 72c0-13.3-10.7-24-24-24s-24 10.7-24 24V232H40c-13.3 0-24 10.7-24 24s10.7 24 24 24H200V440c0 13.3 10.7 24 24 24s24-10.7 24-24V280H408c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V72z"
									/></svg
								>
							</button>
						</div>
						<div class="se-action se-add-after">
							<button on:click={add(i + 1)}>
								<svg viewBox="0 0 448 512"
									><path
										d="M248 72c0-13.3-10.7-24-24-24s-24 10.7-24 24V232H40c-13.3 0-24 10.7-24 24s10.7 24 24 24H200V440c0 13.3 10.7 24 24 24s24-10.7 24-24V280H408c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V72z"
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
					{/if}
					<div class="se-action se-done">
						<button on:click={edit(false)}>
							<svg viewBox="0 0 448 512"
								><path
									d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
								/></svg
							>
						</button>
					</div>
				</div>
			{/if}
		{/each}
	</article>
{:else}
  <button on:click={add(0)} class="se-action se-add-first">
    <svg viewBox="0 0 448 512"
      ><path
        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
      /></svg
    >
  </button>
{/if}

{#if isAddMenuOpen}
	<button class="se-overlay" on:click={close}>
		<nav
			class="se-add-menu"
			style="left:{addMenuPosition[0]}px; top:{addMenuPosition[1] - 16}px"
			transition:fly={{ y: 16, duration: 200 }}
			bind:clientWidth={addMenuWidth}
		>
			{#each blocks as block}
				<button on:click={addBlock(block.id)}>
					<div class="se-icon">
						{@html block.icon}
					</div>
					<div class="se-name">
						{block.name}
					</div>
				</button>
			{/each}
		</nav>
	</button>
{/if}

<style>
	article {
		width: 100%;
	}

	.se-block {
		position: relative;
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		min-height: 32px;
	}

	.se-block button {
		align-items: center;
		justify-content: center;
		height: 32px;
		width: 32px;
		padding: 0;
		border: none;
		color: var(--se-accent, #aaaaaa);
		fill: var(--se-accent, #aaaaaa);
		text-align: center;
		background: color-mix(in srgb, var(--se-background, #eee) 80%, var(--se-forground, #424242) 20%);
		box-shadow: 0 1px 4px color-mix(in srgb, var(--se-background, #eee) 60%, var(--se-forground, #424242) 40%);
		border-radius: 16px;
		cursor: pointer;
	}

	.se-block button svg {
		height: 16px;
		padding: 8px 0;
	}

	@media (hover: hover) {
		.se-block button svg {
			opacity: 0.6;
			transition: opacity 100ms ease-in-out;
		}

		.se-block button:hover svg {
			opacity: 1;
		}
	}
	
	.se-editing.se-block {
		z-index: 100;
	}

	.se-editing.se-block:before {
		content: "";
		position: absolute;
		z-index: -1;
		inset: -8px -8px -8px -8px;
		outline: 2px solid var(--se-accent, #aaaaaa);
		box-shadow: 0 0 16px var(--se-accent, #aaaaaa);
		background: var(--se-background, #eeeeee);
		pointer-events: none;
	}

	/* 
	Animation on blocks as they move under a dragged block. 
	*/

	.se-dragging .se-block:not(.se-dragging) {
		transition: transform 200ms ease-in-out;
	}

	/* 
	When there aren't any blocks, show a button to add
	the first block.
	*/

	.se-add-first {
		display: flex;
		align-items: center;
		justify-content: center;

		height: 32px;
		width: 160px;

		border: none;
		margin: 0 auto;

		color: var(--se-accent, #aaaaaa);
		fill: var(--se-accent, #aaaaaa);
		box-shadow: 0 2px 4px color-mix(in srgb, var(--se-background, #eee) 80%, var(--se-forground, #424242) 20%);

		border-radius: 8px;
		background: var(--se-background, #eeeeee);
		cursor: pointer;
	}

	.se-add-first svg {
		height: 16px;
	}

	/* 
	Add Before and After Buttons
	On hoverable device, show when the user hovers over the top of the block.
	Hide when editing the block.
	*/

	.se-add-before,
	.se-add-after {
		position: absolute;
		left: 30%;
		right: 30%;
		height: 30%;
		z-index: 101;
		text-align: center;
	}

	.se-add-before {
		top: 0px;
	}
	.se-add-after {
		bottom: 0px;
	}

	.se-add-before button,
	.se-add-after button {
		position: absolute;
		left: calc(50% - 16px);
		display: none;
	}

	.se-add-before button {
		top: -16px;
	}

	.se-add-after button {
		bottom: -16px;
	}

	.se-add-before svg,
	.se-add-after svg {
		height: 16px;
	}

	.se-block.se-editing .se-add-before,
	.se-block.se-editing .se-add-after {
		display: none;
	}

	@media (hover: hover) {
		:not(.se-dragging) .se-add-before:hover button,
		:not(.se-dragging) .se-add-after:hover button {
			display: flex;
		}
	}

	/* 
	Drag Handle 
	*/

	.se-drag-handle {
		display: none;
		position: absolute;
		top: calc(50% - 32px);
		left: -48px;
		width: 64px;
		z-index: 101;
		padding: 16px 0;
	}

	.se-drag-handle button {
		cursor: grab;
	}

	@media (hover: hover) {
		.se-block:hover .se-drag-handle {
			display: block;
		}

		.se-drag-handle button:active {
			cursor: grabbing;
		}
	}

	/* 
	Edit Button 
	Hide when editing and dragging.
	*/

	.se-edit {
		display: none;
		position: absolute;
		top: calc(50% - 32px);
		right: -48px;
		width: 64px;
		text-align: right;
		z-index: 101;
		padding: 16px 0;
	}

	.se-edit svg {
		height: 16px;
		padding: 8px 0;
	}

	@media (hover: hover) {
		.se-block:hover:not(.dragging):not(.se-editing) .se-edit {
			display: block;
		}
	}

	/* 
	Done Button 
	*/

	.se-done {
		display: none;
		position: absolute;
		top: calc(50% - 32px);
		right: -48px;
		z-index: 101;
		padding: 16px 0;
	}

	.se-editing .se-done {
		display: block;
	}

	/* 
	Remove Button 
	*/

	.se-remove {
		display: block;
		position: absolute;
		top: calc(50% - 32px);
		right: -72px;
		z-index: 101;
		padding: 16px 0;
		transition: all 200ms ease-in-out;
		pointer-events: none;
		opacity: 0;
	}

	.se-editing .se-remove {
		right: -88px;
		opacity: 1;
		pointer-events: all;
	}

	.se-remove button {
		background: var(--se-accent, #aaa);
		fill: var(--se-forground, #fff);
	}

	@media (hover: hover) {
		.se-remove button {
			background: none;
			fill: var(--se-accent, #aaaaaa);
			box-shadow: none;
		}

		.se-remove button:hover {
			background: var(--se-accent, #aaa);
			fill: var(--se-forground, #ffff);
			box-shadow: 0 2px 4px color-mix(in srgb, var(--se-background, #eee) 80%, var(--se-forground, #424242) 20%);
		}
	}

	/* 
	Add Module Menu 
	*/

	.se-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 105;
		background: none;
		border: none;
		padding: 120px;
		overflow: auto;
	}

	.se-add-menu {
		position: absolute;
		display: flex;
		flex-direction: column;
		border-radius: 8px;
		background: var(--se-background, #eeeeee);
		box-shadow: 0 2px 8px color-mix(in srgb, var(--se-background, #eee) 80%, var(--se-forground, #424242) 20%);
		transform: translateX(-50%);
		overflow: hidden;
	}

	.se-add-menu button {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 16px;
		width: 100%;
		padding: 8px 32px 8px 16px;
		border: none;
		background: none;
		text-align: left;
		color: var(--se-forground, #424242);
		fill: var(--se-forground, #424242);
		cursor: pointer;
		white-space: nowrap;
	}

	.se-add-menu button .se-icon {
		width: 1rem;
		height: 1rem;
		font-size: 1rem;
	}
	
	.se-add-menu button .se-name {
		font-size: .8rem;
	}

	@media (hover: hover) {
		.se-add-menu button:hover {
			background-color: var(--se-background, #eeeeee);
		}
	}
</style>
