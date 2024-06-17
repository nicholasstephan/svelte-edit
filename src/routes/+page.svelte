<script>
	import Article, { blocks } from '$lib/index.js';

	let value = [
		{
			id: 'paragraph',
			value:
				'0 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dapibus magna sed massa accumsan, sit amet dictum eros vestibulum. Donec ut tortor consectetur, fermentum odio vel, sagittis nisl. Maecenas eget ullamcorper libero. Curabitur turpis erat, consequat in aliquet eu, malesuada quis nibh. Nulla quis turpis leo. Curabitur nisi augue, porttitor a malesuada vitae, faucibus ut ipsum. Aliquam lobortis, eros sit amet dictum dapibus, massa quam feugiat neque, aliquam sollicitudin dolor felis ornare leo. Suspendisse potenti.'
		},
		{
			id: 'paragraph',
			value:
				'1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dapibus magna sed massa accumsan, sit amet dictum eros vestibulum. Donec ut tortor consectetur, fermentum odio vel, sagittis nisl. Maecenas eget ullamcorper libero. Curabitur turpis erat, consequat in aliquet eu, malesuada quis nibh. Nulla quis turpis leo. Curabitur nisi augue, porttitor a malesuada vitae, faucibus ut ipsum. Aliquam lobortis, eros sit amet dictum dapibus, massa quam feugiat neque, aliquam sollicitudin dolor felis ornare leo. Suspendisse potenti.'
		},
		{
			id: 'paragraph',
			value:
				'2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dapibus magna sed massa accumsan, sit amet dictum eros vestibulum. Donec ut tortor consectetur, fermentum odio vel, sagittis nisl. Maecenas eget ullamcorper libero. Curabitur turpis erat, consequat in aliquet eu, malesuada quis nibh. Nulla quis turpis leo. Curabitur nisi augue, porttitor a malesuada vitae, faucibus ut ipsum. Aliquam lobortis, eros sit amet dictum dapibus, massa quam feugiat neque, aliquam sollicitudin dolor felis ornare leo. Suspendisse potenti.'
		},
		{
			id: 'paragraph',
			value:
				'3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dapibus magna sed massa accumsan, sit amet dictum eros vestibulum. Donec ut tortor consectetur, fermentum odio vel, sagittis nisl. Maecenas eget ullamcorper libero. Curabitur turpis erat, consequat in aliquet eu, malesuada quis nibh. Nulla quis turpis leo. Curabitur nisi augue, porttitor a malesuada vitae, faucibus ut ipsum. Aliquam lobortis, eros sit amet dictum dapibus, massa quam feugiat neque, aliquam sollicitudin dolor felis ornare leo. Suspendisse potenti.'
		}
	];
</script>

<Article {blocks} bind:value editable={true} />
