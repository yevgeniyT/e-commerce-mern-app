import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";

const FooterSubscriptionBar: React.FC = () => {
    const [email, setEmail] = useState("");

    const handleSubscription = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Here, you can implement your subscription logic, maybe send this email to your backend
        alert(`Subscribed with email: ${email}`);
        setEmail(""); // Clear the input
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    return (
        <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            justifyContent='center'
            padding='2rem'
            border='1px solid #efefef'
            borderRadius='8px'
            bgcolor='#fafafa'
        >
            <Box marginRight='1rem'>
                <Typography variant='h5' color='textPrimary'>
                    Subscribe to our Newsletter!
                </Typography>
            </Box>
            <Box flexBasis='70%'>
                <form onSubmit={handleSubscription}>
                    <Box display='flex' alignItems='center'>
                        <TextField
                            variant='outlined'
                            placeholder='Your email'
                            value={email}
                            onChange={handleEmailChange}
                            sx={{
                                "& .MuiInputBase-input": {
                                    padding: "6px 8px",
                                },
                                marginRight: "16px",
                                flexBasis: "70%",
                            }}
                        />
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                        >
                            Subscribe
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default FooterSubscriptionBar;
