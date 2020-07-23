import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import LocationItem from "./LocationItem";
import {Dialog} from "@material-ui/core";

export default forwardRef((props, ref) => {

    const locationFoundElement = useRef();

    const [state, setState] = useState({weatherObj: null, showModal: false});

    /**
     * Hide the modal by changing the state
     */
    const hideModal = () => setState({weatherObj: null, showModal: false});

    useImperativeHandle(ref, () => ({
        /**
         * Set the weather object to show it at the modal
         * @param weatherObj
         */
        setWeatherObj(weatherObj) {
            setState({weatherObj: weatherObj, showModal: true})
            locationFoundElement && locationFoundElement.current && locationFoundElement.current.setWeatherObj(weatherObj)
        }
    }));

    return <div>{state.weatherObj &&
    <Dialog
        open={state.showModal}
        onClose={hideModal}>
        <LocationItem key="resultsFound"
                      ref={locationFoundElement}
                      favoriteClicked={props.favoriteClicked}
                      weatherObject={state.weatherObj}
                      canBeRemoved={false}
                      showToast={props.showToast}>
        </LocationItem>
    </Dialog>}</div>;
})
