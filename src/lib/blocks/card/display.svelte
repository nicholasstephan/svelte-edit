<script>
  import Image from '$lib/ui/image.svelte';
  export let value;
</script>

<div class="se-card">
  <div class="se-card__layout">
    <header class="se-card__header">
      <Image value={value?.image}/>
    </header>
    <div class="se-card__body">
      {@html value.body}
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
    padding: 1rem;
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