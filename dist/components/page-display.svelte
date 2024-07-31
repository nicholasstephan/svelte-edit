<script>
  export let blocks = [];
  export let value = [];
</script>

{#each value as {id, value}}
  {@const block = blocks?.find(b => b.id === id)}
  {#if block}
    <svelte:component this={block.display} value={value}/>
  {/if}
{/each}