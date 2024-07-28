/** @typedef {typeof __propDef.props}  DisplayProps */
/** @typedef {typeof __propDef.events}  DisplayEvents */
/** @typedef {typeof __propDef.slots}  DisplaySlots */
export default class Display extends SvelteComponent<{
    [x: string]: never;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type DisplayProps = typeof __propDef.props;
export type DisplayEvents = typeof __propDef.events;
export type DisplaySlots = typeof __propDef.slots;
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
