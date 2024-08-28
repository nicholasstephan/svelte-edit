<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let value;

  $: if(!value) value = { text:"", level:"h1" };
  
  const clickDone = () => {
		dispatch('save', value);
	};

	const clickRemove = () => {
		dispatch('remove');
	};
</script>

<div>
  <svelte:element 
    this={value?.level || "h1"}
    contenteditable
    bind:innerHTML={value.text}
  />
  <nav>
		<button on:click={clickRemove}>
			<svg viewBox="0 0 448 512"
				><path
					d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
				/></svg
			>
		</button>
		<span />
    <button on:click={clickDone}>
			<svg viewBox="0 0 448 512"
				><path
					d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
				/></svg
			>
			Done
		</button>
	</nav>
</div>


<style>

  div {
    padding: 7px;
    margin: -8px;
    border-radius: 8px;
    border: 1px solid var(--background, #eeeeee);
    background: var(--background-light, #ffffff);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    color: var(--grey-dark);
    font-size: var(--medium-font-size);
  }

  div :focus {
    outline: none;
  }

  nav {
		position: absolute;
		top: calc(100% + 8px);
		left: 0;
		right: 0;
    z-index: 200;
		border-radius: 4px;
		overflow: hidden;
		background: var(--se-forground, #424242);
    box-shadow: 2px 4px 8px color-mix(in srgb, var(--se-background, #eee), #000 20%);

		display: flex;
		flex-direction: row;
		align-items: center;
	}

	nav span {
		flex: 1;
	}

	button {
		padding: 16px;
		border: none;
		background: var(--se-forground, #424242);
		color: var(--se-background, #eeeeee);
		fill: var(--se-background, #eeeeee);
		cursor: pointer;

    display: flex;
    flex-direction: row;
    align-items: center;
	}

	button svg {
    display: inline-block;
		height: 16px;
    margin: 0 6px 0 0;
	}

	@media (hover: hover) {
		button:hover {
			background: color-mix(in srgb, var(--se-forground, #424242), var(--se-background, #fff) 20%);
		}
	}
  
</style>