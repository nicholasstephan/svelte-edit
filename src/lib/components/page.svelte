<!--
# Editor Container

```svelte
<Page {blocks} bind:value={value} editable={true}/>
```

TODO: 
- [ ] Can we lazy load page-edit.svelte if editable is true?

-->

<script>
  import { createEventDispatcher } from 'svelte';
  import Display from './display.svelte';
  import Edit from './edit.svelte';

  const dispatch = createEventDispatcher();

  export let blocks = [];
  export let value = [];
  export let editable = false;

  // Emitting a change event, and updating the value.
  // This supports both bound and unbound values.
  const handleChange = e => {
    dispatch('change', e.detail);
    value = e.detail;
  };

  $: console.log('value', value);
</script>

{#if editable}
  <Edit {blocks} {value} on:change={handleChange}/>
{:else}
  <Display {blocks} {value}/>
{/if}