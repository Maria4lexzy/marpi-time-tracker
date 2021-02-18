import React from 'react';
import Firebase from './Firebase/Firebase'
import {  BrowserRouter as Router,  Route, } from 'react-router-dom';
import CreateUser from './CreateUser';
import SignIn from './SignIn';
import UserProvider from '../providers/UserProvider';
import * as ROUTES from '../constants/routes';

const App = () => (
  <UserProvider> 
      <Firebase/>
  </UserProvider>
);

export default App;