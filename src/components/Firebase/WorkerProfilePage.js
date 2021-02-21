import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../providers/UserProvider";
import { Form, Button, Card, Alert, Container, CardDeck, Modal } from 'react-bootstrap'
import {auth} from "../../utils/firestore";
import { updateUserPassword, updateUserEmail, storage,writeImageToDb} from '../../utils/firestore';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import AvatarEditor from 'react-avatar-editor'
import Avatar from 'react-avatar-edit'

const WorkerProfilePage = () => {

  //Form references
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const currentPasswordRef = useRef();
  const displayNameRef = useRef();
  //states
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const user = useContext(UserContext);
  const { email} = user[1];
  const {photoURL, displayName} = user[0];
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  //what happens when an image is selected
  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  //save users modifications
  function handleProfileUpdate(e) {

    e.preventDefault();
    console.log("email ref"+ emailRef.current.value);
    console.log(user[1]);
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
//upload image to firestore
const handleImageUpload = () => {
    //create storage ref
    //upload  file
    //the put method returns an "upload task"
  const uploadTask = storage.ref(`profileImages/${image.name}`).put(image);
  //use the task to subscribe to state changes which are represented by functions: 
  //we listen to 3 state changes
  //notifies us about the upload progress
  //whenever there is an update, we can a snapshot of the progress state
  //used to update the progress bar in profile page
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("profileImages")
        .child(image.name)
        .getDownloadURL()
        .then(url => {
          //upload url into user's firestore
          writeImageToDb(url);
          
          console.log(url +"url");
          setUrl(url);
        });
    }
  );
};

//modal setting
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
//image styles
const imageStyle = {
  maxWidth:  "50%",
  height: "default",
};
  return (
    <>
      <Container className="text-center container mt-5 my-1 ">
      <CardDeck>
        <Card  border="info">
          <Card.Header as="h5">{displayName}</Card.Header>
          <Card.Body>
              <div>
                    <div className="avatar rounded-circle">
                        <img src={url || photoURL} alt="firebase-image" style={imageStyle}/>
                    </div>
              </div>     
            <Card.Text>
              <p className='lead'>{email}</p>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
          <Button type="submit" variant="info"  onClick={handleShow}>
            Edit Profile Picture
          </Button>
          </Card.Footer>
        </Card>
        <Card  border="info">
          <Card.Header as="h5">Quick Access</Card.Header>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
              <Button className="w-100 my-2" variant="outline-info" type="submit"  >My Shifts</Button>
              <Button className="w-100 my-2" variant="outline-info" type="submit"  >Holiday</Button>
              <Button className="w-100 my-2" variant="outline-info" type="submit"  >Requests</Button>
          </Card.Body>
          <Card.Footer>
          <Button type="submit" variant="info"  onClick = {() => {auth.signOut()}}>
            SIGN OUT
          </Button>
          </Card.Footer>
        </Card>
      </CardDeck>
      </Container>
 
      <Container className="d-flex alighn-items-center justify-content-center mt-2" >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card  border="info">
                    <Card.Header as="h5">Update Profile</Card.Header>
                        <Card.Body>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {message && <Alert variant="success">{message}</Alert>}
                            <Form onSubmit={handleProfileUpdate}>
                                <Form.Group id="displayName">
                                    <Form.Label>User name</Form.Label>
                                    <Form.Control  disabled={true} type="email" ref={displayNameRef} required defaultValue={displayName}></Form.Control>
                                </Form.Group>

                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control  disabled={true} type="email" ref={emailRef} required defaultValue={email}></Form.Control>
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
                                <Button disabled={loading} variant="info" className="w-100" type="submit" >Update Profile</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        {/* <Link to={ROUTES.SIGN_IN} >Cancel</Link> */}
                    </div>
                </div>
            </Container>

      <Modal show={show} onHide={handleClose}   aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="avatar rounded-circle">
              <img src={url || "https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/87-512.png"} alt="firebase-image" style={imageStyle}/>
              <input type="file"  name="filename" className="custom-file-input" id="customInput"  onChange={handleChange}/>
              <input type="file" onChange={handleChange} />
          </div>
          <div>
          <progress value={progress} max="100" /> 
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-info" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="info" onClick={handleImageUpload}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
 
  </>
  ) 
};
export default WorkerProfilePage;