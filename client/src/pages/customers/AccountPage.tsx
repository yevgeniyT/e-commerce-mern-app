// UserCard.tsx
import React, { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

//MUI import
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    CardHeader,
    Avatar,
    Box,
    Grid,
} from "@mui/material";

import { BaseCustomer } from "types/customerType";

import { getCustomerProfile } from "features/customers/customersThunk";

const onEdit = () => {};

const onChangePassword = () => {};

const CustomerAccount: React.FC = () => {
    //use hooks
    const dispatch = useAppDispatch();
    const dispatched = useRef(false);

    const customerData = useAppSelector((state) => state.customerR.customer);

    useEffect(() => {
        if (!dispatched.current) {
            dispatch(getCustomerProfile());
            dispatched.current = true;
        }
    }, [dispatch]);

    return (
        <Grid container spacing={4} direction='column'>
            <Grid item xs={12}>
                <Card sx={{ width: "100%", maxWidth: 600 }}>
                    <Grid container>
                        <Grid item xs={12} md={4}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    p: 2,
                                }}
                            >
                                <Avatar
                                    alt={`${customerData?.firstName} ${customerData?.lastName}`}
                                    src={customerData?.avatarImage}
                                    sx={{
                                        width: 150,
                                        height: 150,
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <CardHeader
                                title={`${customerData?.firstName} ${customerData?.lastName}`}
                            />
                            <CardContent>
                                <Typography variant='body1' gutterBottom>
                                    <strong>email: </strong>{" "}
                                    {`${customerData?.email}`}
                                </Typography>
                                <Typography variant='body1' gutterBottom>
                                    <strong>phone: </strong>
                                    {customerData?.phone
                                        ? customerData.phone
                                        : "No phone number available"}
                                </Typography>
                            </CardContent>
                            <CardActions
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    paddingRight: "1rem",
                                }}
                            >
                                <Button
                                    size='small'
                                    onClick={onChangePassword}
                                    color='error'
                                >
                                    Change password
                                </Button>
                                <Button size='small' onClick={onEdit}>
                                    Edit
                                </Button>
                            </CardActions>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card sx={{ width: "100%", maxWidth: 600 }}>
                    <Grid container>
                        <Grid item xs={12} md={8}>
                            <CardHeader title={"Default Billing Address"} />
                            <CardContent>
                                <Typography variant='body1' gutterBottom>
                                    <strong>Street:</strong>{" "}
                                    {customerData?.billingAddress.street
                                        ? customerData.billingAddress.street
                                        : "Not available"}
                                </Typography>
                                <Typography variant='body1' gutterBottom>
                                    <strong>City:</strong>{" "}
                                    {customerData?.billingAddress.city
                                        ? customerData.billingAddress.city
                                        : "Not available"}
                                </Typography>
                                <Typography variant='body1' gutterBottom>
                                    <strong>State:</strong>{" "}
                                    {customerData?.billingAddress.state
                                        ? customerData.billingAddress.state
                                        : "Not available"}
                                </Typography>
                                <Typography variant='body1' gutterBottom>
                                    <strong>Zip:</strong>{" "}
                                    {customerData?.billingAddress.zip
                                        ? customerData.billingAddress.zip
                                        : "Not available"}
                                </Typography>
                                <Typography variant='body1' gutterBottom>
                                    <strong>Country:</strong>{" "}
                                    {customerData?.billingAddress.country
                                        ? customerData.billingAddress.country
                                        : "Not available"}
                                </Typography>
                            </CardContent>

                            <CardActions
                                sx={{
                                    display: "flex",
                                    justifyContent: "right",
                                    paddingRight: "1rem",
                                }}
                            >
                                <Button size='small' onClick={onEdit}>
                                    Edit
                                </Button>
                            </CardActions>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card sx={{ width: "100%", maxWidth: 600 }}>
                    <Grid container>
                        <Grid item xs={12} md={8}>
                            <CardHeader title={"Default Shipping Address"} />
                            <CardContent sx={{ width: "100%" }}>
                                <Typography variant='body1' gutterBottom>
                                    <strong>Street:</strong>{" "}
                                    {customerData?.billingAddress.street
                                        ? customerData.billingAddress.street
                                        : "Not available"}
                                </Typography>
                                <Typography variant='body1' gutterBottom>
                                    <strong>City:</strong>{" "}
                                    {customerData?.billingAddress.city
                                        ? customerData.billingAddress.city
                                        : "Not available"}
                                </Typography>
                                <Typography variant='body1' gutterBottom>
                                    <strong>State:</strong>{" "}
                                    {customerData?.billingAddress.state
                                        ? customerData.billingAddress.state
                                        : "Not available"}
                                </Typography>
                                <Typography variant='body1' gutterBottom>
                                    <strong>Zip:</strong>{" "}
                                    {customerData?.billingAddress.zip
                                        ? customerData.billingAddress.zip
                                        : "Not available"}
                                </Typography>
                                <Typography variant='body1' gutterBottom>
                                    <strong>Country:</strong>{" "}
                                    {customerData?.billingAddress.country
                                        ? customerData.billingAddress.country
                                        : "Not available"}
                                </Typography>
                            </CardContent>

                            <CardActions
                                sx={{
                                    display: "flex",
                                    justifyContent: "right",
                                    paddingRight: "1rem",
                                }}
                            >
                                <Button size='small' onClick={onEdit}>
                                    Edit
                                </Button>
                            </CardActions>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    );
};
export default CustomerAccount;

//todo Update shipping adress from state
// todo make contend of dellivery cards take 100% width
// todo check when click return btn and come backe to login page again it goes to profile by defualt
