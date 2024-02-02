import * as Tone from "tone";
export const toneObject = Tone;
export const toneTransport = toneObject.Transport;
type valuetype = {
    time: number;
    note: string;
    type: Tone.Sampler
}
export const tonePart = new toneObject.Part((time, value: valuetype) => {
    value.type.triggerAttackRelease(value.note, "0.5", time);
}, []).start(0);
export const synth = new toneObject.PolySynth().toDestination();

export const guitar = new toneObject.Sampler({
    urls: {
        "F3": "F3.mp3",
        "G3": "G3.mp3",
        "A3": "A3.mp3",
        "B3": "B3.mp3",
        "C3": "C3.mp3",
        "D3": "D3.mp3",
        "E3": "E3.mp3",
        },
    release: 1,
    baseUrl: "/samples/guitar-acoustic/"
}).toDestination();

export const piano = new toneObject.Sampler({
    urls: {
        'A3': 'A3.[mp3|ogg]',
        'B3': 'B3.[mp3|ogg]',
        'C3': 'C3.[mp3|ogg]',
        'D3': 'D3.[mp3|ogg]',
        'E3': 'E3.[mp3|ogg]',
        'F3': 'F3.[mp3|ogg]',
        'G3': 'G3.[mp3|ogg]',
        },
    release: 1,
    baseUrl: "/samples/piano/"
}).toDestination();

export const frenchHorn = new toneObject.Sampler({
    urls: {
        'D3': 'D3.[mp3|ogg]',
        'F3': 'F3.[mp3|ogg]',
        'A3': 'A3.[mp3|ogg]',
    },
    release: 1,
    baseUrl: "/samples/french-horn/"
}).toDestination();

export const drums = new toneObject.Sampler({
    urls: {
        'G3': 'drums3.mp3', 
    },
    release: 1,
    baseUrl: "/samples/drum/"
}).toDestination();