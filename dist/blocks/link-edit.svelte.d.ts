/** @typedef {typeof __propDef.props}  LinkEditProps */
/** @typedef {typeof __propDef.events}  LinkEditEvents */
/** @typedef {typeof __propDef.slots}  LinkEditSlots */
export default class LinkEdit extends SvelteComponent<{
    value?: {
        url: string;
    };
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type LinkEditProps = typeof __propDef.props;
export type LinkEditEvents = typeof __propDef.events;
export type LinkEditSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value?: {
            url: string;
        };
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
