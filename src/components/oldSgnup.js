// import React, { useRef, useState } from 'react';
// import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
// import { useHistory } from 'react-router-dom';
// import { useAuth } from './Firebase/context';
// import { Link } from 'react-router-dom';
// import * as ROUTES from '../constants/routes';

// export default function Signup() {
//     const emailRef = useRef();
//     const passwordRef = useRef();
//     const passwordConfirmRef = useRef();
//     const { signup } = useAuth();
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const history = useHistory;


//     async function handleSubmit(e) {
//         e.preventDefault();
//         if (passwordRef.current.value !== passwordConfirmRef.current.value) {
//             return setError('Passwords do not match');

//         }
//         try {
//             setError('');
//             setLoading(true);
//             await signup(emailRef.current.value, passwordRef.current.value);
//             history.push("/");
//         } catch {
//             setError('Failed to create an account');
//         }
//         setLoading(false);

//     }
//     return (
//         <>
//             <Container className="d-flex alighn-items-center justify-content-center" style={{ minHeight: "100vh" }}>
//                 <div className="w-100" style={{ maxWidth: "400px" }}>
//                     <Card>
//                         <Card.Body>
//                             <h2 className="text-center">Sign Up</h2>
//                             {error && <Alert variant="danger">{error}</Alert>}
//                             <Form onSubmit={handleSubmit}>
//                                 <Form.Group id="email">
//                                     <Form.Label>Email</Form.Label>
//                                     <Form.Control type="email" ref={emailRef} required></Form.Control>
//                                 </Form.Group>

//                                 <Form.Group id="password">
//                                     <Form.Label>Password</Form.Label>
//                                     <Form.Control type="password" ref={passwordRef} required></Form.Control>
//                                 </Form.Group>

//                                 <Form.Group id="password-confirm">
//                                     <Form.Label>Password Confirmation</Form.Label>
//                                     <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
//                                 </Form.Group>
//                                 <Button disabled={loading} className="w-100" type="submit" >Sign Up</Button>
//                             </Form>
//                         </Card.Body>
//                     </Card>
//                     <div className="w-100 text-center mt-2">
//                         Already have an account? <Link to={ROUTES.LOG_IN} >Log In</Link>
//                     </div>

//                 </div>
//             </Container>
//         </>
//     );
// }


import React from 'react'

export default function oldSign() {
    return (
        <div>

        </div>
    )
}
