import { useEffect, useState } from "react";
import { drums, frenchHorn, guitar, piano } from "../data/instruments";

/**
 * ListPreview component: The preview button. Click to add toneEvent to tonePart and activate playback.
 * @param {object} toneObject The tone object.
 * @param {object} toneTransport The tone transport object.
 * @param {object} tonePart The tone part object.
 * @param {array} sequence The sequence of notes contain 7 notes (B, A, G, F, E, D, C) split into 16 bars. 
 * @param {string} type The type of instrument.
 * @returns The preview button.
 */
export default function ListPreview({toneObject, toneTransport, tonePart, sequence, type}) {
    const instrumentsObj = {
        "Piano": piano, 
        "French Horn": frenchHorn, 
        "Guitar": guitar, 
        "Drums": drums,
    };
    
    const [previewing, setPreviewing] = useState(false);

    /**
     * Set the Preview (playback) after 8 seconds. 
     */
    useEffect(() => {
        toneTransport.schedule(time => {
            setPreviewing(false);
            console.log("Preview stopped automatically.");
        // }, (maxIndex + 1)/2);
        }, 16/2);
    }, [previewing]);

    /**
     * Add toneEvent to tonePart.
     */
    function addTonePart() {
        tonePart.clear();
        toneTransport.cancel();

        sequence.forEach(bars => {
            Object.entries(bars).forEach(([note, barValues]) => { 
                barValues.forEach((value, index) =>{
                    if (value) {
                        tonePart.add({time: index / 2, note: note + "3", type: instrumentsObj[type]});
                    }
                });
            });
        });
    }

    /**
     * Activate the playback and update the previewing state.
     */
    function handleButtonClick() {
        addTonePart();
        toneObject.start();
        toneTransport.stop();

        if (previewing) {
            setPreviewing(false);
            console.log("Preview stopped manually.");
        } else {
            setPreviewing(true);
            console.log("Preview started.");
            toneTransport.start();
        }
    }

    return <button type="button" onClick={handleButtonClick}>{previewing ? "Stop Previewing" : "Preview"}</button>;
}