import React, { useRef, useState } from 'react';
import {  Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from './Firebase/context';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
   
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center">404. Error</h2>
                    {/* {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>} */}
                    
                    <div className="w-100 text-center mt-3">
                        <p>Page not found</p>
                    </div>
                </Card.Body>
            </Card>
           
        </>
    );
}



