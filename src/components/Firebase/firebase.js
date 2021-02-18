import React , { useContext, useState } from 'react';
import { Router } from "@reach/router";
import SignIn from "../SignIn";
import CreateUser from "../CreateUser";
import ManagerProfilePage from "./ManagerProfilePage";
import WorkerProfilePage from "./WorkerProfilePage";
import PasswordReset from "./PasswordReset";
import * as ROUTES from '../../constants/routes';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap'
import { UserContext } from "../../providers/UserProvider";
import {auth} from "../../utils/firestore";
import { Route } from 'react-router-dom';

const Firebase = () => {
  

    const user = useContext(UserContext);
    return (

        
          user ?
          <>
          <NavigationAuth/>
            { user.roles.manager && <ManagerProfilePage /> || user.roles.admin && <ManagerProfilePage /> || user.roles.worker && <WorkerProfilePage />}

          </>
          
        :
        <>
          <NavigationNonAuth/>
          <Router>
            <CreateUser path={ROUTES.CREATE_USER} />
            <SignIn path={ROUTES.SIGN_IN} />
            <PasswordReset path = {ROUTES.PASSWORD_FORGET} />
            <CreateUser path={ROUTES.CREATE_USER}/>
             {/* <Route exact path={ROUTES.LANDING} component={LandingPage} /> */}
            {/* <Route path={ROUTES.CREATE_USER} component={CreateUser} />
            <Route path={ROUTES.SIGN_IN} component={SignIn} /> */}
            {/* <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} /> */}
            {/* <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} /> */}
            
          </Router>
        </>
    );
}
const NavigationAuth = () => {
     
  return (
      <>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Brand href={ROUTES.SIGN_IN}>React-Bootstrap</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                      <Nav.Link href="#features">Features</Nav.Link>
                      <Nav.Link href="#pricing">Pricing</Nav.Link>
                      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                          <NavDropdown.Item href={ROUTES.SIGN_IN}>LOGIN</NavDropdown.Item>
                          <NavDropdown.Item href={ROUTES.CREATE_USER}>SIGN UP</NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href={ROUTES.CALENDAR_T}>CALENDAR t </NavDropdown.Item>                          
                      </NavDropdown>
                  </Nav>
                  <Nav>
                      <Nav.Link ><Button variant="link" onClick = {() => {auth.signOut()}}>Log Out</Button>
                      </Nav.Link>
                      <Nav.Link eventKey={2} href="#memes">
                          Dank memes
                   </Nav.Link>
                  </Nav>
              </Navbar.Collapse>
          </Navbar>
      </>
  )
}
const NavigationNonAuth = () => {


  return(
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href={ROUTES.SIGN_IN}>React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                  <NavDropdown.Item href={ROUTES.SIGN_IN}>LOGIN</NavDropdown.Item>
                  <NavDropdown.Item href={ROUTES.CREATE_USER}>SIGN UP</NavDropdown.Item>
                  <NavDropdown.Item href={ROUTES.CALENDAR}>CALENDAR</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href={ROUTES.CALENDAR_T}>CALENDAR t </NavDropdown.Item>
              </NavDropdown>
          </Nav>
          <Nav>
              <Nav.Link eventKey={2} href="#memes">
                  Dank memes
                   </Nav.Link>
          </Nav>
      </Navbar.Collapse>
  </Navbar>)
}

export default Firebase;