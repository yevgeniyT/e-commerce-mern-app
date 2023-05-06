import React, { useEffect, useState, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

// MUI components imports
import { Container, Typography, Box, Button } from "@mui/material";

// Other component import
import { resetPasswordVarification } from "../../features/customers/customersThunk";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const ResetPasswordActivation: React.FC = () => {
    // Create variablese to use hooks
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const dispatched = useRef(false);
    // Create state to get email from backend response, store it and send using useNAvigate hook to ResetPasswordPage
    const [email, setEmail] = useState("");

    // 2. Get token from the URL
    const { token } = useParams();

    // 3. Get states from store to handle deiifent varification cases
    const { success, error } = useAppSelector((state) => state.customerR);

    // 3. Send token authThank to be send next to backend as post request. And get email from response while request to verification reset password router in backend, as it returns email needed to be paased with passowrd in reset request to identify user in DB
    useEffect(() => {
        if (token && !dispatched.current) {
            dispatch(resetPasswordVarification(token as string)).then(
                (response) => {
                    setEmail(response.payload.payload.email);
                }
            );
            dispatched.current = true;
        }
    }, [dispatch, token]);
    // 4. Redirect user incase of sucess to loding page. Using useEffect insted if conditional rendering in this case is to have more control over side effects like navigation. Since navigation is a side effect, it's a good practice to handle it inside a useEffect.
    useEffect(() => {
        if (success) {
            setTimeout(() => {
                navigate(
                    "/customer/account/resetpassword",
                    //The navigate function accepts a second argument, which is an object containing navigation options. One of the properties in this object is state, which can be used to pass data between components during navigation. Need to pass email to next step to be sent to backend in order to find user by email
                    {
                        state: { email: email },
                    }
                );
            }, 1500);
        }
    }, [success, navigate, email]);

    if (error) {
        return (
            <Container maxWidth='sm'>
                <Box sx={{ mt: 8 }}>
                    <Box textAlign='center'>
                        <Typography variant='h4'>
                            Reset password Failed
                        </Typography>
                        <Typography variant='body1'>
                            Reset password Failed. This could be due to an
                            expired or invalid token.
                        </Typography>
                        <Box mt={2}>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={() => {
                                    navigate("/customer/account/create");
                                }}
                            >
                                Try again
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

export default ResetPasswordActivation;
