<script>
  export let value;
</script>

<svelte:element this={value?.level || "h1"} class="se-title">
  {@html value?.text || "Lorem Ipsum"}
</svelte:element>