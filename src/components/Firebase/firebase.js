import React , { useContext, useState } from 'react';

import * as ROUTES from '../../constants/routes';
import { UserContext } from "../../providers/UserProvider";
import {  BrowserRouter as Router,  Route, Switch } from 'react-router-dom';
import Calendar from '../Calendar';
import {NavigationAuth, NavigationNonAuth} from '../CommonPages/Navigation';
import CreateUserPage from "../ManagerPages/CreateUserPage";
import ProfilePage from "../CommonPages/ProfilePage";
import Dashboard from '../Dashboard'
import PasswordResetPage from "../CommonPages/PasswordResetPage";
import SignInPage from "../CommonPages/SignInPage";
import ErrorPage from '../CommonPages/ErrorPage'
import Can from '../Can';
import WorkerSideNav from '../WorkerPages/WorkerSideNav';
const Firebase = () => {
    const user = useContext(UserContext);
    
    return (  
        
          user ?
          <>
          {console.log(user[1].roles)}
            <Can
            role={user[1].roles}
            
            perform="worker-application:visit"
            yes={() => (
              <WorkerSideNav/> 
            )}
            no={() => <ErrorPage/>}
            />
          
            {/* <NavigationAuth/>  */}
             {/* <Switch>
                <Route  exact path={ROUTES.DASHBOARD} component={Dashboard}></Route>
                <Route  path={ROUTES.CREATE_USER} component={CreateUserPage}></Route>
                <Route  path={ROUTES.PROFILE_PAGE} component={ProfilePage}></Route>
                <Route  path={ROUTES.CALENDAR} component={Calendar}></Route>
              </Switch>  */}
           

             
           
            {/* { user[1].roles.manager && <ManagerProfilePage /> || user[1].roles.admin && <ManagerProfilePage /> || user[1].roles.worker && <WorkerProfilePage />} */}
          </>
        :
        <>
              <Switch>
                <Route path={ROUTES.SIGN_IN} component={SignInPage}></Route>
                <Route  path={ROUTES.PASSWORD_FORGET} component={PasswordResetPage}></Route>
              </Switch>
                 
          </>
    );
}

export default Firebase;