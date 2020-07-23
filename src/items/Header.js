import React from 'react';
import styles from './css/Header.module.css'
import {Link} from 'react-router-dom'
import {AppBar, Toolbar, Typography} from '@material-ui/core'

export default () => <div><AppBar position="static" className={styles.header}><Toolbar>
    <Typography variant="h6" className={styles.links}>
        <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="header_image"/>
    </Typography>
    <Typography variant="h6" className={styles.links}>
        <Link to={'/'}>Home</Link>
    </Typography></Toolbar>
</AppBar></div>;

