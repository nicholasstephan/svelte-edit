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
