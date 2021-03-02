import React from 'react';

import Firebase from './Firebase/Firebase'
import {  BrowserRouter as Router,  Route, Switch } from 'react-router-dom';
import UserProvider from '../providers/UserProvider';
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