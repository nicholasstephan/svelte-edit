import Display from './display.svelte';
import Form from './form.svelte';

export default {
  id: 'card-carousel',
  name: "Card Carousel",
  icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M32 0L80 0l0 512-48 0L32 0zM160 96l192 0 0 320-192 0 0-320zM480 0l0 512-48 0L432 0l48 0z"/></svg>`,
  display: Display,
  edit: Form,
}