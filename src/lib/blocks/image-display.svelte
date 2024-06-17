<script>
  export let value = null;

  let url = value?.url;

  $: if (!value?.url && value?.file) {
    let fr = new FileReader();
    fr.onload = function () {
      url = fr.result;
    }
    fr.readAsDataURL(value.file);
  }

</script>

{#if url}
  <img src={url} alt=""/>
{/if}

<style>
  img {
    display: block;
    width: 100%;
    height: auto;
    margin: 16px 0;
  }
</style>
