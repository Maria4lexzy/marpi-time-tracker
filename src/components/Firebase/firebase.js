import React , { useContext, useState } from 'react';
import { Router } from "@reach/router";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import ProfilePage from "./ProfilePage";
import PasswordReset from "./PasswordReset";
import * as ROUTES from '../../constants/routes';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap'
import { UserContext } from "../../providers/UserProvider";
import {auth} from "../../utils/firestore";

const Firebase = () => {
  
    const [activeView, setActiveView] = useState("WORKER");
    const user = useContext(UserContext);
    return (

        
          user ?
          <>
          <NavigationAuth/>
            {user.roles.admin && <ProfilePage /> || user.roles.manager && <ProfilePage /> || user.roles.worker && <ProfilePage />}

          </>
          
        :
        <>
          <NavigationNonAuth/>
          <Router>
            <SignUp path="signUp" />
            <SignIn path="/" />
            <PasswordReset path = "passwordReset" />
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
                          <NavDropdown.Item href={ROUTES.SIGN_UP}>SIGN UP</NavDropdown.Item>
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
                  <NavDropdown.Item href={ROUTES.SIGN_UP}>SIGN UP</NavDropdown.Item>
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