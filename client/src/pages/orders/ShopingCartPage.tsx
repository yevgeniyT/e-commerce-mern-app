import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Grid,
    TextField,
    Button,
    Box,
    Typography,
    Container,
    Radio,
    FormControlLabel,
    ListItem,
    ListItemText,
    Collapse,
    List,
} from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { clearCart, deleteProductFromCart } from "features/cart/cartSlice";

const ShoppingCartPage = () => {
    // use hooks
    const dispatch = useAppDispatch();

    // get access to store data
    const cart = useAppSelector((state) => state.cartR.cart);

    // create an empty object to store initial quantity of each product as 1
    let initialQuantities: Record<string, number> = {};
    // This loop takes every object from cart aray separetly, in that object take _id key value and create new key -value pair in initial empty objecs as id:1. It repeats that for every new object  in  cart array
    for (let productId of cart) {
        initialQuantities[productId._id] = 1;
    }

    //create state that will store quntities of all products. Record<string, number> is a type representing an object where every property key is a string and every property value is a number
    const [quantities, setQuantities] =
        useState<Record<string, number>>(initialQuantities);

    // set state to controll collaps menu open state
    const [open, setOpen] = React.useState(false);
    // set state for delivery options
    const [selectedDelivery, setSelectedDelivery] = React.useState(5);

    //onClick actions
    const handleDeleteProductFromCart = (id: string) => {
        dispatch(deleteProductFromCart(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    // This fanction recieves id from onChange and return inner function that takes whatever we have in quantities state and add id and its value
    const handleUpdateQuantity = (id: string) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            setQuantities({
                ...quantities,
                //[id]  This syntax allows to create a new property in the object using a variable as the key.
                [id]: parseInt(event.target.value),
            });
        };
    };
    // action to open/close collaps menu
    const handleClick = () => {
        setOpen(!open);
    };

    const handleDeliveryOption = (velue: number) => {
        setSelectedDelivery(velue);
    };

    return (
        <Container maxWidth='xl'>
            <Grid container direction='row' spacing={4}>
                <Grid item xs={8}>
                    <Grid item xs sx={{ marginBottom: "16px" }}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'>
                                            Product Name
                                        </TableCell>
                                        <TableCell align='center'>
                                            Price
                                        </TableCell>
                                        <TableCell align='center'>
                                            Quantity
                                        </TableCell>
                                        <TableCell align='center'>
                                            Subtotal
                                        </TableCell>
                                        <TableCell align='center'>
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cart.map((product) => (
                                        <TableRow key={product._id}>
                                            <TableCell
                                                component='th'
                                                scope='row'
                                            >
                                                <Grid container>
                                                    <Grid item xs={2}>
                                                        <img
                                                            src={
                                                                product
                                                                    .images[0]
                                                            } // Replace with actual image source
                                                            alt={product.name}
                                                            style={{
                                                                width: "100%",
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={10}>
                                                        {product.name}
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell align='center'>
                                                {product.price}
                                            </TableCell>

                                            <TableCell align='center'>
                                                <TextField
                                                    type='number'
                                                    defaultValue={1}
                                                    InputProps={{
                                                        inputProps: {
                                                            min: 1,
                                                        },
                                                    }}
                                                    //In this case, '& .MuiInputBase-input' is a CSS selector that selects the element with the class MuiInputBase-input that is a descendant of the element to which you apply the sx prop. The & character is a placeholder that refers to the component on which you are applying the sx prop.
                                                    sx={{
                                                        "& .MuiInputBase-input":
                                                            {
                                                                padding: "8px",
                                                            },
                                                    }}
                                                    // pass id
                                                    onChange={handleUpdateQuantity(
                                                        product._id
                                                    )}
                                                />
                                            </TableCell>

                                            <TableCell align='center'>
                                                {product.price *
                                                    quantities[product._id]}
                                            </TableCell>
                                            <TableCell align='center'>
                                                <IconButton
                                                    color='error'
                                                    onClick={() => {
                                                        handleDeleteProductFromCart(
                                                            product._id
                                                        );
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item>
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Button
                                    color='secondary'
                                    variant='contained'
                                    onClick={handleClearCart}
                                >
                                    Clear Shopping Cart
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Box
                        padding={2}
                        border={1}
                        borderColor='grey.300'
                        bgcolor='#f5f5f5'
                    >
                        <Typography variant='h6'>Summary</Typography>

                        <ListItem
                            button
                            onClick={handleClick}
                            sx={{ paddingLeft: "0", marginBottom: "16px" }}
                        >
                            <ListItemText primary='Delivery Options' />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                            in={open}
                            timeout='auto'
                            unmountOnExit
                            sx={{ marginBottom: "16px" }}
                        >
                            <List component='div' disablePadding>
                                <ListItem
                                    sx={{ paddingTop: "0", paddingBottom: "0" }}
                                >
                                    <FormControlLabel
                                        control={<Radio />}
                                        label='Standard Delivery €5'
                                        checked={selectedDelivery === 5}
                                        onChange={() => handleDeliveryOption(5)}
                                    />
                                </ListItem>
                                <ListItem
                                    sx={{ paddingTop: "0", paddingBottom: "0" }}
                                >
                                    <FormControlLabel
                                        control={<Radio />}
                                        label='Express Delivery €10'
                                        checked={selectedDelivery === 10}
                                        onChange={() =>
                                            handleDeliveryOption(10)
                                        }
                                    />
                                </ListItem>
                                <ListItem
                                    sx={{ paddingTop: "0", paddingBottom: "0" }}
                                >
                                    <FormControlLabel
                                        control={<Radio />}
                                        label='Premium Delivery €20'
                                        checked={selectedDelivery === 20}
                                        onChange={() =>
                                            handleDeliveryOption(20)
                                        }
                                    />
                                </ListItem>
                            </List>
                        </Collapse>
                        <Grid container justifyContent='space-between'>
                            <Grid item>Subtotal</Grid>
                            <Grid item>$600</Grid>
                        </Grid>
                        <Grid container justifyContent='space-between'>
                            <Grid item>Shipping</Grid>
                            <Grid item>€{selectedDelivery}</Grid>
                        </Grid>
                        <Grid container justifyContent='space-between'>
                            <Grid item>Order Total</Grid>
                            <Grid item>$650</Grid>
                        </Grid>

                        <Box marginTop={2}>
                            <Button
                                color='primary'
                                variant='contained'
                                fullWidth
                            >
                                Proceed to Checkout
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ShoppingCartPage;
