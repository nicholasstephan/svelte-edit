<script>
  export let value = null;

  let url = value?.url;

  let fileInput;

  $: if (!value?.url && value?.file) {
    let fr = new FileReader();
    fr.onload = function () {
      url = fr.result;
    }
    fr.readAsDataURL(value.file);
  }

  function handleFileChoose() {
    value = {
      url: null,
      file: fileInput.files[0]
    }
  }

</script>


<div>
  {#if url}
    <img src={url} alt=""/>
  {/if}
  <button class="se-upload-area" on:click={() => fileInput.click()}>
    <p>Click or drop an image here</p>
  </button>
</div>

<input type="file" bind:this={fileInput} on:change={handleFileChoose}/>


<style>
  div {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 8px;
  }

  img {
    flex: 0;
    width: 120px;
    height: 120px;
    object-fit: cover;
  }

  button {
    flex: 1;
    border: 2px solid var(--accent-light, #f0f0f0);
    border-radius: 8px;
    background: none;
    color: var(--accent, #aaaaaa);
    cursor: pointer;

    font-size: 1em;
    line-height: 1em;
  }

  input {
    display: none;
  }
</style>
