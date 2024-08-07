declare const _default: ({
    id: string;
    name: string;
    icon: string;
    edit: typeof import("./data/form.svelte").default;
    preview: typeof import("./data/preview.svelte").default;
} | {
    id: string;
    name: string;
    icon: string;
    display: typeof import("./image/display.svelte").default;
    edit: typeof import("./image/form.svelte").default;
})[];
export default _default;
