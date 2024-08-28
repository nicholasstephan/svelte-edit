<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let blocks = [];
  export let x = 0;
  export let y = 0;

  const close = () => () => {
    dispatch('close');;
  };

  const add = (id) => () => {
    dispatch('add', id);
  };
</script>


<div class="se-overlay" on:click={close()} role="button" tabindex="-1" on:keypress>
  <nav class="se-add-menu" style="transform:translate({x}px, {y}px)">
    {#each blocks as block}
      <button on:click={add(block.id)}>
        <div class="se-icon">
          {@html block.icon}
        </div>
        <p class="se-name">
          {block.name}
        </p>
      </button>
    {/each}
  </nav>
</div>


<style>

  .se-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
		background: none;
		border: none;
		padding: 120px;
		overflow: auto;
	}

	nav {
		position: absolute;
    top: 0;
    left: 0;
		display: flex;
		flex-direction: column;
		border-radius: 8px;
		background: var(--se-background, #eeeeee);
		box-shadow: 0 2px 8px color-mix(in srgb, var(--se-background, #eee) 80%, var(--se-forground, #424242) 20%);
		transform: translateX(-50%);
		overflow: hidden;
	}

  button {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 16px;
		width: 100%;
		padding: 0 32px 0 16px;
		border: none;
		background: none;
		text-align: left;
    background: var(--se-background, #eeeeee);
		color: var(--se-forground, #424242);
		fill: var(--se-forground, #424242);
		cursor: pointer;
		white-space: nowrap;
	}

  .se-icon {
    width: 1rem;
		height: 1rem;
		font-size: 1rem;
  }

  @media (hover: hover) {
		button:hover {
			background-color: color-mix(in srgb, var(--se-background, #eee) 80%, var(--se-forground, #424242) 20%);
		}
	}

</style>