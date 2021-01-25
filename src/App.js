import React from 'react';
import Signup from "./components/Signup";
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';
function App() {
  return (
    <AuthProvider>
      <Container className="d-flex alighn-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}> <Signup /></div>
        <h2>I made a change again</h2>
      </Container>
    </AuthProvider>
  );
}

export default App;
