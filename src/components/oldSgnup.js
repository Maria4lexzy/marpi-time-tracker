import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import {createNewUser} from '../../utils/firestore'
export default function Signup() {
    const emailRef = useRef();
    const displayNameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState({
        admin: false,
        manager: false,
        worker: false
      });
    const history = useHistory;

    const handleToggle = ({ target }) =>
    setRoles(s => ({ ...s, [target.name]: !s[target.name] }));
  
    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');

        }
        try {
            setError('');
            setLoading(true);
            await createNewUser(displayNameRef, emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch {
            setError('Failed to create an account');
        }
        setLoading(false);

    }
    return (
        <>
            <Container className="d-flex alighn-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center">Sign Up</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="displayName">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" ref={displayNameRef} required></Form.Control>
                                </Form.Group>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required></Form.Control>
                                </Form.Group>

                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required></Form.Control>
                                </Form.Group>

                                <Form.Group id="password-confirm">
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                                </Form.Group>
                                <Button disabled={loading} className="w-100" type="submit" >Sign Up</Button>
                                <Form.Group id="roles">
                                {Object.keys(roles).map(key => (
                                    <input
                                        type="checkbox"
                                        onChange={handleToggle}
                                        key={key}
                                        name={key}
                                        checked={roles[key]}
                                    />))}
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Already have an account? <Link to={ROUTES.LOG_IN} >Log In</Link>
                    </div>

                </div>
            </Container>
        </>
    );
}

