/** @typedef {typeof __propDef.props}  ParagraphEditProps */
/** @typedef {typeof __propDef.events}  ParagraphEditEvents */
/** @typedef {typeof __propDef.slots}  ParagraphEditSlots */
export default class ParagraphEdit extends SvelteComponent<{
    value?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ParagraphEditProps = typeof __propDef.props;
export type ParagraphEditEvents = typeof __propDef.events;
export type ParagraphEditSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
