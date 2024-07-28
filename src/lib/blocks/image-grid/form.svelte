<script>

  import InputImage from '$lib/ui/input-image.svelte';

  export let value = null;
  let newImage = null;
  
  const add = () => {
    value = [...(value || []), newImage];
    newImage = null;
  };

  const remove = (image) => () => {
    value = value.filter((i) => i !== image);
  };
  

</script>


<div class="se-image-grid">
  {#each value || [] as image}
    <div class="se-image-grid__image">
      <InputImage bind:value={image}/>
      <button on:click={remove(image)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
      </button>
    </div>
  {/each}
  <div class="se-image-grid__image">
    <InputImage bind:value={newImage} on:change={add}/>
  </div>
</div>



<style>
  .se-image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .se-image-grid :global(img) {
    width: 100%;
    height: auto;
  }

  .se-image-grid__image {
    position: relative;
  }

  .se-image-grid__image button {
    position: absolute;
    top: 8px;
    right: 8px;
		align-items: center;
		justify-content: center;
		height: 32px;
		width: 32px;
		padding: 0;
		border: none;
		color: var(--se-accent, #aaaaaa);
		fill: var(--se-accent, #aaaaaa);
		text-align: center;
		background: var(--se-light, #ffffff);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		border-radius: 16px;
		cursor: pointer;
	}

	.se-image-grid__image button svg {
		height: 16px;
		padding: 8px 0;
	}
</style>
