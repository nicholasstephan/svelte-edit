<script>
  export let blocks = [];
  export let value = [];
</script>

{#each value as {id, value}}
  {@const block = blocks.find(b => b.id === id)}
  <svelte:component this={block.display} value={value}/>
{/each}