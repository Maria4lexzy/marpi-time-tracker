import React from 'react';
import Firebase from './Firebase/Firebase'

import UserProvider from '../providers/UserProvider'

const App = () => (
  <UserProvider>
    <Firebase/>
  </UserProvider>
);

export default App;