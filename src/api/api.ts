import fetch from 'node-fetch';

const APIKEY: string = 'XZc2WNWN7i';
const BASEURL: string = 'https://comp2140.uqcloud.net/api/';

/**
 * Fetches all samples from the API.
 * @returns {Promise} - Promise resolving to an array of all samples.
 */
export async function getSamples(): Promise<any> {
    const url: string = `${BASEURL}sample/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

/**
 * Fetches a single sample by ID.
 * @param {string} id - The ID of the sample.
 * @returns {Promise} - Promise resolving to the sample object.
 */
export async function getSampleById(id: string): Promise<any> {
    const url = `${BASEURL}sample/${id}/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

/**
 * Creates a new sample.
 * @param {string} name The name of the sample.
 * @param {string} type The type of the instrument.
 * @param {string} recording_data The sequence data. 
 * @returns {Promise} - Promise resolving to the created sample object.
 */
export async function createSample(name: string, type: string, recording_data: string): Promise<any> {
    const url = `${BASEURL}sample/?api_key=${APIKEY}`;

    const currentDate = new Date(Date.now());
    const data = {
        'type': type, 
        'name': name, 
        'recording_data': JSON.stringify(recording_data),
        'api_key': APIKEY,
        'dateTime': currentDate.toString(),
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
  });
  const json = await response.json();
  return json;
}

/**
 * Updates an existing sample by ID.
 * @param {string} id - The ID of the sample.
 * @param {string} name The name of the sample.
 * @param {string} type The type of the instrument.
 * @param {string} recording_data The sequence data. 
 * @returns {Promise} - Promise resolving to the updated sample object.
 */
export const updateSample = async (id: string, name: string, type: string, recording_data: string): Promise<any> => {
    const url = `${BASEURL}sample/${id}/?api_key=${APIKEY}`;
    const currentDate = new Date(Date.now());
    const data = {
        'type': type, 
        'name': name, 
        'recording_data': JSON.stringify(recording_data),
        'api_key': APIKEY,
        'dateTime': currentDate.toString(),
    }

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
  return response.json();
};

/**
 * Fetches all locations from the API.
 * @returns Promise resolving to an array of all locations.
 */
export async function getLocations(): Promise<any> {
    const url = `${BASEURL}location/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

/**
 * Fetches all sampleToLocations from the API.
 * @returns Promise resolving to an array of all sampleToLocation. 
 */
export async function getSampleToLocations(): Promise<any> {
    const url = `${BASEURL}sampletolocation/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

/**
 * Creates a new sampleToLocation.
 * @param {string} sampleID The ID of the sample.
 * @param {string} locationID The ID of the location.
 * @returns Promise resolving to the created sampleToLocation object.
 */
export async function createSampleToLocation(sampleID: string, locationID: string): Promise<any> {
    const url = `${BASEURL}sampletolocation/?api_key=${APIKEY}`;

    const data = {
                    'api_key': APIKEY,
                    'sample_id': sampleID, 
                    'location_id': locationID,
                }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
  });
  const json = await response.json();
  console.log(json);
  return json.id;
}

/**
 * Delete a single sampleToLocation by ID.
 * @param {string} id The ID of the sampleToLocation to be deleted.
 */
export async function deleteSampleToLocation(id: string) {
    const url = `${BASEURL}sampletolocation/${id}/?api_key=${APIKEY}`;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
};