<script>

import InputHTML from '$lib/ui/input-html.svelte';
import InputImage from '$lib/ui/input-image.svelte';

  export let value;
  $: if(!value) value = {
    image: null,
    body: "",
  };
</script>

<div class="se-card">
  <div class="se-card__layout">
    <header class="se-card__header">
      <InputImage bind:value={value.image}/>
    </header>
    <div class="se-card__body">
      <InputHTML placeholder="Card Body" bind:value={value.body}/>
    </div>
  </div>
</div>

<style>

  .se-card {
    display: block;
    container-type: inline-size;
    container-name: se-card;
  }

  .se-card__layout {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .se-card__header {
    width: 100%;
    height: 10rem;
  }

  .se-card__header :global(img) {
    width: 100%;
    height: 100%;
  }

  .se-card__body {
    box-sizing: border-box;
    width: 100%;
    padding: 0.5rem 1rem;
  }

  :focus {
    outline: none;
  }

  @container se-card (min-width: 640px) {
    .se-card__layout {
      flex-direction: row;
      gap: 1rem;
    }

    .se-card__header {
      flex: 0 0 40%;
    }

    .se-card__body {
      flex: 1;
      padding: 0;
    }
  }
</style>