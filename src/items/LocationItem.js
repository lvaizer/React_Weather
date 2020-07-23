import React, {useState, useEffect, forwardRef, useImperativeHandle} from "react";
import styles from './css/LocationItem.module.css'
import SavedLocations from "../utills/SavedLocations";
import WeatherService from "../utills/WeatherService";
import {Animate} from "react-simple-animate";
import {capitalize} from 'lodash';
import {
    Tooltip,
    Grid,
    Card,
    CardContent,
    Typography,
    CardMedia,
    CircularProgress
} from '@material-ui/core'

export default forwardRef((props, ref) => {

    const [, forceRender] = useState();
    const [hide, setHide] = useState(false);
    const [loading, setLoading] = useState(false);
    const [weatherObject, setWeatherObject] = useState(props.weatherObject);
    let isInFavorites = SavedLocations.isSaved(weatherObject);
    let errorMessage = null;

    // useEffect(() => {
    //     // Update the document title using the browser API
    //     refreshObject();
    // }, []);

    useImperativeHandle(ref, () => ({
        setWeatherObj(location) {
            isInFavorites = SavedLocations.isSaved(location);
            setWeatherObject(location);
            refreshObject()
        }
    }));

    /**
     * Refresh the current Weather Object
     */
    const refreshObject = () => (weatherObject && weatherObject.shouldRefresh()) && refreshClicked();

    /**
     * Responsible to handle element "favorite clicked" by:
     * - changing the view
     * - add the item to the local storage
     * - notify parent
     */
    const favoriteClicked = () => {
        //Check if the current object is already saved at the local storage
        const isLocationSaved = SavedLocations.isSaved(weatherObject);
        //Add or remove the current object from the local storage by his status
        isLocationSaved ? SavedLocations.remove(weatherObject) : SavedLocations.add(weatherObject);
        //Update the local variable if the object is marked as favorite
        isInFavorites = !isLocationSaved
        //Hide or show the item if he is saved and if he can be hidden
        setHide(isLocationSaved && props.canBeRemoved);
        //Create toast message by the relevant status
        const toastMessage = 'The location' + ((weatherObject && typeof weatherObject.name !== "undefined") ? ('"' + weatherObject.name + '"') : '') + ' was ' + (!isLocationSaved ? 'added' : 'removed') + ' successfully';
        if (props.canBeRemoved && isLocationSaved) {
            //whit the hide animation to end
            setTimeout(() => {
                showToastAndNotifyFavoriteClicked(toastMessage)
            }, 200);
        } else {
            //force rendering
            forceRender([]);
            showToastAndNotifyFavoriteClicked(toastMessage)

        }
    }

    /**
     * Show toast message and notify parent that favorite button has clicked
     * @param message
     */
    const showToastAndNotifyFavoriteClicked = (message) => {
        //show the toast message
        showToast(message);
        //notify parent the favorite button clicked
        props.favoriteClicked && props.favoriteClicked();
    }

    /**
     * Notify parent to show toast
     * @param message
     */
    const showToast = (message) => props.showToast && props.showToast(true, message);

    /**
     * Handle refresh button click by:
     * - update the UI on loading
     * - create new server request to get the updated data
     * - show the new data at the UI
     */
    const refreshClicked = () => {
        //update the UI on loading
        setLoading(true);
        //create new server request to get the updated data
        getLocationWeather(weatherObject.lat, weatherObject.lon)
            .then(data => {
                data && Object.assign(weatherObject, data);
                errorMessage = data ? null : true
                hideLoading(!data)
            })
            .catch(error => {
                console.error(error)
                hideLoading(true)
            });
    }

    /**
     * Hide the loading element and render
     * @param showError boolean
     */
    const hideLoading = (showError) => {
        setLoading(false);
        showError && showToast('Error occurred, please try again later.');
    }

    /**
     * Create server request to get the location weather
     * @param latitude
     * @param longitude
     * @return {Promise<data>}
     */
    const getLocationWeather = (latitude, longitude) => new Promise(resolve => {
        WeatherService.getDataByLocation(latitude, longitude)
            .then(data => resolve(data))
            .catch(error => {
                console.error(error)
                resolve(error);
            });
    })

    const getLoadingHTML = () => (
        <Card style={{width: '18rem', alignItems: 'center'}}
              className={styles.card}>
            <CircularProgress disableShrink/>
        </Card>);

    const getErrorHTML = () => (<Card style={{width: '18rem', alignItems: 'center'}}
                                      className={styles.card}>
        <div className={styles.favorite_div}>
            <img alt="refresh button" src="./img/refresh.svg"
                 onClick={refreshClicked}/>
        </div>
        <Card.Title>There is a temporary error, please try again later</Card.Title>
    </Card>);

    const getAnimationStart = () => ({
        opacity: hide ? 1 : 0,
        transform: hide ? 'scale(1)' : 'scale(0)'
    });

    const getAnimationEnd = () => ({
        opacity: hide ? 0 : 1,
        transform: hide ? 'scale(0)' : 'scale(1)'
    });

    const favoriteText = (isInFavorites ? 'Remove from' : 'Add to') + ' My locations';
    const favoriteIcon = './img/favorite_' + (isInFavorites ? 'remove' : 'add') + '.svg';
    const animationStart = getAnimationStart();
    const animationEnd = getAnimationEnd();

    return <div className={styles.card}>
        {loading ?
            getLoadingHTML() :
            errorMessage ?
                getErrorHTML() :
                <Animate
                    duration={0.2}
                    play start={animationStart}
                    end={animationEnd}>
                    <Card>
                        <div className={styles.favorite_div}>
                            <Tooltip arrow title={favoriteText}>
                                <div><img alt="favorite button" src={favoriteIcon}
                                          onClick={favoriteClicked}/></div>
                            </Tooltip>
                            <div><img alt="refresh button" src="./img/refresh.svg"
                                      onClick={refreshClicked}/></div>

                        </div>
                        <CardMedia className={styles.card_image}
                                   image={weatherObject.image}
                                   component='div'
                                   title={weatherObject.name}/>
                        <CardContent>
                            <Typography variant="h5"
                                        component="h2">{capitalize(weatherObject.name)}</Typography>
                            <Typography className={styles.card_margin_bottom}
                                        variant="subtitle1" color="textSecondary">
                                {capitalize(weatherObject.description)}
                            </Typography>
                            <Typography className={styles.card_margin_bottom}>
                                <strong>{weatherObject.temp}&deg;</strong>
                                &nbsp;(feels like {weatherObject.feels_like}&deg;)
                            </Typography>
                            <Grid container className={styles.card_footer}>
                                <Grid item xs={4}>
                                    <Typography>
                                        <img alt="wind_icon" src="./img/temperature_icon.svg"/>
                                    </Typography>
                                    <Typography>
                                        {weatherObject.min_temp}&deg;-{weatherObject.max_temp}&deg;
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>
                                        <img alt="wind_icon" src="./img/wind_icon.svg"/>
                                    </Typography>
                                    <Typography>
                                        {weatherObject && weatherObject.wind} km/h
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>
                                        <img alt="wind_icon" src="./img/humidity_icon.svg"/>
                                    </Typography>
                                    <Typography>
                                        {weatherObject && weatherObject.humidity}%
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Animate>}
    </div>;
})