<script>
  import Image from '../../ui/image.svelte';
  export let value = null;
</script>

<div class="se-image-grid">
  {#each value || [] as image}
    <div class="se-image-grid__image">
      <Image value={image}/>
    </div>
  {/each}
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
</style>