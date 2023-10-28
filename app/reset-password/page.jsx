'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const page = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [decodedToken, setDecodedToken] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function verify() {
            try {
                const response = await axios.post('/api/verifytoken', { token });
                if (response.data.error) {
                    setError(response.data.error);
                } else {
                    setDecodedToken(response.data.decodedToken);
                }
            } catch (error) {
                console.error("Token verification failed:", error);
                setError("An error occurred while verifying the token.");
            }
        }
        verify();
    }, [token]);

    return (
        <div>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                // TODO: Here we will implement the form to reset the password 
                // Create Form with 2 fields one is New Password, Confirm Password, Reset Password button
                // when click button of reset password it will hash the password and store it to the database
                // the user can be find out by decoding the token here UID can be used to update the details
                <pre>{JSON.stringify(decodedToken, null, 2)}</pre>
            )}
        </div>
    );
}

export default page;
