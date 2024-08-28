<nav>
  <button on:click> 
    <svg viewBox="0 0 448 512"
      ><path
        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
      /></svg
    >
  </button>
</nav>

<style>

  nav {
    position: relative;
    display: block;
    width: 100%;
    --highlight: color-mix(in srgb, var(--se-forground, #424242), var(--se-background, #eee) 20%);
  }

  nav::after {
    content: '';
    position: absolute;
    z-index: 5;
    top: 19px;
    left: 0;
    right: 0;
    height: 2px;
    border-radius: 3px;
    background: var(--se-forground, #424242);
  }

  button {
    position: relative;
    z-index: 10;
    display: flex;
    width: 40px;
    height: 40px;
    padding: 12px;
    border: 0;
    margin: 0 auto;
    background-color: var(--se-forground, #424242);
    border-radius: 20px;
    cursor: pointer;

    --highlight: color-mix(in srgb, var(--se-forground, #424242), var(--se-background, #eee) 20%);
  }

  button svg {
    width: 16px;
    height: 16px;
    fill: var(--se-accent, #aaa);
  }

  @media (hover:hover) {
    button:hover {
      background-color: var(--highlight);
    }

    button:hover::after {
      background: var(--highlight);
    }
  }

</style>