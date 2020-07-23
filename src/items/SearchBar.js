import React, {useState} from 'react';
import {TextField} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import WeatherObject from '../models/WeatherObject.js';
import {debounce, isEqual, isEmpty} from 'lodash';

const SEARCH_URL = 'https://places-dsn.algolia.net/1/places/query';

export default (props) => {

    const [results, setResults] = useState([]);

    /**
     * Trigger search on key up
     * @param e
     */
    const handleKeyUp = (e) => search(e.target.value);

    /**
     * Create search request with the query provided.
     * <br>*This function runs on debounce (after 500 ms)
     * @param query
     */
    const search = debounce((query) => {
        if (!query || query.trim().length === 0) return;
        fetch(SEARCH_URL, {
            method: 'POST',
            body: JSON.stringify({
                "query": query,
                "type": "city",
                "language": "en"
            })
        })
            .then(response => response.json())
            .then(response => handleResults(response))
            .catch(error => console.error(error));
    }, 500);

    /**
     * Check and filter the results returned from the server
     * @param results
     */
    const handleResults = (results) => {
        if (!results.hits) return;
        // Render the UI by clearing the results
        setResults([]);
        const data = [];
        //Make sure the results matches the search query
        results.hits.forEach(function (hit) {
            hit.locale_names[0].toLowerCase().includes(results.query.toLowerCase()) && data.push({
                name: hit.locale_names[0],
                lat: hit._geoloc.lat,
                lon: hit._geoloc.lng
            });
        });
        // Render the UI by setting the results
        setResults(data);
    };

    /**
     * Handle the item clicked by getting the selected object from the results by his name,
     * creating new WeatherObject from it and send it to the parent onLocationFound function to handle it
     * @param e
     */
    const resultsItemClicked = (e) => {
        //Get the selected Object from the results
        const selectedObjects = getResultItemByName(e.target.textContent);
        if (isEmpty(selectedObjects)) return;
        // Create new WeatherObject from the selected object
        const weatherObject = new WeatherObject(selectedObjects[0].lat, selectedObjects[0].lon, selectedObjects[0].name);
        // Send the WeatherObject to the parent function
        props.onLocationFound(weatherObject);
        // Render the UI by clearing the results
        setResults([]);
    }

    /**
     * Get array of objects which matched the name provided
     * @param name
     * @return {*[]}
     */
    const getResultItemByName = (name) => results.filter((item) => isEqual(item.name, name));

    return <div>
        <Autocomplete
            freeSolo
            onInputChange={handleKeyUp}
            onChange={resultsItemClicked}
            options={results.map((item) => item.name)}
            renderInput={(params) => (
                <TextField {...params} label="Search location" margin="normal"
                           variant="outlined"/>
            )}
        />
    </div>;
}