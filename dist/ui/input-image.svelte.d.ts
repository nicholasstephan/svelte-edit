/** @typedef {typeof __propDef.props}  InputImageProps */
/** @typedef {typeof __propDef.events}  InputImageEvents */
/** @typedef {typeof __propDef.slots}  InputImageSlots */
export default class InputImage extends SvelteComponent<{
    value?: any;
}, {
    change: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type InputImageProps = typeof __propDef.props;
export type InputImageEvents = typeof __propDef.events;
export type InputImageSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value?: any;
    };
    events: {
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
