import { useContext } from "react";
import { BarContext } from "../barContext";
import { toneObject } from "../data/instruments";
import { Bar } from "./Bar";

/**
 * Represents 16 Bar component.
 * @param {string[]} sequence The sequence of notes contain 7 notes (B, A, G, F, E, D, C) split into 16 bars. 
 * @param {string[]} bars The array of 16 bars of the note.
 * @param {function} setSequence The function to set the sequence. 
 * @param {object} toneObject The tone object.
 * @param {string} note The note to be played. 
 * @param {integer} barRow The row of the bar.
 * @returns 16 Bar components representing 16 bars. 
 */

type barsProps = boolean[] ;
type barProps = { note: barsProps } ;
type seqType = barProps[];
interface BarsProps {
    sequence: seqType;
    bars: boolean[];
    setSequence: (seq: seqType) => void;
    toneObject: typeof toneObject;
    note: keyof barProps;
    barRow: number
}


export function Bars({ sequence, bars, setSequence, toneObject, note, barRow}: BarsProps ) {
    const type = useContext(BarContext);

    /**
     * Play the respective note of the instrument when Bar is pressed, reset the sequence.
     * @param {boolean} bar The true/false value of whether the bar is pressed or not.
     * @param {integer} index The index of the bar.
     */
    function handleBarClick(bar: boolean, index: number) {
        const now = toneObject.now();
        type.triggerAttackRelease(note+"3", "0.5", now);
        let localSequence = [...sequence];
        let barValues = [...localSequence[barRow][note]];
        barValues[index] = !bar;
        localSequence[barRow][note] = barValues;
        setSequence(localSequence);
    }

    return bars.map((bar, index) => <Bar key={`${note}-${index}`} barID={index} barEnabled={bar} handleBarClick={() => handleBarClick(bar, index)} />);
}