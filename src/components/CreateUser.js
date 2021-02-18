import React, { useRef, useState, Component} from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { Link } from "@reach/router";
import * as ROUTES from '../constants/routes';
import {createNewUser} from '../utils/firestore';
import Select from 'react-select';

export default function CreateUser() {
    const emailRef = useRef();
    const displayNameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState([]);

      const options = [
        { value: 'admin', label: 'Admin' },
        { value: 'manager', label: 'Manager' },
        { value: 'worker', label: 'Worker' }
      ]
          const history = useHistory;

        //   const handleToggle = ({ target }) =>
        //   setRoles(s => ({ ...s, [target.name]: !s[target.name] }));
        
  

    const handleSelect = (e) => {
        let rolesArray=[];
        let admin=false;
        let manager=false;
        let worker = false;
           e.forEach(element => {
               if(element.value==='admin'){
                   admin= true;
               }
               else if(element.value==='manager'){
                manager= true;
            }
               else{
                worker= true;
            }
            });

            rolesArray.push(admin);
            rolesArray.push(manager);
            rolesArray.push(worker);
            console.log(rolesArray);
         
            setSelectedValue(rolesArray);
      }
  
    async function handleSubmit(e) {
        console.log("button");
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');

        }
        try {
            setError('');
            setLoading(true);
            let userError=createNewUser(displayNameRef.current.value, emailRef.current.value, passwordRef.current.value,selectedValue)
            
            userError.then(
                function(value) {
                    if(value)
                    if(value.message !=undefined)
                        setError(value.message);
                     },
                 function(error) {
                     setError(error.message);
                         }
            )
            
             // history.push("/");
        } catch(error) {
            setError(error.message);
            console.log(error);
        }
        setLoading(false);

    }
    
    return (
        <>
            <Container className="d-flex alighn-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center">Create New User</h2>
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
                                <Button disabled={loading} className="w-100" type="submit" >Register User</Button>
                                <Form.Group id="roles">
                                    <Form.Label>User Role</Form.Label>
                                    <Select options={options} 
                                            isMulti
                                            className="basic-multi-select"
                                            onChange={handleSelect}
                                            />
                                {/* {Object.keys(roles).map(key => (
                                    <input
                                        type="checkbox"
                                        onChange={handleToggle}
                                        key={key}
                                        name={key}
                                        checked={roles[key]}
                                    />))} */}
                                    {selectedValue && <div style={{ marginTop: 20, lineHeight: '25px' }}>
        <div><b>Selected Value: </b> {JSON.stringify(selectedValue, null, 2)}</div>
      </div>}
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Already have an account? <Link to={ROUTES.SIGN_IN} >Log In</Link>
                    </div>

                </div>
            </Container>
        </>
    );
}

