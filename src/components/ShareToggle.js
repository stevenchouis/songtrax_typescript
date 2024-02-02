import React, {useState} from "react";
import{createSampleToLocation, deleteSampleToLocation} from '../api/api';

/**
 * ShareToggle Component: The Share and NotShare buttons. 
 * @param {boolean} sharingStatus The sharing status.
 * @param {integer} sampleID The sample ID.
 * @param {integer} locationID The location ID.
 * @param {integer} sampleToLocationID The sample to location ID.
 * @returns Share and NotShare buttons.
 */
export default function ShareToggle({sharingStatus, sampleID, locationID, sampleToLocationID}) {
    const [sharing, setSharing] = useState(sharingStatus);
    const [sampleLocationID, setSampleLocationID] = useState(sampleToLocationID);

    let shareClass = "toggle";
    let notSharedClass = "toggle-selected";

    if (sharing) {
        shareClass = "toggle-selected";
        notSharedClass = "toggle";
    }

    /**
     * Toggle the classname of Share and NotShared buttons, update the sharing state, 
     * and create/delete sampleToLocation data when the button is clicked.
     */
    async function handleButtonClick() {
        if (sharing) {
            shareClass = "toggle-selected";
            notSharedClass = "toggle";
            setSharing(false);
            deleteSampleToLocation(sampleLocationID, sampleID, locationID);
        } else {
            shareClass = "toggle";
            notSharedClass = "toggle-selected";
            setSharing(true);
            setSampleLocationID(await createSampleToLocation(sampleID, locationID));
        }
    }

    return (
        <div className="sequence-row-container">
            <button className={shareClass} onClick={handleButtonClick}>Share</button>
            <button className={notSharedClass} onClick={handleButtonClick}>Not Shared</button>
        </div>
    );
}