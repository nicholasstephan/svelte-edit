<script>
  export let value;
</script>

<section>
  {@html value || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dapibus magna sed massa accumsan, sit amet dictum eros vestibulum. Donec ut tortor consectetur, fermentum odio vel, sagittis nisl. Maecenas eget ullamcorper libero. Curabitur turpis erat, consequat in aliquet eu, malesuada quis nibh. Nulla quis turpis leo. Curabitur nisi augue, porttitor a malesuada vitae, faucibus ut ipsum. Aliquam lobortis, eros sit amet dictum dapibus, massa quam feugiat neque, aliquam sollicitudin dolor felis ornare leo. Suspendisse potenti."}
</section>


<style>
  section {
    margin: 16px 0;
  }
</style>