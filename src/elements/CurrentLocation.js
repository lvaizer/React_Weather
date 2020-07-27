import React, {useState, useEffect} from 'react';
import LocationItem from "../items/LocationItem";
import WeatherObject from '../models/WeatherObject.js';

export default (props) => {

    const [weatherObject, setWeatherObject] = useState();   //current weather object
    const [show, setShow] = useState(true); //show or hide this view

    //Trigger getCurrentPosition when the item first rendered
    useEffect(() => {
        getCurrentPosition().then();
    },[]);

    /**
     * Set the weatherObject position object from latitude and longitude
     * @param latitude number
     * @param longitude number
     * **/
    const setCurrentLocation = (latitude, longitude) => setWeatherObject(new WeatherObject(latitude, longitude));

    /**
     * Show alert request for the device's current position.
     * <br>Success - the current location will set.
     * <br>Error or decline - will remove the current location view from the user
     * @returns {Promise<void>}
     */
    const getCurrentPosition = async () => {
        navigator.geolocation.getCurrentPosition(
            //while receiving the current device's position pass the latitude and the longitude to set them as the WeatherObject attrs.
            position => setCurrentLocation(position.coords.latitude, position.coords.longitude),
            //while decline or some other error, hide the "current location" element from the user.
            err => {
                console.error(err);
                setShow(false);
            }
        );
    };

    return show ? <div><h5>Current location</h5>{weatherObject &&
    <LocationItem
        key="myLocation"
        weatherObject={weatherObject}
        favoriteClicked={props.favoriteClicked}
        showToast={props.showToast}>
    </LocationItem>
    }
    </div> : <></>;
}