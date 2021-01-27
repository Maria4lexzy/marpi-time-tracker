import React from 'react';
import Signup from "./Signup";
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import Navigation from './Navigation'
import * as ROUTES from '../constants/routes';

import Calendar from './Calendar';


function App() {
  return (



    <Router>
      <AuthProvider>
        <Navigation />
        <Switch>
          {/* only match this slash path */}
          <PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>
          <PrivateRoute exact path="/update-profile" component={UpdateProfile}></PrivateRoute>
          <Route path={ROUTES.SIGN_UP} component={Signup}></Route>
          <Route path={ROUTES.LOG_IN} component={Login}></Route>
          <Route path={ROUTES.FORGET_PASSWORD} component={ForgotPassword}></Route>

        </Switch>
      </AuthProvider>
    </Router>


  );
}

export default App;
