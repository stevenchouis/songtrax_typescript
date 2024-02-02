import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSample, getSampleById, updateSample } from '../api/api';
import { BarContext } from "../barContext";
import { Bars } from "../components/Bars";
import { InstrumentBars } from "../components/InstrumentBars";
import Preview from "../components/Preview";
import Template from "../components/Template";
import { drums, frenchHorn, guitar, piano } from "../data/instruments";
import { TypeContext } from "../typeContext";

/**
 * EdisSample compoents represents the edit sample page that allows users to add/create a new song sample.
 * @param {object} toneObject The tone object.
 * @param {object} toneTransport The tone transport object.
 * @param {object} tonePart The tone part object. 
 * @returns The content that need to be shown on the edit sample page.
 */
export default function EditSample({ toneObject, toneTransport, tonePart}) {
    // Get data from the URL
    const queryString = window.location.search; 
    const params = new URLSearchParams(queryString);
    const id = parseInt(params.get("id"));
    const history = useNavigate();
    const notes = ["B", "A", "G", "F", "E", "D", "C"];
    const instruments = ["Piano", "French Horn", "Guitar", "Drums"];
    const instrumentsObj = [piano, frenchHorn, guitar, drums];
    
    const initialBarsValue = [];
    for (let bar = 0; bar < 16; bar++) {
        initialBarsValue.push(false);
    }

    const initialSequence = [];
    notes.forEach((note) => {
        initialSequence.push({
            [note] : initialBarsValue
        });
    });
        
    const [sequence, setSequence] = useState(initialSequence);

    const initialPreviewing = false;
    const [previewing, setPreviewing] = useState(initialPreviewing);

    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const [enabledTypeIndex, setTypeIndex] = useState(0);

    const [isSaving, setIsSaving] = useState(false);

    /**
     * Fetches the sample by its ID if it's not a new post.
     * Sets the local states with the fetched data.
     */    
    useEffect(() => {
        const fetchSample = async () => {
            const data = await getSampleById(id);            
            setSequence(JSON.parse(data.recording_data));
            setInputValue(data.name);
            let index = instruments.findIndex((instrument) => instrument === data.type);
            setTypeIndex(index);
        };

        if (id) {
            fetchSample();
        }
    }, [id]);

    /**
     * Add toneEvent to tonePart if the bar is enabled.
     */
    useEffect(() => {
        tonePart.clear();
        toneTransport.cancel();

        sequence.forEach(bars => {
            Object.entries(bars).forEach(([note, barValues]) => { 
                barValues.forEach((value, index) =>{
                    if (value) {
                        // if (index > maxIndex) {
                           
                        //     setMaxIndex(index);
                        // }
                        tonePart.add({time: index / 2, note: note + "3", type: instrumentsObj[enabledTypeIndex]});
                    }
                });
            });
        });
    }, [sequence, enabledTypeIndex]);

    /**
     * Set the Preview (playback) after 8 seconds. 
     */
    useEffect(() => {
        toneTransport.schedule(time => {
            setPreviewing(false);
            console.log("Preview stopped automatically.");
        }, 16/2);
    }, [previewing]);

    /**
     * Update/Create a sample when the button is clicked.
     * @param {object} e The event object.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSaving(true);  // Set loading to true when save starts
        
        // Update the sample if id is exist, otherwise create a new sample.
        try {
            if (id) {
                await updateSample(id, inputValue, instruments[enabledTypeIndex], sequence);
                history(`/editSample/?id=${id}`);
            } else {
                const returnedJson = await createSample(inputValue, instruments[enabledTypeIndex], sequence);
                history(`/editSample/?id=${returnedJson.id}`);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSaving(false);  // Set loading to false when save is complete
        }
    };

    return (
        <Template title="Editing This Sample:">
            <form className="card edit-card"  onSubmit={handleSubmit}>
                <input type="text" defaultValue={inputValue} value={inputValue} onChange={handleInputChange}></input>
                <div className="button-group-container">
                    <Preview previewing={previewing} setPreviewing={setPreviewing} toneObject={toneObject} toneTransport={toneTransport}/>
                    <button type="submit" className="bright-button">
                        {isSaving ? <div className="spinner"></div> : 'Save'}
                    </button>
                </div>
            </form>

            <div className="toggle-row-container">
                <div className="row-label">
                    <h4>Type</h4>
                </div>
                <div className="sequence-row-container">
                    <TypeContext.Provider value={[instruments, instruments[enabledTypeIndex]]}>
                        <InstrumentBars key={"instrumentBars"} setTypeIndex={setTypeIndex} />
                    </TypeContext.Provider>
                </div>
            </div>

            {notes.map((note, index) => 
                <div className="toggle-row-container">
                    <div className="row-label">
                        <h4>{note}</h4>
                    </div>
                    <BarContext.Provider value={instrumentsObj[enabledTypeIndex]}>
                        <Bars key={note} sequence={sequence} bars={sequence[index][note]} setSequence={setSequence} toneObject={toneObject} note={note} barRow={index} />
                    </BarContext.Provider>
                </div>
            )}
        </Template>
    );

}