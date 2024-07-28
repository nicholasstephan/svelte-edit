<script>
  export let value;
</script>

{#if value?.title && value?.url}
  <p><a href={value.url}>{value.titlel}</a></p>
{:else if value?.url}
  <p><a href={value.url}>{value.url}</a></p>
{:else if value?.title}
  <p>{value.title}</p>
{:else}
  <p>Link Text</p>
{/if}

