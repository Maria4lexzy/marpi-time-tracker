import React from 'react';
import Signup from "./Signup";
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import Calendar from './Calendar';

function App() {
  return (

    <Container className="d-flex alighn-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <div className="w-100 text-center mt-2">
              <Link to="/login" >Login</Link>
              <Link to="/signup" >Sign up</Link>
              <Link to="/update-profile" >Update</Link>
              <Link to="/calendar" >Calendar</Link>
            </div>
            <Switch>
              {/* only match this slash path */}
              <PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>
              <PrivateRoute exact path="/update-profile" component={UpdateProfile}></PrivateRoute>
              <Route path="/signup" component={Signup}></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/forgot-password" component={ForgotPassword}></Route>
              <Route path="/calendar" component={Calendar}></Route>

            </Switch>
          </AuthProvider>
        </Router>

      </div>
    </Container>

  );
}

export default App;
