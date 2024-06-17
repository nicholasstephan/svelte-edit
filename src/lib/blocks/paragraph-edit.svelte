<script>
  export let value = "";
</script>

<div
  contenteditable
  bind:innerHTML={value}
  autofocus
/>


<style>
  div {
    margin: 16px 0;
  }
  div:focus {
    outline: none;
  }
</style>