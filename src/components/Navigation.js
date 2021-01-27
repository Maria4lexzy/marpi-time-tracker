import React from 'react'
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { Navbar, FormControl, Nav, Button, Form } from 'react-bootstrap'

export default function Navigation() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Link to={ROUTES.DASHBOARD}>DASHBOARD</Link>
                    <Link to={ROUTES.LOG_IN}>LOG IN </Link>
                    <Link to={ROUTES.SIGN_UP}>SIGN UP </Link>
                    <Link to={ROUTES.CALENDAR}>CALENDAR </Link>
                    {/* <Nav.Link><Link to={ROUTES.HOME}>HOME</Link></Nav.Link> */}
                    {/* <Nav.Link><Link to={ROUTES.ADMIN}>ADMIN</Link></Nav.Link> */}

                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        </>
    )
}
