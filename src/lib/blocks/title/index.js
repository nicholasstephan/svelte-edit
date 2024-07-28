import Display from './display.svelte';
import Form from './form.svelte';

export default {
  id: 'title',
  name: "Title",
  icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M64 96v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V80C0 53.5 21.5 32 48 32H224 400c26.5 0 48 21.5 48 48v48c0 17.7-14.3 32-32 32s-32-14.3-32-32V96H256l0 320h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H144c-17.7 0-32-14.3-32-32s14.3-32 32-32h48l0-320H64z"/></svg>`,
  display: Display,
  edit: Form,
}