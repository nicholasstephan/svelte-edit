<script>
	export let value;

	if (typeof value != 'object') {
		value = {};
	}

	const handleChangeKey = (key) => (e) => {
		let val = value[key] || '';
		console.log('set key', key, val, value);
		delete value[key];
		value[e.target.value] = val;
		console.log(value);
	};

	const handleChange = (key) => (e) => {
		value[key] = e.target.value;
		value = value;
	};

	const removeField = (key) => () => {
		delete value[key];
		value = value;
	};

	const addField = () => {
		value[''] = '';
	};
</script>

<section>
	{#each Object.entries(value) as [key, val]}
		<div>
			<input type="text" value={key} on:change={handleChangeKey(key)} />
			<input type="text" value={val} on:change={handleChange(key)} />
			<button class="se-data__remove" on:click={removeField(key)}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
					><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
						d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
					/></svg
				>
			</button>
		</div>
	{/each}
  <nav>
	  <button class="se-data__add" on:click={addField}>Add Field</button>
  </nav>
</section>

<style>

	div {
		display: grid;
		grid-template-columns: 200px 1fr 40px;
		gap: 1rem;
		padding: 0.5rem 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	}

	div:last-child {
		border: 0;
	}

	input {
		padding: 4px 8px;
    border: 1px solid color-mix(in srgb, var(--se-background, #eee) 80%, var(--se-forground, #424242) 20%);
		font-size: 1rem;
		font-family: inherit;
    background: var(--background, #eee);
	}

  input:focus {
    outline: none;
  }

  nav {
    padding: .5rem 0;
  }

	.se-data__add {
		padding: .5rem 1rem;
		font-size: 1rem;
		font-family: inherit;
		border: 1px solid  color-mix(in srgb, var(--se-background, #eee) 80%, var(--se-forground, #424242) 20%);
		border-radius: 0.5rem;
		background: var(--se-background, #eee);
    color: var(--se-forground, #424242);
		cursor: pointer;
	}

  .se-data__remove {
    padding: .3rem .25rem .1rem;
    border: none;
    color: var(--se-forground, #424242);
    fill: var(--se-forground, #424242);
		background: none;
    opacity: .5;
    cursor: pointer;
  }

  .se-data__remove:hover {
    opacity: 1;
  }

  button svg {
    height: 1rem;
  }
</style>
