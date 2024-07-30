<script>
  export let value;
</script>

<section>
  {#each Object.entries(value) as [key, val]}
    <div>
      <span>{key}</span>
      <span>{val}</span>
    </div>
  {/each}
</section>

<style>

  section {
    padding: .5rem;
    margin: 1rem 0;
    border-radius: 8px;
    background: var(--se-background, #eee);
  }

  div {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    border-bottom: 1px solid rgba(0,0,0,0.2);
  }

  div:last-child {
    border: 0;
  }

  span {
    padding: 8px;
  }

</style>
