<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

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
    if(!fileInput.files[0]) return;
    value = {
      url: null,
      file: fileInput.files[0]
    }
    dispatch('change', value);
  }
</script>

<button on:click={() => fileInput.click()}>
  {#if url}
    <img src={url} alt=""/>
  {:else}
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
    </div>
  {/if}
</button>
<input type="file" bind:this={fileInput} on:change={handleFileChoose}/>


<style>

  button {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 14px;
    padding: 0;
    border: 1px solid color-mix(in srgb, var(--se-background, #eee) 80%, var(--se-forground, #424242) 20%);
    background: none;
    color: var(--se-accent, #aaaaaa);
    cursor: pointer;
  }

  img {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    max-width: 64px;
    max-height: 64px;
    fill: color-mix(in srgb, var(--se-background, #eee) 80%, var(--se-forground, #424242) 20%);
  }

  input {
    display: none;
  }

</style>
