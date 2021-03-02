import React, {useContext} from 'react'
import { Redirect, Route } from 'react-router-dom';
import * as ROUTES from './routes';
import { UserContext } from '../providers/UserProvider'
export default function PrivateRoute({ component: Component, ...rest }) {
    const user = useContext(UserContext);

    return (
        <Route    {...rest}
            render={props => {
                return user ? <Component {...props} /> : <Redirect to={ROUTES.SIGN_IN} />
            }}>

        </Route>
    )
          }

    

