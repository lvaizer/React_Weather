import React, {forwardRef, useImperativeHandle, useState} from 'react';
import SavedLocations from '../utills/SavedLocations.js';
import LocationItem from "../items/LocationItem";
import {Grid} from "@material-ui/core";

export default forwardRef((props, ref) => {

    const [, updateState] = useState(); //use to force render the element

    useImperativeHandle(ref, () => ({
        /**
         * Update the element when favorite clicked
         */
        favoriteClicked() {
            updateState([]);
        }
    }));

    /**
     * Update the element when favorite clicked
     */
    const favoriteClicked = () => updateState([]);

    return <div>
        <h5>Favorite locations</h5>
        <Grid container> {SavedLocations.get().map(weatherObject => (
            <LocationItem key={weatherObject.name}
                          weatherObject={weatherObject}
                          canBeRemoved={true}
                          showToast={props.showToast}
                          favoriteClicked={favoriteClicked}>
            </LocationItem>
        ))}</Grid>
    </div>;
})