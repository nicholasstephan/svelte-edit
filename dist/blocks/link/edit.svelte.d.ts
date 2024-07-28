/** @typedef {typeof __propDef.props}  EditProps */
/** @typedef {typeof __propDef.events}  EditEvents */
/** @typedef {typeof __propDef.slots}  EditSlots */
export default class Edit extends SvelteComponent<{
    value?: {
        url: string;
    };
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type EditProps = typeof __propDef.props;
export type EditEvents = typeof __propDef.events;
export type EditSlots = typeof __propDef.slots;
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
