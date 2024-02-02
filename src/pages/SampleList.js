import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSampleToLocations, getSamples } from '../api/api';
import PreviewAddTonePart from "../components/PreviewAddTonePart";
import Template from "../components/Template";
// import { toneObject, tonePart, toneTransport } from "../data/instruments";

/**
 * SampleList compoents represents the sample list page that allows users to display all the song samples.
 * @param {object} toneObject The tone object.
 * @param {object} toneTransport The tone transport object.
 * @param {object} tonePart The tone part object. 
 * @returns The content that need to be shown on the sample list page.
 */
// interface SampleProps {
//     toneObject: typeof toneObject;
//     toneTransport : typeof toneTransport;
//     tonePart: typeof tonePart;
// }
export default function SampleList({ toneObject, toneTransport, tonePart}) {
    const [samples, setSamples] = useState([]);
    const [sampleToLocations, setSampleToLocations] = useState([]);
    
    /**
     * Fetches all the samples and sampleToLocation.
     * Sets the local states with the fetched data.
     */
    useEffect(() => {
        const fetchSample = async () => {
            const data = await getSamples();
            setSamples(data);
        };
        fetchSample();

        const fetchSampleToLocations = async () => {
            const data = await getSampleToLocations();
            setSampleToLocations(data);
        };
        fetchSampleToLocations();
    }, []);

    /**
     * Filter the sampleToLocations data by sampleID. 
     * Only remains the data if the sampleID in sampleToLocations data matched the specific sampleID. 
     * @param {integer} sampleID 
     * @returns 
     */
    function filterSampleToLocations(sampleID) {
        let filteredSamples = sampleToLocations.filter((sample) => 
            sample.sample_id === sampleID
        );
        return filteredSamples;
    }

    return (
        <Template title="Your Songs Samples">
            <div className="create-card">
                <Link to="/editSample" className="full-button">Create Sample</Link>
            </div>
            
            {/* Show all the samples in the API */}
            {samples.map((sample) => (
                <section className="sample">
                    <div className="card">
                        <div className="song-details">
                            <h3>{sample.name}</h3>
                            <p>{sample.datetime}</p>
                        </div>
                        <div className="button-group-container">
                            <Link to={`/shareSample/?id=${sample.id}&name=${sample.name}&datetime=${sample.datetime}&sequence=${sample.recording_data}&type=${sample.type}&sampletolocation=${JSON.stringify(filterSampleToLocations(sample.id))}`}>{filterSampleToLocations(sample.id).length !== 0 ? "Shared" : "Share"}</Link>
                            <PreviewAddTonePart sequence={JSON.parse(sample.recording_data)} type={sample.type} toneObject={toneObject} toneTransport={toneTransport} tonePart={tonePart}/>
                            <Link to={`/editSample/?id=${sample.id}`} className="bright-button">Edit</Link>
                        </div>
                    </div>
                </section>
            ))}

            <div className="create-card">
                <Link to="/editSample" className="full-button">Create Sample</Link>
            </div>
        </Template>
    );
    
}