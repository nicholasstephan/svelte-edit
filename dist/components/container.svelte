<!--
# Editor Container

```svelte
<Article {blocks} bind:value={value} editable={true}/>
```
-->

<script>
  import Display from './display.svelte';
  import Edit from './edit.svelte';

  export let blocks = [];
  export let value = [];
  export let editable = false;
</script>

{#if editable}
  <Edit {blocks} bind:value={value}/>
{:else}
  <Display {blocks} {value}/>
{/if}