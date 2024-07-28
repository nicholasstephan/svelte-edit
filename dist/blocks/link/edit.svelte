<script>
  export let value = {url:""};

  if(value == null) {
    value = {url:""};
  }
</script>

{#if value}
  <input type="text" bind:value={value.url} placeholder="URL"/>
{/if}


<style>

  input {
    display: block;
    width: 100%;
    padding: 0;
    border: 0;

    font-size: 1em;
    line-height: 1em;
  }

  input:focus {
    outline: none;
  }

</style>