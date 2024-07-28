/** @typedef {typeof __propDef.props}  PageEditProps */
/** @typedef {typeof __propDef.events}  PageEditEvents */
/** @typedef {typeof __propDef.slots}  PageEditSlots */
export default class PageEdit extends SvelteComponent<{
    blocks?: any[];
    value?: any;
}, {
    change: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type PageEditProps = typeof __propDef.props;
export type PageEditEvents = typeof __propDef.events;
export type PageEditSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        blocks?: any[];
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
