import {useContext} from "react";
import { TypeContext } from "../typeContext";

/**
 * IntrumentBar component: represents a instrument type. 
 * @param {string} instrument The instrument type.
 * @param {function} handleBarClick The callback function to be called when the IntrumentBar is clicked.
 * @returns The button representing the instrument.
 */
export function InstrumentBar({ instrument, handleBarClick }) {
    const [instruments, enabledType] = useContext(TypeContext);

    /**
     * Toggle the class name of the bar.
     * @returns the class name to be set to the button for the bar.
     */
    function barSelected() {
        if (instrument === enabledType) {
            return "toggle-selected";
        }
        return "toggle";
    }

    return (
        <button className={`bar bar-${instrument} ${barSelected()}`} onClick={handleBarClick}>{instrument}</button>
    );
}