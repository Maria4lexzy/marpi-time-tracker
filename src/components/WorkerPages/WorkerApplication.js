import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Calendar from '../Calendar';
import ProfilePage from '../CommonPages/ProfilePage';
import ErrorPage from '../CommonPages/ErrorPage';

import {  BrowserRouter as Router,  Route, Switch } from 'react-router-dom';
import * as ROUTES from '../../constants/routes'
const WorkerApplication = () =>{
            
           

    return(
        <>
        <Switch>
                <Route  path={ROUTES.PROFILE_PAGE} component={ProfilePage}></Route>
                <Route  path={ROUTES.CALENDAR} component={Calendar}></Route>
                <Route  path='/error' component={ErrorPage}></Route>
              </Switch> 
        </>
    );
}

export default WorkerApplication;