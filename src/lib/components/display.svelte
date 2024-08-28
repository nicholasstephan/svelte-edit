<script>
  export let blocks = [];
  export let value = [];
</script>

{#each Object.values(value || []) as {id, value}}
  {@const block = blocks?.find(b => b.id === id)}
  {#if block}
    <section class="se-block">
      <svelte:component this={block.display} value={value}/>
    </section>
  {/if}
{/each}