<script>

  import { page } from '$app/stores';
  import Page from '$lib/components/page.svelte';
	import blocks from '$lib/blocks/index.js';
  
  export let data = {};  
  $: path = $page.params.path || 'root';

	function save(value) {
		data[path] = value;
  }

  let editing = false;
	
</script>

<button on:click={() => editing = !editing }>Edit</button>


{#if data}
  <main>
    <Page {blocks} 
      data={data[path]} 
      editable={editing}
      on:change={e => save(e.detail)}
    />
  </main>
{:else}
  <main>
    <h1>404</h1>
    <p>Page not found</p>
  </main>
{/if}


<style>
  main {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>