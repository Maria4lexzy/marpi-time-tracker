// import React, { useState } from 'react'
// import { Link } from 'react-router-dom';
// import * as ROUTES from '../constants/routes';
// import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap'
// import { useHistory } from 'react-router-dom';
// import { useAuth } from './Firebase/context';

// const Navigation = () => ({ authUser }) => (
//     <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
// )

// const NavigationAuth = () => {
//     const [error, setError] = useState('');
//     const { currentUser, logout } = useAuth();
//     const history = useHistory();
//     async function handleLogout() {
//         setError('');
//         try {
//             await logout();
//             history.pushState('/login');
//         } catch { setError('Failed to logout'); }
//     }
//     return (
//         <>

//             <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//                 <Navbar.Brand href={ROUTES.LOG_IN}>React-Bootstrap</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//                 <Navbar.Collapse id="responsive-navbar-nav">
//                     <Nav className="mr-auto">
//                         <Nav.Link href="#features">Features</Nav.Link>
//                         <Nav.Link href="#pricing">Pricing</Nav.Link>
//                         <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
//                             <NavDropdown.Item href={ROUTES.LOG_IN}>LOGIN</NavDropdown.Item>
//                             <NavDropdown.Item href={ROUTES.SIGN_UP}>SIGN UP</NavDropdown.Item>
//                             <NavDropdown.Item href={ROUTES.CALENDAR}>CALENDAR</NavDropdown.Item>
//                             <NavDropdown.Divider />
//                             <NavDropdown.Item href={ROUTES.CALENDAR_T}>CALENDAR t </NavDropdown.Item>
//                         </NavDropdown>
//                     </Nav>
//                     <Nav>
//                         <Nav.Link ><Button variant="link" onClick={handleLogout}> Log Out</Button>
//                         </Nav.Link>
//                         <Nav.Link eventKey={2} href="#memes">
//                             Dank memes
//                      </Nav.Link>
//                     </Nav>
//                 </Navbar.Collapse>
//             </Navbar>
//         </>
//     )
// }
// const NavigationNonAuth = () => {
//     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//         <Navbar.Brand href={ROUTES.LOG_IN}>React-Bootstrap</Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//             <Nav className="mr-auto">
//                 <Nav.Link href="#features">Features</Nav.Link>
//                 <Nav.Link href="#pricing">Pricing</Nav.Link>
//                 <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
//                     <NavDropdown.Item href={ROUTES.LOG_IN}>LOGIN</NavDropdown.Item>
//                     <NavDropdown.Item href={ROUTES.SIGN_UP}>SIGN UP</NavDropdown.Item>
//                     <NavDropdown.Item href={ROUTES.CALENDAR}>CALENDAR</NavDropdown.Item>
//                     <NavDropdown.Divider />
//                     <NavDropdown.Item href={ROUTES.CALENDAR_T}>CALENDAR t </NavDropdown.Item>
//                 </NavDropdown>
//             </Nav>
//             <Nav>

//                 <Nav.Link eventKey={2} href="#memes">
//                     Dank memes
//                      </Nav.Link>
//             </Nav>
//         </Navbar.Collapse>
//     </Navbar>
// }
// export default Navigation;
import React from 'react'

export default function Navigation() {
    return (
        <div>

        </div>
    )
}
