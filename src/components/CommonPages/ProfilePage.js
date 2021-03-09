import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../providers/UserProvider";
import { Form, Button, Card, Alert, Container, CardDeck, Modal } from 'react-bootstrap'
import { updateUserPassword, updateUserEmail, storage, writeImageAndDisplayNameToDb} from '../../utils/firestore';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import {useHistory} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as MUI from '../../materialImportHelper/materialImports';
import ProfilePopUp from './ProfilePopUp';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow:1,
  },
  card:{
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
  },
  media: {
    height: 250,
  },
  paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  avatar: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      
    },
  },
  small: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
  large: {
    width: theme.spacing(24),
    height: theme.spacing(24),
  },
  buttonProgress: {
    color: MUI.deepPurple[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }, 
  uploaderRoot:{
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor:  MUI.deepPurple[500],
    '&:hover': {
      backgroundColor:  MUI.deepPurple[700],
    },
  },
  formRoot: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  popAlign:{
    padding: theme.spacing(2),
    textAlign: 'center',

  },
  myAlignRight:{
    marginLeft:20,
    marginRight: theme.spacing(2)
  }

 
}));
const ProfilePage = () => {

  //Form references
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const currentPasswordRef = useRef();
  const displayNameRef = useRef();
  const [loading, setLoading] = useState(false);
  const [infoLoading, setInfoLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const user = useContext(UserContext);
  const { email} = user[1];
  const {photoURL, displayName} = user[0];
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [uploadText, setUploadText] = useState("No Image Selected");
  const classes = useStyles();
  const [openPopup, setOpenPopup] =useState(false);
  const [openPicPopup, setOpenPicPopup] =useState(false);
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });
 
  //what happens when an image is selected
  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setUploadText(e.target.files[0].name)
      
      console.log(e.target.files[0].name);
    }

   
  };
  //save users modifications
  function handleProfileUpdate(e) {

    e.preventDefault();
    setSuccess(false);
    setInfoLoading(true);


    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
         setError('Passwords do not match');
    }
    const promises = [];
    
    setError('');
    setMessage('');
    if (emailRef.current.value !== email) {
        promises.push(updateUserEmail(currentPasswordRef.current.value, emailRef.current.value));
    }
    if (passwordRef.current.value) {
        promises.push(updateUserPassword(currentPasswordRef.current.value, passwordRef.current.value));
    }
    if(displayNameRef.current.value !== displayName){    

      promises.push(writeImageAndDisplayNameToDb("displayName","", displayNameRef.current.value))
      // displayName.current.value=displayNameRef.current.value;
    }

    Promise.all(promises)
        .then((user) => {
          console.log("promise .then" + user);
            //  history.push(ROUTES.SIGN_IN);
            setMessage('Account Successfully updated')
            setInfoLoading(false);
            setSuccess(true);

        }).catch((e) => {
          console.log(e);
          setError('Failed to update account')

        }).finally(() => {
            setLoading(false);

        })
}

