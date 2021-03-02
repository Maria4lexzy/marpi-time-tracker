import React , { useContext, useState } from 'react';
import SignIn from "../SignIn";
import CreateUser from "../CreateUser";
import ManagerProfilePage from "./ManagerProfilePage";
import WorkerProfilePage from "./WorkerProfilePage";
import PasswordReset from "./PasswordReset";
import Dashboard from '../Dashboard'
import * as ROUTES from '../../constants/routes';
import { UserContext } from "../../providers/UserProvider";
import {  BrowserRouter as Router,  Route, Switch } from 'react-router-dom';
import Calendar from '../Calendar';
import {NavigationAuth, NavigationNonAuth} from '../Navigation';
import PrivateRoute from '../../constants/PrivateRoute';
import Can from '../Can';


const Firebase = () => {
    const user = useContext(UserContext);
    return (      
          user ?
          <>
            <NavigationAuth/>
            <Router>
              <Switch>
                <Route  exact path={ROUTES.DASHBOARD} component={Dashboard}></Route>
                <Route  path={ROUTES.CREATE_USER} component={CreateUser}></Route>
                <Route  path={ROUTES.PASSWORD_FORGET} component={PasswordReset}></Route>
                <Route  path={ROUTES.WORKER_PROFILE} component={WorkerProfilePage}></Route>
                <Route  path={ROUTES.CALENDAR} component={Calendar}></Route>
              </Switch> 
            </Router>
            {/* { user[1].roles.manager && <ManagerProfilePage /> || user[1].roles.admin && <ManagerProfilePage /> || user[1].roles.worker && <WorkerProfilePage />} */}
          </>
        :
          <>
            <p>adfdfaf {user}END</p>
            <NavigationNonAuth/>
            <Router>
              <Switch>
                <Route path={ROUTES.SIGN_IN} component={SignIn}></Route>
              </Switch>
            </Router>         
          </>
    );
}

export default Firebase;