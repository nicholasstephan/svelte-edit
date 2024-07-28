/** @typedef {typeof __propDef.props}  ImageProps */
/** @typedef {typeof __propDef.events}  ImageEvents */
/** @typedef {typeof __propDef.slots}  ImageSlots */
export default class Image extends SvelteComponent<{
    value: any;
    alt?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ImageProps = typeof __propDef.props;
export type ImageEvents = typeof __propDef.events;
export type ImageSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value: any;
        alt?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
