import React from 'react'
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'

export default function Navigation() {
    return (
        <>

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href={ROUTES.LOG_IN}>React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href={ROUTES.LOG_IN}>LOGIN</NavDropdown.Item>
                            <NavDropdown.Item href={ROUTES.SIGN_UP}>SIGN UP</NavDropdown.Item>
                            <NavDropdown.Item href={ROUTES.CALENDAR}>CALENDAR</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href={ROUTES.CALENDAR_T}>CALENDAR t </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                     </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}
