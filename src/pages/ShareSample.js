import React, {useState, useEffect} from "react";
import Template from "../components/Template";
import ShareToggle from "../components/ShareToggle";
import PreviewAddTonePart from "../components/PreviewAddTonePart";
import{getLocations} from '../api/api';

/**
 * ShareSample compoents represents the share sample page. 
 * It allow the user to preview the sample and display all the available locations that allows users to toggle whether the song sample is shared.
 * @param {object} toneObject The tone object.
 * @param {object} toneTransport The tone transport object.
 * @param {object} tonePart The tone part object. 
 * @returns The content that need to be shown on the sample list page.
 */
export default function ShareSample({ toneObject, toneTransport, tonePart}) {
    const queryString = window.location.search; 
    const params = new URLSearchParams(queryString);
    const id = parseInt(params.get("id"));
    const sequence = JSON.parse((params.get("sequence")));
    const name = params.get("name");
    const type = params.get("type");
    const datetime = params.get("datetime");
    const sampleToLocations = JSON.parse((params.get("sampletolocation")));
    const [locations, setLocations] = useState([]);
    
    /**
    * Fetches the location.
    * Sets the local state with the fetched data.
    */
    useEffect(() => {
        const fetchSample = async () => {
            const data = await getLocations();
            setLocations(data);
        };
        fetchSample();
    }, []);

    /**
     * Check whether the location is existed in the sampleToLocation API.
     * @param {integer} locationID 
     * @returns The object of the sampleToLocation data if it exis, return undefined if it's not found.
     */
    function sharedLocation(locationID) {
        let shaedLocation = sampleToLocations.find((sample) => sample.location_id === locationID);
        return shaedLocation;
    }

    return (
        <Template title="Share This Sample">
            <div className="card">
                <div className="song-details">
                    <h3>{name}</h3>
                    <p>{datetime}</p>
                </div>
                <div className="buttons">
                    <PreviewAddTonePart sequence={sequence} type={type} toneObject={toneObject} toneTransport={toneTransport} tonePart={tonePart}/>
                </div>
            </div>
            
            {/* Show the list of locations if 'sharing' is true */}
            {locations.filter((location) => location.sharing === true).map((location) => (
                <div className="toggle-row-container">
                    <div className="location-name-label">
                        <h4>{location.name}</h4>
                    </div>
                    <ShareToggle sharingStatus={sharedLocation(location.id) !== undefined ? true : false} sampleID={id} locationID={location.id} sampleToLocationID={sharedLocation(location.id) !== undefined ? sharedLocation(location.id).id : null}/>
                </div>
            ))}
        </Template>
    );
}