// import React from 'react'
// import { Redirect, Route } from 'react-router-dom';
// import { useAuth } from './Firebase/context';
// export default function PrivateRoute({ component: Component, ...rest }) {
//     const { currentUser } = useAuth();
//     return (
//         <Route    {...rest}
//             render={props => {
//                 return currentUser ? <Component {...props} /> : <Redirect to="/login" />
//             }}>

//         </Route>
//     )
// }
import React from 'react'

export default function PrivateRoute() {
    return (
        <div>

        </div>
    )
}
