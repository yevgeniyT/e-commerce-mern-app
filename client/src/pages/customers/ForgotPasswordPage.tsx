//The ForgotPasswordPage component is responsible for rendering a form that allows users to enter their email address and request a password reset link. It uses the forgotPassword async thunk from the authThanks feature to send the email to the server, and conditionally renders a loading indicator, error message, or success message based on the request's status. The component also disables the "Send Reset Link" button after a successful request to prevent users from sending multiple requests.

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { Container, Box, Typography, TextField, Button } from "@mui/material";

import { forgotPassword } from "../../features/customers/customersThunk";
import Loading from "../../components/common/Loading";

const ForgotPasswordPage: React.FC = () => {
    //  Hooks to dispatch actions and access state from the Redux store
    const dispatch = useAppDispatch();
    // get data from state to handle conditional rendering based on lodaing status
    const { loading, success } = useAppSelector((state) => state.customerR);
    // Local state for the email input field and requestSent status
    const [email, setEmail] = useState("");

    // Add a new state variable to track if the reset link was sent
    const [requestSent, setRequestSent] = useState(false);

    // Function to handle form submission
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(forgotPassword(email));
    };
    // useEffect to update the requestSent state when the request is successful
    useEffect(() => {
        if (success) {
            setRequestSent(true);
        }
    }, [success]);
    if (loading) {
        return <Loading />;
    }
    return (
        <Container maxWidth='sm'>
            <Box sx={{ mt: 8 }}>
                <Typography variant='h4' align='center'>
                    Forgot Password
                </Typography>
                <Typography variant='body1' align='center'>
                    Please enter your email address below to receive a password
                    reset link
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box mt={2}>
                        <TextField
                            required
                            fullWidth
                            name='email'
                            type='email'
                            label='Email'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Box>
                    <Box mt={2}>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            // Disable btn when loading and when link is sent once
                            disabled={loading || requestSent}
                        >
                            Send Reset Link
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default ForgotPasswordPage;
