<script>
  export let value = null;
  export let options = [];
</script>

<div>
  {#each options as option}
    <button class:se-is-active={option == value} on:click={() => value = option}>{option}</button>
  {/each}
</div>

<style>

  div {
    display: flex;
    align-items: center;
  }

  button {
    padding: 8px 16px;
    border: 1px solid var(--se-accent, #aaaaaa);
    background:  var(--se-background, #eeeeee);
    cursor: pointer;
  }

  button:first-child {
    border-radius: 8px 0 0 8px;
  }

  button:last-child {
    border-radius: 0 8px 8px 0;
  }

  button.se-is-active {
    background: var(--accent, #aaaaaa);
    color: var(--light, #ffffff);
  }

  button + button {
    border-left: none;
  }

</style>

