export default class WeatherObject {
    constructor(lat, lon, name, temp, min_temp, max_temp, feels_like, humidity, wind, description) {
        this.lat = lat;
        this.lon = lon;
        this.name = name;
        this.temp = parseInt(temp);
        this.min_temp = parseInt(min_temp);
        this.max_temp = parseInt(max_temp);
        this.feels_like = parseInt(feels_like);
        this.humidity = humidity;
        this.wind = parseInt(wind);
        this.description = description;
        this.id = 1000;
    }

    /** Generate image by the WeatherObject id */
    generateImage = () => this.image = './img/' + getImageByCode(this.id) + '.jpg';


    /**
     * Check if the WeatherObject should be refreshed by checking the inner params
     * @return {boolean}
     */
    shouldRefresh = () => !isNaN(this.temp) || !this.name || !isNaN(this.min_temp) || !isNaN(this.max_temp) || !isNaN(this.wind) || !this.humidity || !this.description
}

/**
 * Return the image name by the id provided
 * @param id
 * @return {string}
 */
const getImageByCode = (id) => {
    switch (true) {
        case id < 500:
            return 'storm';
        case id < 600:
            return 'rain';
        case id < 700:
            return 'snow';
        case id < 800:
            return 'mist';
        case id < 801:
            return 'clear';
        default :
            return 'clouds';
    }
}