//upload image to firestore
const handleImageUpload = () => {
  setSuccess(false);
  setLoading(true);
  const uploadTask = storage.ref(`profileImages/${displayName}`).put(image);
  uploadTask.on(
  
    "state_changed",
    snapshot => {   

    },
    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("profileImages")
        .child(displayName)
        .getDownloadURL()
        .then(url => {
          //upload url into user's firestore
          writeImageAndDisplayNameToDb("image", url, "");
          
          console.log(url +"url");
          setUrl(url);
          setSuccess(true);
          setLoading(false);
        });
    }
  );
};

  return (
    <>
     
      <div className={classes.root}>
                <MUI.Grid container justify="center" spacing={3} >
                    <MUI.Grid item xs={8} >
                        <MUI.Card>
                        <MUI.Grid  style={{ display: "flex", justifyContent:  "center" }} item xs={12} >
                        <MUI.CardActionArea >
                                    <div className={classes.avatar} > 
                                      <MUI.Avatar justify="center"  alt={displayName} src= {url || photoURL } className={ classes.large} >{displayName}</MUI.Avatar>
                                    </div>
                                    <MUI.CardContent>
                                        <MUI.Typography gutterBottom variant="body2" component="p" color="textSecondary">
                                        {displayName}
                                        </MUI.Typography>
                                        <MUI.Typography gutterBottom variant="body2" component="p" color="textSecondary">
                                        {email}
                                        </MUI.Typography>
                                    </MUI.CardContent>
                                </MUI.CardActionArea>
                         </MUI.Grid>
                               
                                <MUI.CardActions>
                                    <MUI.Button size="small" color="primary"  onClick={()=>setOpenPicPopup(true)}>
                                    Edit Profile Picture
                                    </MUI.Button>
                                    <MUI.Button className={classes.myAlignRight}  size="small" color="primary" onClick={()=>setOpenPopup(true)}>
                                    Edit Profile Information
                                    </MUI.Button>                                    
                                </MUI.CardActions>
                            </MUI.Card>
                    </MUI.Grid>

                </MUI.Grid>
            </div>

            <div className={classes.root}>
              <MUI.Grid container spacing={3}>
                <MUI.Grid item xs={12}>
                  <MUI.Paper className={classes.paper}>12</MUI.Paper>
                </MUI.Grid>
              </MUI.Grid>

            </div>
            

            <ProfilePopUp openPopup={openPicPopup} setOpenPopup={setOpenPicPopup} title="Edit Profile Picture">
  
              <MUI.Grid direction="column" container spacing={3} >
                <MUI.Grid  style={{ display: "flex", justifyContent:  "center" }} item xs={12} >
                <div className={classes.avatar} > 
                        <MUI.Avatar justify="center"  alt={displayName} src= {url || photoURL } className={ classes.small} >{displayName}</MUI.Avatar>
                    </div>
                </MUI.Grid>
                <MUI.Grid  style={{ display: "flex", justifyContent:  "center" }} item xs={12} >
                </MUI.Grid>
                <MUI.Grid  style={{ display: "flex", justifyContent:  "center" }} item xs={12} >
                    <div>
                      <label htmlFor="upload-photo" >
                         <MUI.Box  spacing={3}>
                         <input onChange={ handleChange }
                            style={{ display: 'none' }}
                            id="upload-photo"
                            name="upload-photo"
                            type="file"
                          />
                          </MUI.Box>{uploadText}
                            <MUI.Button className="mx-2"  spacing={3} size="small" color="primary"  component="span">Select Photo</MUI.Button>
                        </label>
                      </div>
                </MUI.Grid>
              </MUI.Grid>
                   
                   
                  <MUI.DialogActions>
                    <MUI.Button onClick={()=>setOpenPicPopup(false)} color="secondary">Done</MUI.Button>
                    {/* <MUI.Button onClick={handleImageDelete} color="secondary" autoFocus>Delete</MUI.Button> */}
                      <div className={classes.wrapper}>
                      <MUI.Button variant="contained" 
                      color="primary" className={buttonClassname}  disabled={loading} 
                      onClick={handleImageUpload}>Save and Upload</MUI.Button>
                      {loading && <MUI.CircularProgress size={24} className={classes.buttonProgress} />}
                      </div>
                  </MUI.DialogActions>
            </ProfilePopUp>
            {/* POP UP FOR EDITING ACCOUNT INFORMATION */}
            <ProfilePopUp openPopup={openPopup} setOpenPopup={setOpenPopup} title="Update Account Information">
              <Form onSubmit={handleProfileUpdate}>
                  <Form.Group id="displayName">
                  {error && <Alert variant="danger">{error}</Alert>}
                  {message && <Alert variant="success">{message}</Alert>}
                      <Form.Label>User name</Form.Label>
                      <Form.Control   type="text" ref={displayNameRef} required defaultValue={displayName}></Form.Control>
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
                  <MUI.DialogActions>
                  <MUI.Button onClick={()=>setOpenPopup(false)} color="secondary">Done</MUI.Button>
                    <div className={classes.wrapper}>
                      <MUI.Button variant="contained" 
                      color="primary" className={buttonClassname}  disabled={infoLoading} 
                      type="submit">Update</MUI.Button>
                      {infoLoading && <MUI.CircularProgress size={24} className={classes.buttonProgress} />}

                    
                    </div>

                  </MUI.DialogActions>
              </Form>
          </ProfilePopUp>
     </>
  ) 
};
export default ProfilePage;