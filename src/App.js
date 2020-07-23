import React from 'react';
import './style.css';
import Header from './items/Header.js';
import About from './pages/About.js';
import Home from './pages/Home.js';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

export default () =>
    <BrowserRouter>
        <Header/>
        <Switch>
            <Route exact path='/'><Home/></Route>
            <Route path='/about'><About/></Route>
        </Switch>
    </BrowserRouter>;



