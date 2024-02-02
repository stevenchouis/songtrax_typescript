import React from "react";

/**
 * Preview component: The preview button. Click to activate playback.
 * @param {boolean} previewing The previewing status. 
 * @param {function} setPreviewing The function to set the previewing status.
 * @param {object} toneObject The tone object.
 * @param {object} toneTransport The tone transport object.
 * @returns The preview button.
 */
export default function Preview({ previewing, setPreviewing, toneObject, toneTransport }) {
    /**
     * Activate the playback and update the previewing state.
     */
    function handleButtonClick() {
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