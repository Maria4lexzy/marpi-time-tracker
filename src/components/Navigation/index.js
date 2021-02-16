// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap'

// import SignOutButton from '../SignOut';
// import * as ROUTES from '../../constants/routes';

// import { AuthUserContext } from '../Session';
// const Navigation = () => (
//     <div>
//         <AuthUserContext.Consumer>
//             {authUser =>
//                 authUser ? <NavigationAuth /> : <NavigationNonAuth />
//             }
//         </AuthUserContext.Consumer>
//     </div>
// );

// const NavigationAuth = () => (
//     <>


//         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//             <Navbar.Brand href={ROUTES.HOME}>MARPI TIME TRACKER</Navbar.Brand>
//             <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//             <Navbar.Collapse id="responsive-navbar-nav">
//                 <Nav className="mr-auto">
//                     <Nav.Link href={ROUTES.LANDING}>LANDING</Nav.Link>
//                     <Nav.Link href={ROUTES.HOME}>HOME</Nav.Link>
//                     <Nav.Link href={ROUTES.ACCOUNT}>ACCOUNT</Nav.Link>
//                     <Nav.Link href={ROUTES.ADMIN}>ADMIN</Nav.Link>
//                     <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
//                         <NavDropdown.Item href={ROUTES.SIGN_IN}>LOGIN</NavDropdown.Item>
//                         <NavDropdown.Item href={ROUTES.SIGN_UP}>SIGN UP</NavDropdown.Item>
//                         <NavDropdown.Item href={ROUTES.CALENDAR}>CALENDAR</NavDropdown.Item>
//                         <NavDropdown.Divider />
//                         <NavDropdown.Item href={ROUTES.CALENDAR_T}>CALENDAR t </NavDropdown.Item>
//                     </NavDropdown>
//                 </Nav>
//                 <Nav>
//                     <Nav.Link ><SignOutButton /></Nav.Link>
//                     <Nav.Link eventKey={2} href="#memes">
//                         Dank memes
//                      </Nav.Link>
//                 </Nav>
//             </Navbar.Collapse>
//         </Navbar>
//     </>
// );
// const NavigationNonAuth = () => (
//     <>


//         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//             <Navbar.Brand href={ROUTES.SIGN_IN}>MARPI TIME TRACKER</Navbar.Brand>
//             <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//             <Navbar.Collapse id="responsive-navbar-nav">
//                 <Nav className="mr-auto">
//                     <Nav.Link href={ROUTES.LANDING}>LANDING</Nav.Link>
//                     <Nav.Link href={ROUTES.HOME}>HOME</Nav.Link>
//                     <Nav.Link href={ROUTES.ACCOUNT}>ACCOUNT</Nav.Link>
//                     <Nav.Link href={ROUTES.ADMIN}>ADMIN</Nav.Link>
//                     <Nav.Link href={ROUTES.ADMIN}>SIGN IN</Nav.Link>
//                     <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
//                         <NavDropdown.Item href={ROUTES.SIGN_IN}>LOGIN</NavDropdown.Item>
//                         <NavDropdown.Item href={ROUTES.SIGN_UP}>SIGN UP</NavDropdown.Item>
//                         <NavDropdown.Item href={ROUTES.CALENDAR}>CALENDAR</NavDropdown.Item>
//                         <NavDropdown.Divider />
//                         <NavDropdown.Item href={ROUTES.CALENDAR_T}>CALENDAR t </NavDropdown.Item>
//                     </NavDropdown>
//                 </Nav>
//                 <Nav>
//                     <Nav.Link eventKey={2} href="#memes">
//                         Dank memes
//                      </Nav.Link>
//                 </Nav>
//             </Navbar.Collapse>
//         </Navbar>
//     </>
// );

// export default Navigation;

import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    {authUser.roles.includes(ROLES.ADMIN) && (
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={ROUTES.CALENDAR}>Calendar</Link>
    </li>
  </ul>
);

export default Navigation;