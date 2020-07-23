import WeatherObject from '../models/WeatherObject.js';

const WEATHER_APIKEY = '620df9c48870a46c19bd4f30eb0be7b5';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?appid=' + WEATHER_APIKEY + '&units=metric&';

/**
 * WeatherService is a function the responsible to get the weather data from some API and handle it
 */
function WeatherService() {

    /**
     * Get data from server request and create WeatherObject by location coordinates
     * @param latitude number
     * @param longitude number
     * @returns {Promise<WeatherObject/error>}
     */
    this.getDataByLocation = (latitude, longitude) => new Promise(resolve => {
        fetch(WEATHER_URL + 'lat=' + latitude + '&lon=' + longitude)
            .then(response => response.json())
            .then(response => resolve(handleWeatherResults(response)))
            .catch(error => resolve(error));
    });

    /**
     * Handle the results by convert them into WeatherObject
     * @param results
     * @returns {WeatherObject}
     */
    const handleWeatherResults = (results) => {
        let weatherObject;
        if (results && results.main) {
            weatherObject = new WeatherObject(results.coord.lat, results.coord.lon, results.name, results.main.temp, results.main.temp_min, results.main.temp_max, results.main.feels_like, results.main.humidity);
            if (results.wind) weatherObject.wind = results.wind.speed;
            if (results.weather && results.weather.length > 0) {
                weatherObject.description = results.weather[0].description;
                weatherObject.icon = 'http://openweathermap.org/img/wn/' + results.weather[0].icon + '.png';
                weatherObject.id = results.weather[0].id;
                weatherObject.generateImage();
            }
        } else {
            console.error(results);
        }
        return weatherObject;
    }
}

export default new WeatherService();