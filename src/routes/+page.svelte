<script>
	import Page from '$lib/index.js';
	import blocks from '$lib/blocks/index.js';

	let value = [
		{
			id: 'title',
			value: {
				text: 'Svelte Edit',
				level: 'h1'
			}
		},
		{
			id: 'paragraph',
			value: 'To edit any content block, just move your mouse over it and click the edit icon to make changes. Adding new blocks is super easy—simply click the plus icons above or below the current blocks to insert new ones. If you want to rearrange the blocks, grab the handle on the left and drag the block to your desired spot. This makes organizing your content a breeze. With these simple, intuitive controls, updating and customizing your content is quick and effortless, ensuring a smooth and enjoyable editing experience for everyone.<br>'
		}
	];

	const handleChange = e => {
		value = e.detail;
	};
</script>

<main>
	<Page {blocks} bind:value={value} editable={true}/>
</main>

<style>

	:global(html),
	:global(body) {
		padding: 0;
		margin: 0;
	}
	
	main {
		max-width: 1200px;
		margin: 16px auto;
	}
</style>
