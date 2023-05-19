import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

const EmptyCartPage = () => {
    const navigate = useNavigate();

    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            height='100vh'
            gap={2}
        >
            <ShoppingCartIcon style={{ fontSize: 100 }} color='disabled' />
            <Typography variant='h5' color='textSecondary'>
                Your Shopping Cart is empty
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
                Looks like you haven't added any items to your cart yet.
            </Typography>
            <Button
                variant='contained'
                color='primary'
                onClick={() => navigate("/products")}
            >
                Go Back To Products
            </Button>
        </Box>
    );
};

export default EmptyCartPage;
