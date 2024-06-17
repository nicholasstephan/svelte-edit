<script>
  export let blocks = [];
  export let value = [];
</script>

<article>
  {#each value as {id, value}}
    {@const block = blocks.find(b => b.id === id)}
    <svelte:component this={block.display} value={value}/>
  {/each}
</article>


<style>

  article {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

</style>
