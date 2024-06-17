/** @typedef {typeof __propDef.props}  LinkDisplayProps */
/** @typedef {typeof __propDef.events}  LinkDisplayEvents */
/** @typedef {typeof __propDef.slots}  LinkDisplaySlots */
export default class LinkDisplay extends SvelteComponent<{
    value: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type LinkDisplayProps = typeof __propDef.props;
export type LinkDisplayEvents = typeof __propDef.events;
export type LinkDisplaySlots = typeof __propDef.slots;
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
