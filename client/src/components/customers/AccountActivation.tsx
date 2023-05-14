import React, { useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";
// Used to grab token from url parameter /:token
import { useParams } from "react-router";

// MUI components imports
import { Container, Typography, Box, Button } from "@mui/material";

// Other component import
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { verifyNewCustomer } from "features/customers/customersThunk";

const AccountActivation: React.FC = () => {
    // Create variablese to use hooks
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    //Whhen you use useRef, updating the ref does not trigger a re-render. This means that the useEffect only runs when its dependencies (dispatch and token) change. while both useState and useRef can be used to store values across renders, updating a state variable with useState triggers a re-render, whereas updating a ref with useRef does not.
    //TODO how useRef works and how it differ from useState
    const dispatched = useRef(false);

    // 1. Get token from the URL
    const { token } = useParams();

    // 2. Get states from store to handle deiifent varification cases
    const { error, success, message } = useAppSelector(
        (state) => state.customerR
    );

    // 3. Send token authThank to be send next to backend as post request
    useEffect(() => {
        if (token && !dispatched.current) {
            dispatch(verifyNewCustomer(token));
            dispatched.current = true; // Update the dispatched ref
        }
    }, [dispatch, token]);

    //4. Redirect user incase of sucess to loding page. Using useEffect insted if conditional rendering in this case is to have more control over side effects like navigation. Since navigation is a side effect, it's a good practice to handle it inside a useEffect.
    useEffect(() => {
        if (success) {
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    }, [success, message, navigate]);

    if (error) {
        return (
            <Container maxWidth='sm'>
                <Box sx={{ mt: 8 }}>
                    <Box textAlign='center'>
                        <Typography variant='h4'>
                            Verification Failed
                        </Typography>
                        <Typography variant='body1'>
                            The email verification failed. This could be due to
                            an expired or invalid token.
                        </Typography>
                        <Box mt={2}>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={() => {
                                    navigate("/customer/account/create");
                                }}
                            >
                                Complete registration again
                            </Button>
                        </Box>
                        <Box mt={2}>
                            <Typography variant='body2'>
                                If you continue to experience issues, please{" "}
                                <a href='mailto:support@example.com'>
                                    contact support
                                </a>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        );
    }

    // Render a different component or content for success case, or simply return null
    return null;
};

export default AccountActivation;
