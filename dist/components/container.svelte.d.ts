/** @typedef {typeof __propDef.props}  ContainerProps */
/** @typedef {typeof __propDef.events}  ContainerEvents */
/** @typedef {typeof __propDef.slots}  ContainerSlots */
export default class Container extends SvelteComponent<{
    blocks?: any[];
    value?: any[];
    editable?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ContainerProps = typeof __propDef.props;
export type ContainerEvents = typeof __propDef.events;
export type ContainerSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        blocks?: any[];
        value?: any[];
        editable?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
