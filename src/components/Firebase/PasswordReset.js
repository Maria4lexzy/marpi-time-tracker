import React, { useState, useRef } from "react";
import { Link } from "@reach/router";
import { Form, Button, Card, Alert } from 'react-bootstrap'
import {sendResetEmail} from '../../utils/firestore';

const PasswordReset = () => {


  const emailRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage('');
            setError('');
            setLoading(true);
            await sendResetEmail(emailRef.current.value);
            setMessage('Check your inbox for further instructions');
        } catch(e) {
          console.log(e.message);
            setError('Failed to reset password');
        }
        setLoading(false);

    }
  
  return (
    <>
   
             <Card>
                <Card.Body>
                    <h2 className="text-center">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>

                        <Button disabled={loading} className="w-100" type="submit" >Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/signin" > &larr; Back to Log In Page</Link>
                        <Link to="/https://mail.google.com/" > or Check Your Email &rarr;</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need More help<Link to="/help-page" >Help</Link>
            </div>
        
    </>
  );
};
export default PasswordReset;

// const sendResetEmail = event => {
//   event.preventDefault();
//   auth
//     .sendPasswordResetEmail(email)
//     .then(() => {
//       setEmailHasBeenSent(true);
//       setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
//     })
//     .catch(() => {
//       setError("Error resetting password");
//     });
// };