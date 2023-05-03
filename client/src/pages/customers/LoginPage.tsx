//Dependencies imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI imports
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Link,
    Grid,
} from "@mui/material";

//Components

const LoginPage: React.FC = () => {
    //Use hooks
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <Container maxWidth='md'>
            <Box sx={{ mt: 8, mb: 6 }}>
                <Typography variant='h4' align='center'>
                    Customer Login
                </Typography>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Typography variant='h6'>Registered Customers</Typography>
                    <Typography variant='body1' gutterBottom>
                        If you have an account, sign in with your email address.
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box mb={2}>
                            <TextField
                                required
                                fullWidth
                                name='email'
                                type='email'
                                label='Email'
                                value={credentials.email}
                                onChange={handleChange}
                            />
                        </Box>
                        <Box mb={3}>
                            <TextField
                                required
                                fullWidth
                                name='password'
                                type='password'
                                label='Password'
                                value={credentials.password}
                                onChange={handleChange}
                            />
                        </Box>
                        <Box mb={2}>
                            <Button
                                // makes text in btm to lowwercase as by default it comes Uppercase in MUI
                                sx={{ textTransform: "none" }}
                                type='submit'
                                fullWidth
                                variant='contained'
                                color='primary'
                            >
                                Sign In
                            </Button>
                        </Box>
                        <Box
                            mb={1}
                            display='flex'
                            justifyContent='space-between'
                        >
                            <Link href='#' variant='body2'>
                                Forgot Password?
                            </Link>
                        </Box>
                    </form>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='h6'>New Customers</Typography>
                    <Typography variant='body1' gutterBottom>
                        Creating an account has many benefits: check out faster,
                        keep more than one address, track orders and more.
                    </Typography>
                    <Box mt={2}>
                        <Button
                            // makes text in btm to lowwercase as by default it comes Uppercase in MUI
                            sx={{ textTransform: "none" }}
                            fullWidth
                            variant='outlined'
                            color='primary'
                            onClick={() => {
                                navigate("/customer/account/create");
                            }}
                        >
                            Create an Account
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default LoginPage;
