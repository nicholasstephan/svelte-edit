<script>
  export let value;
</script>

<svelte:element this={value?.level || "h1"}>
  {@html value?.text || "Lorem Ipsum"}
</svelte:element>