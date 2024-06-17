/** @typedef {typeof __propDef.props}  MetadataProps */
/** @typedef {typeof __propDef.events}  MetadataEvents */
/** @typedef {typeof __propDef.slots}  MetadataSlots */
export default class Metadata extends SvelteComponent<{
    [x: string]: never;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type MetadataProps = typeof __propDef.props;
export type MetadataEvents = typeof __propDef.events;
export type MetadataSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: never;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
