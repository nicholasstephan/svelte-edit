/** @typedef {typeof __propDef.props}  EmbedProps */
/** @typedef {typeof __propDef.events}  EmbedEvents */
/** @typedef {typeof __propDef.slots}  EmbedSlots */
export default class Embed extends SvelteComponent<{
    [x: string]: never;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type EmbedProps = typeof __propDef.props;
export type EmbedEvents = typeof __propDef.events;
export type EmbedSlots = typeof __propDef.slots;
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
