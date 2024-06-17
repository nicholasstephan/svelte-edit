export const blocks: {
    id: string;
    name: string;
    description: string;
    icon: string;
    display: typeof ImageDisplay;
    edit: typeof ImageEdit;
}[];
export default Container;
import ImageDisplay from './blocks/image-display.svelte';
import ImageEdit from './blocks/image-edit.svelte';
import Container from './components/container.svelte';
