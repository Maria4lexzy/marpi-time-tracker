
import React, {useContext} from 'react';
import Can from './Can';
import Calendar from './Calendar'
import {  Redirect } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import {UserContext} from '../providers/UserProvider';

export default function Dashboard() {
    const user = useContext(UserContext);
    return (
     <>
        <Can role={user[1].roles} perform="dashbaord:visit" yes={()=>(<>
        <p>Render Calendar Component + swapping shift settings and other requests and quick actions
        </p>           
        <Calendar/>
        </>
        )}
        no={()=> <Redirect to={ROUTES.SIGN_IN}/>}
        />
    
     </>
    )
}
