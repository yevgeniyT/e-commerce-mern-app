import React, { useState, useEffect } from "react";
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
import EmptyCartPage from "./EmptyCartPage";
import { OrderType } from "types/ordersTypes";
import { createNewOrder } from "features/cart/cartThunk";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ShoppingCartPage = () => {
    // use hooks
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // get access to store data
    const cart = useAppSelector((state) => state.cartR.cart);
    const isLoggedIn = useAppSelector((state) => state.customerR.isLoggedIn);

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
    const [open, setOpen] = useState(false);
    // set state for delivery options
    const [selectedDelivery, setSelectedDelivery] = useState(5);

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
    // We take every object from cart, take price value in that object and * to value from object quantities (it has key id and value quantity). as a result we reciev new array with values on product quantity and price, like [12, 168, 367]
    const subtotalValuesArray = cart.map((product) => {
        return product.price * quantities[product._id];
    });
    // .reduce((a, b) => a + b, 0)
    // This part uses the reduce() method on the new array. The reduce() method is used to reduce an array to a single value. It takes a function and an initial value as arguments.
    // The function (a, b) => a + b is an arrow function that takes two arguments (a and b). For each item in the array, "a" is the accumulated value so far, and "b" is the current item value. The function returns the sum of "a" and "b".
    // The initial value is 0. This is the value of "a" the first time the function is called.
    // First itaration: acc = 0, value = 12, return 0+12 = 12
    // Second itaration acc = 12,, value = 168, return 12+168 = 180
    const subtotalValue = subtotalValuesArray.reduce(
        (acc, value) => acc + value,
        0
    );
    console.log(isLoggedIn);

    const handleCheckoutProceed = () => {
        if (!isLoggedIn) {
            toast.error("Please log in to proceed");
            return;
        }
        const items = cart.map((product) => ({
            product: product._id,
            quantity: quantities[product._id],
            price: product.price * quantities[product._id],
        }));

        const newOrder: OrderType = {
            items: items,
            deliveryCost: selectedDelivery,
            totalPrice: subtotalValue + selectedDelivery,
        };

        try {
            dispatch(createNewOrder(newOrder));
            dispatch(clearCart());
            navigate("/checkout/payment");
        } catch (error: any) {
            toast(
                `Failed to proceed to checkout: ${
                    error.message || "Unknown error"
                }`
            );
        }
    };

    return (
        <Container maxWidth='xl'>
            {cart.length === 0 ? (
                <EmptyCartPage />
            ) : (
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
                                                                }
                                                                alt={
                                                                    product.name
                                                                }
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
                                                    {product.price.toLocaleString(
                                                        "de-DE",
                                                        {
                                                            style: "currency",
                                                            currency: "EUR",
                                                        }
                                                    )}
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
                                                                    padding:
                                                                        "8px",
                                                                },
                                                        }}
                                                        // pass id
                                                        onChange={handleUpdateQuantity(
                                                            product._id
                                                        )}
                                                    />
                                                </TableCell>

                                                <TableCell align='center'>
                                                    {(
                                                        product.price *
                                                        quantities[product._id]
                                                    ).toLocaleString("de-DE", {
                                                        style: "currency",
                                                        currency: "EUR",
                                                    })}
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
                                        sx={{
                                            paddingTop: "0",
                                            paddingBottom: "0",
                                        }}
                                    >
                                        <FormControlLabel
                                            control={<Radio />}
                                            label='Standard Delivery €5'
                                            checked={selectedDelivery === 5}
                                            onChange={() =>
                                                handleDeliveryOption(5)
                                            }
                                        />
                                    </ListItem>
                                    <ListItem
                                        sx={{
                                            paddingTop: "0",
                                            paddingBottom: "0",
                                        }}
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
                                        sx={{
                                            paddingTop: "0",
                                            paddingBottom: "0",
                                        }}
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
                                <Grid item>
                                    {subtotalValue.toLocaleString("de-DE", {
                                        style: "currency",
                                        currency: "EUR",
                                    })}
                                </Grid>
                            </Grid>
                            <Grid container justifyContent='space-between'>
                                <Grid item>Shipping</Grid>
                                <Grid item>
                                    €
                                    {selectedDelivery.toLocaleString("de-DE", {
                                        style: "currency",
                                        currency: "EUR",
                                    })}
                                </Grid>
                            </Grid>
                            <Grid container justifyContent='space-between'>
                                <Grid item>Order Total</Grid>
                                <Grid item>
                                    {(
                                        subtotalValue + selectedDelivery
                                    ).toLocaleString("de-DE", {
                                        style: "currency",
                                        currency: "EUR",
                                    })}
                                </Grid>
                            </Grid>

                            <Box marginTop={2}>
                                <Button
                                    color='primary'
                                    variant='contained'
                                    fullWidth
                                    onClick={handleCheckoutProceed}
                                >
                                    Proceed to Checkout
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default ShoppingCartPage;

//TODO Clear cart after procced to checkout after checking if the user is logged in
