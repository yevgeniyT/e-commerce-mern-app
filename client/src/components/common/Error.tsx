import React from "react";

import { Box, Typography } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const AnimatedErrorOutlineIcon = styled(ErrorOutlineIcon)`
    font-size: 6rem;
    animation: ${rotation} 3s infinite linear;
    color: #f44336;
`;

const Error = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "50vh",
                textAlign: "center",
            }}
        >
            <AnimatedErrorOutlineIcon />
            <Typography variant='h4' mt={2}>
                Oops! Something went wrong.
            </Typography>
            <Typography variant='subtitle1' mt={1}>
                We couldn't fetch the data. Please try again later.
            </Typography>
        </Box>
    );
};

export default Error;
