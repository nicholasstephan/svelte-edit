<script>

  export let value;
  export let alt = "";

  let url = "";
  $: if (!value?.url && value?.file) {
    console.log('loading file');
    let fr = new FileReader();
    fr.onload = function () {
      console.log('set url')
      url = fr.result;
    }
    fr.readAsDataURL(value.file);
  }
  else {
    url = value?.url;
  }
</script>

<img src={url} alt={alt}/>
