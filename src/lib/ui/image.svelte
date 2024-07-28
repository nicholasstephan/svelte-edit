<script>

  export let value;
  export let alt = "";

  let url = "";
  $: if (!value?.url && value?.file) {
    let fr = new FileReader();
    fr.onload = function () {
      url = fr.result;
    }
    fr.readAsDataURL(value.file);
  }
  else {
    url = value?.url;
  }
</script>

<img src={url} alt={alt}/>
