import React from 'react';
import Calendar from '../Calendar';
import ProfilePage from '../CommonPages/ProfilePage';
import ErrorPage from '../CommonPages/ErrorPage';
import CreateUserPage from './CreateUserPage'
import {  BrowserRouter as Router,  Route, Switch } from 'react-router-dom';
import * as ROUTES from '../../constants/routes'
const ManagerApplication = () =>{
            
           

    return(
        <>
        <Switch>
                <Route  path={ROUTES.PROFILE_PAGE} component={ProfilePage}></Route>
                <Route  path={ROUTES.CALENDAR} component={Calendar}></Route>
                <Route  path={ROUTES.CREATE_USER} component={CreateUserPage}></Route>
                <Route  path='/error' component={ErrorPage}></Route>
              </Switch> 
        </>
    );
}
export default ManagerApplication;