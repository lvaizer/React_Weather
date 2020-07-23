import WeatherObject from '../models/WeatherObject.js';

/**
 * SavedLocations is a function that responsible to handle the weather objects integration with the local storage
 */
function SavedLocations() {

    /**
     * Get the WeatherObjects that stored at the local storage
     * @returns {[]} of WeatherObjects
     */
    const getWeatherObjectsFromLocalStorage = () => {
        const weatherObjects = [];
        //Check if locations are stored at the localStorage
        if (!localStorage.getItem('locations')) return weatherObjects;
        //Parse the saved locations to Json objects
        const storedLocations = JSON.parse(localStorage.getItem('locations'));
        //Create new WeatherObject for each of the stored objects and push them into array
        storedLocations.forEach(function (storedLocation) {
            weatherObjects.push(Object.assign(new WeatherObject(), storedLocation))
        });
        return weatherObjects;
    };

    /**
     * Initialize the local weatherObjects from the local storage
     */
    const weatherObjects = getWeatherObjectsFromLocalStorage();

    /**
     * Save the local weatherObjects at the localStorage
     */
    const saveLocations = () => localStorage.setItem('locations', JSON.stringify(weatherObjects));

    /**
     * Add a weatherObj to the local storage
     * @param weatherObj
     */
    this.add = (weatherObj) => {
        weatherObj && weatherObjects.push(weatherObj);
        saveLocations();
    };

    /**
     * Remove a weatherObj from the local storage
     * @param weatherObj
     */
    this.remove = (weatherObj) => {
        if (!weatherObj) return
        //Get the index of the object by name
        const index = weatherObjects.indexOf(weatherObjects.filter(location => location.name === weatherObj.name)[0]);
        //Return if the object not found
        if (index === -1) return;
        //Cut the object from the local weatherObjects
        weatherObjects.splice(index, 1);
        saveLocations();
    };

    /**
     * Get the WeatherObjects that stored at the local storage
     * @returns {[]} of WeatherObjects
     */
    this.get = () => weatherObjects;

    /**
     * Check if the given weatherObj is stored at the local storage
     * @param weatherObj
     * @returns {boolean}
     */
    this.isSaved = (weatherObj) => {
        if (!weatherObj) return false;
        return weatherObjects.filter(location => location.name === weatherObj.name).length > 0
    }

}

export default new SavedLocations();