/** @typedef {typeof __propDef.props}  ParagraphDisplayProps */
/** @typedef {typeof __propDef.events}  ParagraphDisplayEvents */
/** @typedef {typeof __propDef.slots}  ParagraphDisplaySlots */
export default class ParagraphDisplay extends SvelteComponent<{
    value: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ParagraphDisplayProps = typeof __propDef.props;
export type ParagraphDisplayEvents = typeof __propDef.events;
export type ParagraphDisplaySlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
