import React from "react";

import { Box, Typography } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const NoProductFound = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                textAlign: "center",
                mt: 4,
            }}
        >
            <SentimentDissatisfiedIcon
                sx={{
                    fontSize: "5rem",
                    color: "primary.main",
                }}
            />
            <Typography variant='h4' component='h1' gutterBottom>
                Oops! No data found.
            </Typography>
            <Typography variant='h6' component='h2'>
                We do not have any products matching your filter.
            </Typography>
            <Typography variant='subtitle1' component='p' mt={1}>
                Please try use other filters.
            </Typography>
        </Box>
    );
};

export default NoProductFound;
