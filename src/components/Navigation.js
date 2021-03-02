
import React, {useState}  from 'react';
import * as ROUTES from '../constants/routes';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import {auth} from '../utils/firestore';
import { useHistory } from 'react-router-dom';
export const Navigation =({user})=>{
    <>
    {user? <NavigationAuth/> : <NavigationNonAuth/>}
    </>
}
 export const NavigationAuth = () => {
     
    const [error, setError] = useState('');
    const history = useHistory();
    async function handleLogout() {
        setError('');
        try {
            await auth.signOut();
            history.push(ROUTES.SIGN_IN);
        } catch { setError('Failed to logout'); }
      }
  return (
      <>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Brand href={ROUTES.DASHBOARD}>Marpi Time Tracker</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                      <Nav.Link href={ROUTES.SIGN_IN}>Sign In</Nav.Link>
                      <Nav.Link href={ROUTES.CALENDAR}>Calendar</Nav.Link>
                      <Nav.Link href={ROUTES.DASHBOARD}>Dashboard</Nav.Link>
                      <Nav.Link href={ROUTES.WORKER_PROFILE}>Worker Profile</Nav.Link>
                      <Nav.Link href={ROUTES.MANAGER_PROFILE}>Manager Profile</Nav.Link>
                      <NavDropdown title="Create Users" id="collasible-nav-dropdown">
                          <NavDropdown.Item href={ROUTES.CREATE_USER}>Create User</NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href={ROUTES.DASHBOARD}>DASHBOARD </NavDropdown.Item>                          
                      </NavDropdown>
                  </Nav>
                  <Nav>
                    <Nav.Link type="submit" variant="link" onClick = {handleLogout}>Log Out</Nav.Link>  
                  </Nav>
              </Navbar.Collapse>
          </Navbar>
      </>
  )}

export const NavigationNonAuth = () => {


    return(
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href={ROUTES.SIGN_IN}>Marpi Time Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href={ROUTES.SIGN_IN}>Sign In</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link eventKey={2} href="#memes">
                    Dank memes
                     </Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>)
  }
  