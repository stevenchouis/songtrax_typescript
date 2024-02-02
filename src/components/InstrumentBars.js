import React from "react";
import { InstrumentBar } from "./InstrumentBar";
import { TypeContext } from "../typeContext";
import { useContext } from "react";

/**
 * InstrumentBars component: Contains 4 IntrumentBar components represents 4 types of instrument.
 * @param {function} setTypeIndex The function to set the typeIndex state.
 * @returns 4 IntrumentBar components.
 */
export function InstrumentBars({ setTypeIndex }) {
    const [instruments, enabledType] = useContext(TypeContext);

    /**
     * Set the index of the instrument type when the instrument bar is clicked. 
     * @param {string} instrument The instrument type.
     */
    function handleBarClick(instrument) {
        setTypeIndex(instruments.findIndex((_instrument) => _instrument === instrument));
    }

    return instruments.map(instrument => 
        <InstrumentBar key={instrument} instrument={instrument} handleBarClick={() => handleBarClick(instrument)} />
    );
}