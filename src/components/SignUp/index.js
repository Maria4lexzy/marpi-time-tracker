import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm />
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    error: null,
};


class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };

    }


    onSubmit = event => {
        const { username, email, password } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);

            })
            .catch(error => {
                this.setState({ error });
            });
        // prevents the page from reloading when you submit the foarm
        event.preventDefault();

    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


    render() {
        const {
            username,
            email,
            password,
            passwordConfirm,
            error,
        } = this.state;
        const isInvalid =
            password !== passwordConfirm ||
            password === '' ||
            email === '' ||
            username === '';
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Full Name"
                />
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="passwordOne"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <input
                    name="passwordTwo"
                    value={passwordConfirm}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm Password"
                />
                <button disabled={isInvalid} type="submit">
                    Sign Up
        </button>

                {error && <p>{error.message}</p>}
            </form>
            // <Container className="d-flex alighn-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            //     <div className="w-100" style={{ maxWidth: "400px" }}>
            //         <Card>
            //             <Card.Body>
            //                 <h2 className="text-center">Sign Up</h2>
            //                 {error && <Alert variant="danger">{error.message}</Alert>}
            //                 <Form onSubmit={this.onSubmit}>
            //                     <Form.Group id="username">
            //                         <Form.Label>Username</Form.Label>
            //                         <Form.Control type="text" value={username} required></Form.Control>
            //                     </Form.Group>
            //                     <Form.Group id="email">
            //                         <Form.Label>Email</Form.Label>
            //                         <Form.Control type="email" value={email} required></Form.Control>
            //                     </Form.Group>

            //                     <Form.Group id="password">
            //                         <Form.Label>Password</Form.Label>
            //                         <Form.Control type="password" value={password} required></Form.Control>
            //                     </Form.Group>

            //                     <Form.Group id="password-confirm">
            //                         <Form.Label>Password Confirmation</Form.Label>
            //                         <Form.Control type="password" value={passwordConfirm} required></Form.Control>
            //                     </Form.Group>
            //                     <Button className="w-100" disabled={isInvalid} type="submit">Sign Up </Button>
            //                 </Form>
            //             </Card.Body>
            //         </Card>
            //         <div className="w-100 text-center mt-2">
            //             Already have an account?
            //         {/* Already have an account? <Link to={ROUTES.LOG_IN} >Log In</Link> */}
            //         </div>

            //     </div>
            // </Container>
        );
    }
}

const SignUpLink = () => (
    <p>go to signup
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

// const SignUpForm = compose(
//     withRouter,
//     withFirebase,
// )(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };