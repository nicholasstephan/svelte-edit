/** @typedef {typeof __propDef.props}  InputHtmlProps */
/** @typedef {typeof __propDef.events}  InputHtmlEvents */
/** @typedef {typeof __propDef.slots}  InputHtmlSlots */
export default class InputHtml extends SvelteComponent<{
    value?: string;
    id?: string;
    focused?: boolean;
    disabled?: boolean;
    placeholder?: string;
    actions?: string[];
    classes?: any[];
}, {
    keypress: KeyboardEvent;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type InputHtmlProps = typeof __propDef.props;
export type InputHtmlEvents = typeof __propDef.events;
export type InputHtmlSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value?: string;
        id?: string;
        focused?: boolean;
        disabled?: boolean;
        placeholder?: string;
        actions?: string[];
        classes?: any[];
    };
    events: {
        keypress: KeyboardEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
