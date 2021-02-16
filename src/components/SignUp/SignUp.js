import React, { useState } from "react";
import { Link } from "@reach/router";
import {createNewUser} from '../../utils/firestore'
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [roles, setRoles] = useState({
    admin: false,
    manager: false,
    worker: false
  });
  const [error, setError] = useState(null);

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  const handleToggle = ({ target }) =>
  setRoles(s => ({ ...s, [target.name]: !s[target.name] }));

  const createUserWithEmailAndPasswordHandler = async (event,displayName,email, password) => {
    event.preventDefault();
    createNewUser(displayName,email,password,generateUserRoles());
   /* setEmail("");
    setPassword("");
    setDisplayName("");*/
  };
  const generateUserRoles = () =>{

    let rolesArray = [roles.admin,roles.manager,roles.worker]
    console.log(rolesArray);
    return rolesArray;
  }
  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
        <form className="">
          <label htmlFor="displayName" className="block">
            Display Name:
          </label>
          <input
            type="text"
            className="my-1 p-1 w-full "
            name="displayName"
            value={displayName}
            placeholder="E.g: Faruq"
            id="displayName"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            className="my-1 p-1 w-full"
            name="userEmail"
            value={email}
            placeholder="E.g: faruq123@gmail.com"
            id="userEmail"
            onChange={event => onChangeHandler(event)}
          />
          
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
           {Object.keys(roles).map(key => (
          <input
            type="checkbox"
            onChange={handleToggle}
            key={key}
            name={key}
            checked={roles[key]}
          />))}
         
          <button
            className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
            onClick={event => {createUserWithEmailAndPasswordHandler(event,displayName, email, password);}}>Sign up
          </button>
        </form>
        <p className="text-center my-3">or</p>
        <button className="bg-red-500 hover:bg-red-600 w-full py-2 text-white">Sign in with Google</button>
        <p className="text-center my-3">Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUp;