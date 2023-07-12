import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import DropIn from "braintree-web-drop-in-react";

import { getClientPaymentToken } from "features/cart/cartThunk";

import {
    Grid,
    ListItem,
    ListItemText,
    Container,
    List,
    Card,
    Collapse,
    CardContent,
    Typography,
    Button,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const PaymentPage = () => {
    const dispatch = useAppDispatch();

    const clientToken = useAppSelector(
        (state) => state.cartR.clientPaymentToken
    );

    const customer = useAppSelector((state) => state.customerR.customer);

    const [instanse, setInstance] = useState("");
    const [openBillingAdress, setOpenBillingAdress] = useState(false);
    const [openShippingAddress, setOpenShippingAddress] = useState(false);

    const isLoggedIn = useAppSelector((state) => state.customerR.isLoggedIn);

    const handleClickProducts = () => {
        setOpenBillingAdress(!openBillingAdress);
    };

    const handleClickCustomers = () => {
        setOpenShippingAddress(!openShippingAddress);
    };
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getClientPaymentToken());
        }
    }, [dispatch, isLoggedIn]);

    return (
        <Container
            maxWidth='xl'
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography variant='h2'>Checkout page</Typography>
            <Grid
                container
                xs={6}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <List>
                    <ListItem onClick={handleClickProducts}>
                        <ListItemText primary='Billing Address' />
                        {openBillingAdress ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse
                        in={openBillingAdress}
                        timeout='auto'
                        unmountOnExit
                    >
                        <Card>
                            <Grid container direction='column'>
                                <Grid xs={10}>
                                    <CardContent
                                        sx={{
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Typography
                                            variant='body1'
                                            color='text.secondary'
                                        >
                                            Street:{" "}
                                            {customer?.billingAddress.street}
                                        </Typography>
                                        <Typography
                                            variant='body1'
                                            color='text.secondary'
                                        >
                                            City:{" "}
                                            {customer?.billingAddress.city}
                                        </Typography>
                                        <Typography
                                            variant='body1'
                                            color='text.secondary'
                                        >
                                            Zip: {customer?.billingAddress.zip}
                                        </Typography>
                                        <Typography
                                            variant='body1'
                                            color='text.secondary'
                                        >
                                            Country:{" "}
                                            {customer?.billingAddress.country}
                                        </Typography>
                                    </CardContent>
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "right",
                                        paddingRight: "1rem",
                                    }}
                                >
                                    <Button
                                        size='small'
                                        // onClick={() => goTo("/admin/account/edit")}
                                    >
                                        Edit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Card>
                    </Collapse>
                    <ListItem onClick={handleClickCustomers}>
                        <ListItemText primary='Shipping Address' />
                        {openShippingAddress ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse
                        in={openShippingAddress}
                        timeout='auto'
                        unmountOnExit
                    >
                        <Card>
                            <Grid container direction='column'>
                                <Grid xs={10}>
                                    <CardContent
                                        sx={{
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Typography
                                            variant='body1'
                                            color='text.secondary'
                                        >
                                            Street:{" "}
                                            {customer?.shippingAddress.street}
                                        </Typography>
                                        <Typography
                                            variant='body1'
                                            color='text.secondary'
                                        >
                                            City:{" "}
                                            {customer?.shippingAddress.city}
                                        </Typography>
                                        <Typography
                                            variant='body1'
                                            color='text.secondary'
                                        >
                                            Zip: {customer?.shippingAddress.zip}
                                        </Typography>
                                        <Typography
                                            variant='body1'
                                            color='text.secondary'
                                        >
                                            Country:{" "}
                                            {customer?.shippingAddress.country}
                                        </Typography>
                                    </CardContent>
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "right",
                                        paddingRight: "1rem",
                                    }}
                                >
                                    <Button
                                        size='small'
                                        // onClick={() => goTo("/admin/account/edit")}
                                    >
                                        Edit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Card>
                    </Collapse>
                </List>
                <Grid item>
                    <DropIn
                        options={{
                            authorization: clientToken,
                        }}
                        onInstance={(instance) => instance}
                    />
                </Grid>

                <Button
                    size='small'
                    // onClick={() => goTo("/admin/account/edit")}
                >
                    Buy now
                </Button>
            </Grid>
        </Container>
    );
};

export default PaymentPage;
