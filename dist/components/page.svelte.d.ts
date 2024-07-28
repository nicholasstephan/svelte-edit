/** @typedef {typeof __propDef.props}  PageProps */
/** @typedef {typeof __propDef.events}  PageEvents */
/** @typedef {typeof __propDef.slots}  PageSlots */
export default class Page extends SvelteComponent<{
    blocks?: any[];
    value?: any[];
    editable?: boolean;
}, {
    change: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type PageProps = typeof __propDef.props;
export type PageEvents = typeof __propDef.events;
export type PageSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        blocks?: any[];
        value?: any[];
        editable?: boolean;
    };
    events: {
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
