<script>

  function drag(e) {
    console.log('pointer down');
  }

</script>


<button on:pointerdown={drag}>
  <svg viewBox="0 0 448 512"
    ><path
      d="M336 176a48 48 0 1 0 96 0 48 48 0 1 0 -96 0zm-160 0a48 48 0 1 0 96 0 48 48 0 1 0 -96 0zM64 224a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM336 336a48 48 0 1 0 96 0 48 48 0 1 0 -96 0zM224 384a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM16 336a48 48 0 1 0 96 0 48 48 0 1 0 -96 0z"
    /></svg
  >
</button>


<style>

  button {
    display: flex;
    width: 40px;
    height: 40px;
    padding: 12px;
    border: 0;
    background-color: var(--se-forground, #424242);
    border-radius: 20px;
    cursor: grab;

    --highlight: color-mix(in srgb, var(--se-forground, #424242), var(--se-background, #eee) 20%);
  }

  button svg {
    position: relative;
    z-index: 10;
    width: 16px;
    height: 16px;
    fill: var(--se-accent, #aaa);
  }

  @media (hover:hover) {
    button:hover {
      background-color: var(--highlight);
    }
  }

</style>