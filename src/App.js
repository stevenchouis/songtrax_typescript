import SampleList from "./pages/SampleList";

/**
 * The App component to show the content of the main page (SampleList).
 * @param {object} toneObject The tone object.
 * @param {object} toneTransport The tone transport object.
 * @param {object} tonePart The tone part object.
 * @returns the content of SampleList.
 */
function App({ toneObject, toneTransport, tonePart}) {
  return (
    <SampleList toneObject={toneObject} toneTransport={toneTransport} tonePart={tonePart}/>
  );
}

export default App;
