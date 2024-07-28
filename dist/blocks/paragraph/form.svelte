<script>
  import InputHTML from '../../ui/input-html.svelte';
  export let value;
  $: if(!value) value = "";
</script>

<div class="se-paragraph">
  <InputHTML bind:value={value} />
</div>

<style>
  .se-paragraph {
    margin: -8px;
  }
</style>