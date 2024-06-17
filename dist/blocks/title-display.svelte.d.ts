/** @typedef {typeof __propDef.props}  TitleDisplayProps */
/** @typedef {typeof __propDef.events}  TitleDisplayEvents */
/** @typedef {typeof __propDef.slots}  TitleDisplaySlots */
export default class TitleDisplay extends SvelteComponent<{
    value: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type TitleDisplayProps = typeof __propDef.props;
export type TitleDisplayEvents = typeof __propDef.events;
export type TitleDisplaySlots = typeof __propDef.slots;
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
