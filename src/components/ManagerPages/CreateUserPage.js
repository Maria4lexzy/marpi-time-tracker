import React, { useRef, useState} from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import {createNewUser} from '../../utils/firestore';
import Select from 'react-select';
import clsx from 'clsx';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import * as mui from '../../materialImportHelper/materialImports';
import {DatePicker, KeyboardDatePicker,MuiPickersUtilsProvider,}from '@material-ui/pickers';
import RegisterEmployee from '../../redux/RegisterEmployee'
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow:1,
    },
    card:{
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
  
    buttonProgress: {
      color: mui.deepPurple[500],
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
      backgroundColor:  mui.deepPurple[500],
      '&:hover': {
        backgroundColor:  mui.deepPurple[700],
      },
    },
    formRoot: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
 
  
   
  }));
export default function CreateUser() {
    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const displayNameRef = useRef();
   
    const cprRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState(''); 
    const [dob, setDob] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState();
    const [selectedContract, setSelectedContract] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const classes = useStyles();
    const [success, setSuccess] = useState(false);
    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
      });
    const [selectedDate, setSelectedDate] = useState(new Date());   
    const roleOptions = [
        { value: 'admin', label: 'Admin' },
        { value: 'manager', label: 'Manager' },
        { value: 'worker', label: 'Worker' }
      ]
      const contractOptions = [
        { value: 'PT', label: 'Part-Time' },
        { value: 'FT', label: 'Full-Time' },
      ];
      const teamOptions = [
        { value: 'ATM', label: 'Team A' },
        { value: 'BTM', label: 'Team B' },
      ];
    const handleDateChange = (date) => {
      setSelectedDate(date);
      console.log(selectedDate);
      setDob(date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDay());
      console.log(dob);
   
     
}
    const handleRoleSelect = (e) => {
        let rolesArray=[];
        let admin=false;
        let manager=false;
        let worker = false;

               if(e.value==='admin'){
                   admin= true;
               }
               else if(e.value==='manager'){
                manager= true;
            }
               else{
                worker= true;
            }
           

            rolesArray.push(admin);
            rolesArray.push(manager);
            rolesArray.push(worker);
            console.log(rolesArray);
         
            setSelectedRole(rolesArray);
      }
    const handleContractSelect = (e) => {
        console.log(e.value+"contract type");
        setSelectedContract(e.value);
      }
  
    const handleTeamSelect = (e) => {
        console.log(e.value+"team");
        setSelectedTeam(e.value);
      }
  
    async function handleSubmit(e) {

   
        e.preventDefault();        console.log("button");
        console.log(selectedContract);
        console.log(dob);
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');

        }
        try {
            setError('');
            setLoading(true);
            let userError=createNewUser(
              displayNameRef.current.value, 
              emailRef.current.value, 
              passwordRef.current.value,
              selectedRole,
              selectedContract, 
              firstNameRef.current.value,
              lastNameRef.current.value,
              dob,
              selectedTeam,
              cprRef.current.value)
            
            userError.then(
                function(value) {
                    if(value)
                    if(value.message !==undefined)
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
                <div className="w-100" style={{ maxWidth: "800px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center">Add A New Employee</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form  autoComplete="off" onSubmit={handleSubmit}>
                              <div className="row">
                                <div className="col-6"> 
                                  <Form.Group id="displayName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control  placeholder="Doe"  autoComplete="off" type="text" ref={firstNameRef} required></Form.Control>
                                  </Form.Group> 
                                </div>
                                <div className="col-6"> 
                                  <Form.Group id="displayName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control placeholder="Doe" autoComplete="off" type="text" ref={lastNameRef} required></Form.Control>
                                  </Form.Group> 
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-6"> 
                                <Form.Group id="displayName">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control  placeholder="Jonny" autoComplete="off" type="text" ref={displayNameRef} required></Form.Control>
                                </Form.Group>
                                </div>
                                <div className="col-6"> 
                                  <Form.Group id="displayName">
                                    <Form.Label>CPR No</Form.Label>
                                    <Form.Control placeholder="010198-2304" autoComplete="off" type="text" ref={cprRef} required></Form.Control>
                                  </Form.Group> 
                                </div>
                
                              </div>
                              <div className="row">
                                <div className="col-6">
                                  <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control placeholder="Example: Jonny@gmail.com" autoComplete="off" type="text" ref={emailRef} required></Form.Control>
                                  </Form.Group>
                                </div>
                                <div className="col-6">
                                <Form.Group id="email">
                                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                      <KeyboardDatePicker
                                        fullWidth
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Date picker dialog"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps = {{
                                          'aria-label': 'change date',
                                        }}
                                      />
                                  </MuiPickersUtilsProvider>
                                  </Form.Group>
                         
                                </div>
                              </div>
                                
                                
                                <div className="row">
                                  <div className="col-6">
                                    <Form.Group id="password"> 
                                      <Form.Label>Password</Form.Label>
                                      <Form.Control autoComplete="new-password" autoComplete="off" type="password" ref={passwordRef} required></Form.Control>
                                  </Form.Group>
                                  </div>
                                  <div className="col-6">
                                    <Form.Group id="password-confirm">
                                      <Form.Label>Password Confirmation</Form.Label>
                                      <Form.Control autoComplete="new-password" autoComplete="off" type="password" ref={passwordConfirmRef} required></Form.Control>
                                  </Form.Group>
                                  </div>
                                </div>
                              <div className="row">
                                <div className="col-4">
                                <Form.Group id="roles">
                                    <Form.Label>Select User Role</Form.Label>
                                    <Select options={roleOptions} 
                                            className="basic-multi-select"
                                            onChange={handleRoleSelect}
                                    />
                                </Form.Group> 
                                </div>
                                <div className="col-4">
                                  <Form.Group id="roles">
                                      <Form.Label>Select Contract Type</Form.Label>
                                      <Select options={contractOptions} 
                                              onChange={handleContractSelect}
                                      />
                                  </Form.Group>  
                                </div>
                                <div className="col-4"> 
                                <Form.Group id="team">
                                      <Form.Label>Select Team</Form.Label>
                                      <Select options={teamOptions}   
                                              onChange={handleTeamSelect}
                                      />
                                  </Form.Group>
                                </div>
                              </div>
                                       
                                      
                                <mui.Button disabled={loading} className="w-100 mt-5" variant="contained" color="secondary" type="submit" >Register User</mui.Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    {/* <div className="w-100 text-center mt-2">
                        Already have an account? <Link to={ROUTES.SIGN_IN} >Log In</Link>
                    </div> */}
                </div>
            </Container>
        </>
    );
}

