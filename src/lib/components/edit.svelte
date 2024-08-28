<script>

	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	import AddButton from './add-button.svelte';
	import AddMenu from './add-menu.svelte';
	import DoneButton from './done-button.svelte';
	import DragHandle from './drag-handle.svelte';
	import EditButton from './edit-button.svelte';
	import { updated } from "$app/stores";

	export let blocks = [];
	export let value = [];

	// Create a deep copy of the `value` to avoid mutating the original. 
	// When this component unmounts the new `value` is dispatched to the parent.
	$: data = JSON.parse(JSON.stringify(value || {}));

	// When a block is edited, 
	// update value and emit "change" event.
	const change = (key, value) => {
		data = {
			...data, 
			[key]: {
				...data[key],
				value: value
			}
		};
		dispatch('change', data);
	};

	// When a block is added.
	const add = (id, index=0) => {
		if (!Array.isArray(data)) {
			data = Object.values(data);
		}

		data = [
			...data?.slice(0, index),
			{ id, value:null },
			...data?.slice(index),
		];
		
		dispatch('change', data);
	};

	const remove = (key) => {
		data = data.filter((_, i) => i !== key);
		dispatch('change', data);
	};


	// State

	let isEditing = false;

	const edit = (key) => {
		isEditing = key;
	}

	const done = () => {
		isEditing = false;
	}
	

	// Hover Actions

	let isOverBefore = false;
	let isOverAfter = false;
	let isOverLeft = false;
	let isOverRight = false;

	const pointerMove = (key) => (e) => {
		let y = e.clientY;
		let x = e.clientX;
		let rect = e.currentTarget.getBoundingClientRect();
		isOverBefore = y < rect.top + 40 ? key : false;
		isOverAfter = y > rect.top + rect.height - 40 ? key : false;
		isOverLeft = x < rect.left + 80 ? key : false;
		isOverRight = x > rect.left + rect.width - 80 ? key : false;
	};

	const pointerLeave = (key) => () => {
		isOverBefore = false;
		isOverAfter = false;
		isOverLeft = false;
		isOverRight = false;
	};


	// Add menu.

	let isAddMenuOpen = false;
	const showMenu = (e) => isAddMenuOpen = {x: e.clientX, y: e.clientY};
	const hideMenu = () => isAddMenuOpen = false;


	// Event Handlers

	const clickSave = (key) => ({detail}) => {
		change(key, detail);
		done();
		dispatch('change', data);
	};

	const clickEdit = (key) => () => {
		console.log('clicked edit', key);
		edit(key);
	};

	const clickRemove = (key) => () => {
		remove(key);
	};

</script>

{#if Object.keys(data).length}
	{#each Object.entries(data || []) as [key, {id, value}] (key)}
  	{@const block = blocks?.find(b => b.id === id)}
		{@const component = isEditing === key ? block?.edit : block?.preview || block?.display}

		<section 
			class="se-block se-block-{block.id}"
			on:pointermove={pointerMove(key)}
			on:pointerleave={pointerLeave(key)}
		>

			{#if isEditing === false && isOverBefore === key}
				<div class="se-block-action se-block-add-before">
					<AddButton on:click={showMenu}/>
				</div>
			{/if}

			{#if isOverRight === key && isEditing === false}
				<div class="se-block-action se-block-edit">
					<EditButton on:click={clickEdit(key)}/>
				</div>
			{/if}

			{#if isEditing === false && isOverLeft === key && Object.keys(data).length > 1}
				<div class="se-block-action se-block-handle">
					<DragHandle/>
				</div>
			{/if}

			<svelte:component 
				this={component} 
				value={value} 
				on:save={clickSave(key)}
				on:remove={clickRemove(key)}
			/>

			{#if isEditing === false && isOverAfter === key}
				<div class="se-block-action se-block-add-after">
					<AddButton on:click={showMenu}/>
				</div>
			{/if}

		</section>

	{/each}
{:else}

	<AddButton on:click={showMenu}/>
	
{/if}

{#if isAddMenuOpen}
	<AddMenu 
		{blocks} 
		{...isAddMenuOpen}
		on:close={hideMenu}
		on:add={(e) => {
			add(e.detail);
			hideMenu();
		}}
	/>
{/if}


<style>
	
	.se-block {
		position: relative;
	}

	.se-block-handle {
		position: absolute;
		top: calc(50% - 20px);
		left: 0px;
	}

	.se-block-edit {
		position: absolute;
		top: calc(50% - 20px);
		right: 0px;
	}

	.se-block-add-before {
		position: absolute;
		top: -20px;
		left: 0;
		right: 0;
		height: 40px;
	}

	.se-block-add-after {
		position: absolute;
		bottom: -20px;
		left: 0;
		right: 0;
		height: 40px;
	}

</style>