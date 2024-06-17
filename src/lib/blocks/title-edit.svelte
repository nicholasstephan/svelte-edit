<script>
	import InputRadio from "$lib/ui/input-radio.svelte";

  export let value = {};

  $: if(!value) {
    value = {
      text: "",
      level: "h1"
    };
  }
</script>


<div
  contenteditable
  class="se-input"
  bind:innerHTML={value.text}
  autofocus
/>

<div class="se-row">
  <InputRadio
    bind:value={value.level}
    options={["h1", "h2", "h3", "h4", "h5", "h6"]}
  />
</div>



<style>
  .se-input {
    margin: 0 0 16px 0;
  }
  .se-input:focus {
    outline: none;
  }

  .se-row {
    display: flex;
    align-items: center;
  }
</style>