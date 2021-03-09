import React, {useState, useRef} from "react";
import { Link } from 'react-router-dom';
import {signInWithEmailAndPassword, signInWithGoogle}  from '../../utils/firestore'
import * as ROUTES from '../../constants/routes';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import GoogleButton from 'react-google-button'


const SignInPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();


  function handleSubmit(e) {
    e.preventDefault();
    handleSignIn();

  }

    async function handleSignIn() {

      try {
          setError('');
          setLoading(true);
          console.log("try sign in");
          await signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value);
          history.push(ROUTES.DASHBOARD);
      } catch (e){
          setError(e.message());
          console.log(e.message +" Sign in catch");
      }
      setLoading(false);

  }

    function signInWithGoogleEvent(event) 
    { 
        event.preventDefault();
        signInWithGoogle();}

  return (
    <>

<Container className="d-flex alighn-items-center justify-content-center mt-5" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center">Sign In</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required placeholder="E.g: example@gmail.com"></Form.Control>
                                </Form.Group>

                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required></Form.Control>
                                </Form.Group>

                                <Button disabled={loading} className="w-100" type="submit" >Sign In</Button>
                            </Form>
                            <p className="text-center my-3">or</p>
                            <GoogleButton className="w-100 text-center mt-3" onClick = {signInWithGoogleEvent}/>
                            <div className="w-100 text-center mt-3">
                                <Link to={ROUTES.PASSWORD_FORGET} >Forgot Password</Link>
                            </div>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Need an account? <Link to={ROUTES.CREATE_USER} >Sign Up</Link>
                    </div>

                </div>
            </Container >
  </>
  );
};
export default SignInPage;