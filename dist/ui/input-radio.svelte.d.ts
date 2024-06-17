/** @typedef {typeof __propDef.props}  InputRadioProps */
/** @typedef {typeof __propDef.events}  InputRadioEvents */
/** @typedef {typeof __propDef.slots}  InputRadioSlots */
export default class InputRadio extends SvelteComponent<{
    value?: any;
    options?: any[];
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type InputRadioProps = typeof __propDef.props;
export type InputRadioEvents = typeof __propDef.events;
export type InputRadioSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value?: any;
        options?: any[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
