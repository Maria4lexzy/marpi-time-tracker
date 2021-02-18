import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../providers/UserProvider";
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import {auth} from "../../utils/firestore";
import { updateUserPassword, updateUserEmail} from '../../utils/firestore';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'


const WorkerProfilePage = () => {


  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const currentPasswordRef = useRef();
  // const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [sImage, setSImage]=useState([])
  const user = useContext(UserContext);
  const {photoURL, displayName, email} = user;

  const handleDrop = dropped => {
setSImage(dropped[0]);
  }
  function handleSubmit(e) {

    e.preventDefault();
    console.log("email ref"+ emailRef.current.value);
    console.log(user);
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError('Passwords do not match');
    }
    const promises = [];
    setLoading(true);
    setError('');
    setMessage('');
    if (emailRef.current.value !== email) {
        promises.push(updateUserEmail(currentPasswordRef.current.value, emailRef.current.value));
    }
    if (passwordRef.current.value) {
        promises.push(updateUserPassword(currentPasswordRef.current.value, passwordRef.current.value));
    }

    Promise.all(promises)
        .then((user) => {
            // history.push('/');
            setError('Failed to update account')
        }).catch((e) => {
          console.log(e.message);
        }).finally(() => {
            setLoading(false);

        })


}
  return (
    <>
    Worker Profile
    <div className = "mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
    <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
      <div
        style={{
          background: `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
          backgroundSize: "cover",
          height: "200px",
          width: "200px"
        }}
        className="border border-blue-300"
      ></div>
      <div className = "md:pl-4">
      <h2 className = "text-2xl font-semibold">{displayName}</h2>
      <h3 className = "italic">{email}</h3>
      </div>
    </div>
    <button className = "w-full py-3 " onClick = {() => {auth.signOut()}}>Sign out</button>
  </div>

  <AvatarEditor
        image='https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'
        width={250}
        height={250}
        border={50}
        color={[255, 255, 255, 0.6]} // RGBA
        scale={1.2}
        rotate={0}
      />

<Dropzone
        onDrop={handleDrop}
        noClick
        noKeyboard
        style={{ width: '250px', height: '250px' }}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <AvatarEditor 
                width={250} 
                height={250} 
                image={sImage} 
               />
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>

  <Container className="d-flex alighn-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center">Update Profile</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {message && <Alert variant="success">{message}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control  disabled='true' type="email" ref={emailRef} required defaultValue={user.email}></Form.Control>
                                </Form.Group>

                                <Form.Group id="currentPassword">
                                    <Form.Label>Current Password</Form.Label>
                                    <Form.Control type="password" ref={currentPasswordRef} placeholder="Enter your current password"></Form.Control>
                                </Form.Group>

                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same"></Form.Control>
                                </Form.Group>

                                <Form.Group id="password-confirm">
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same"></Form.Control>
                                </Form.Group>
                                <Button disabled={loading} className="w-100" type="submit" >Update Profile</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        {/* <Link to={ROUTES.SIGN_IN} >Cancel</Link> */}
                    </div>
                </div>
            </Container>
 
  </>
  ) 
};
export default WorkerProfilePage;