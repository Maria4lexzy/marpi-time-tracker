import React from 'react';
 import Firebase from './Firebase/Firebase'
import UserProvider from '../providers/UserProvider';
import SignIn from "./SignIn";
import CreateUser from "./CreateUser";
import ManagerProfilePage from './Firebase/ManagerProfilePage';
import WorkerProfilePage from "./Firebase/WorkerProfilePage";
import Calendar from './Calendar';
import PasswordReset from "./Firebase/PasswordReset";
import Dashboard from './Dashboard';
import {NavigationAuth, NavigationNonAuth} from './Navigation';
import * as ROUTES from '../constants/routes';
import PrivateRoute from '../constants/PrivateRoute';
import {  BrowserRouter as Router,  Route, Switch } from 'react-router-dom';
const App = () => (

<Router>
 <UserProvider>
   <Firebase/>
   {/* <NavigationAuth/>
    <Switch>  
    <Route  exact path={ROUTES.DASHBOARD} component={Dashboard}></Route>
    <Route  path={ROUTES.CREATE_USER} component={CreateUser}></Route>
    <Route  path={ROUTES.PASSWORD_FORGET} component={PasswordReset}></Route>
    <Route  path={ROUTES.WORKER_PROFILE} component={WorkerProfilePage}></Route>
    <Route  path={ROUTES.CALENDAR} component={Calendar}></Route>
  </Switch>  */}
 </UserProvider>
</Router>

);

export default App;