import React, {useRef} from 'react';
import CurrentLocation from '../elements/CurrentLocation.js';
import {Container} from '@material-ui/core/';
import FavoriteLocations from "../elements/FavoriteLocations";
import SearchBar from "../items/SearchBar";
import LocationFound from '../items/LocationFound.js';
import ToastElement from "../items/ToastElement";

export default () => {

    //creating ref elements to pass functions between them from this element
    const favoriteLocationsElementRef = useRef();
    const locationFoundElementRef = useRef();
    const toastElementRef = useRef();

    /**
     * Show a toast message - forward the action to the ref of the toast element
     * @param show boolean
     * @param message string - optional (default val is empty string
     */
    const showToast = (show, message: '') => toastElementRef && toastElementRef.current.forceShowToast(show, message);

    /**
     * Pass the favorite click action to the relevant ref element
     */
    const favoriteClicked = () => favoriteLocationsElementRef && favoriteLocationsElementRef.current.favoriteClicked();

    /**
     * Pass weather object to the relevant ref element
     * @param weatherObj
     */
    const onLocationFound = (weatherObj) => locationFoundElementRef && locationFoundElementRef.current && locationFoundElementRef.current.setWeatherObj(weatherObj);


    return <Container>
        <SearchBar onLocationFound={onLocationFound}/>
        <ToastElement ref={toastElementRef}/>
        <LocationFound
            ref={locationFoundElementRef}
            favoriteClicked={favoriteClicked}
            showToast={showToast}/>
        <CurrentLocation
            favoriteClicked={favoriteClicked}
            showToast={showToast}
            canBeRemoved={false}/>
        <FavoriteLocations ref={favoriteLocationsElementRef}
                           showToast={showToast}/>
    </Container>;
}