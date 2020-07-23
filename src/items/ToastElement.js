import React, {forwardRef, useImperativeHandle, useState} from "react";

import {Snackbar, Fade} from "@material-ui/core";

export default forwardRef((props, ref) => {

    const [state, setState] = useState({showToast: false, toastMessage: ''});

    useImperativeHandle(ref, () => ({
        /**
         * Show a toast message
         * @param show boolean
         * @param message string
         */
        forceShowToast(show, message) {
            showToast(show, message);
        }
    }));

    /**
     * Show a toast message
     * @param show boolean
     * @param message string - optional (default val is empty string)
     */
    const showToast = (show, message: '') => setState({showToast: show, toastMessage: message});

    return <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        TransitionComponent={Fade}
        open={state.showToast}
        onClose={() => showToast(false)}
        autoHideDuration={1000}
        message={state.toastMessage}>
    </Snackbar>;
})