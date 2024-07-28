<!--
# Editor Container

```svelte
<Page {blocks} bind:value={value} editable={true}/>
```
-->

<script>
  import { createEventDispatcher } from 'svelte';
  import Display from './page-display.svelte';
  import Edit from './page-edit.svelte';

  const dispatch = createEventDispatcher();

  export let blocks = [];
  export let value = [];
  export let editable = false;

  // Emitting a change event, and updating the value.
  // This should account for both bound and unbound values.
  const handleChange = e => {
    dispatch('change', e.detail);
    value = e.detail;
  };
</script>

{#if editable}
  <Edit {blocks} {value} on:change={handleChange}/>
{:else}
  <Display {blocks} {value}/>
{/if}