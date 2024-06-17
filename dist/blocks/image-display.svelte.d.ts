/** @typedef {typeof __propDef.props}  ImageDisplayProps */
/** @typedef {typeof __propDef.events}  ImageDisplayEvents */
/** @typedef {typeof __propDef.slots}  ImageDisplaySlots */
export default class ImageDisplay extends SvelteComponent<{
    value?: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ImageDisplayProps = typeof __propDef.props;
export type ImageDisplayEvents = typeof __propDef.events;
export type ImageDisplaySlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
