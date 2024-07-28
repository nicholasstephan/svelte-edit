/** @typedef {typeof __propDef.props}  PageDisplayProps */
/** @typedef {typeof __propDef.events}  PageDisplayEvents */
/** @typedef {typeof __propDef.slots}  PageDisplaySlots */
export default class PageDisplay extends SvelteComponent<{
    blocks?: any[];
    value?: any[];
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type PageDisplayProps = typeof __propDef.props;
export type PageDisplayEvents = typeof __propDef.events;
export type PageDisplaySlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        blocks?: any[];
        value?: any[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
