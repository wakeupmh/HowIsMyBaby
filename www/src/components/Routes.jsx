import React from 'react';
import {Route, Redirect, HashRouter} from 'react-router-dom';
import Client from './Client';
import Streamer from './Streamer';

export default props =>
    <HashRouter>
        <Route path='/client' component={Client}/>
        <Route path='/streamer' component={Streamer}/>
        <Redirect from='*' to='/streamer'/>
    </HashRouter>