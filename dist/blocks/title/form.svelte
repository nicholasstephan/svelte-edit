<script>
  export let value;
  $: if(!value) value = { text:"", level:"h1" };
  
</script>

<svelte:element this={value?.level || "h1"}>
  <div
    contenteditable
    class="input"
    bind:innerHTML={value.text}
  />
</svelte:element>


<style>

  div {
    padding: 7px;
    margin: 0 -8px;
    border-radius: 8px;
    border: 1px solid var(--background, #eeeeee);
    background: var(--background-light, #ffffff);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    color: var(--grey-dark);
    font-size: var(--medium-font-size);
  }

  div {
    outline: none;
  }
  
</style>