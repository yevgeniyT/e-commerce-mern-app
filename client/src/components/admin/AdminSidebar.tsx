import React, { useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { useNavigate } from "react-router-dom";
import {
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Grid,
    Box,
    Avatar,
    Typography,
    Button,
    Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { getCustomerProfile } from "features/customers/customersThunk";

const AdminSidebar = () => {
    const dispatch = useAppDispatch();
    const dispatched = useRef(false);
    const customerData = useAppSelector((state) => state.customerR.customer);

    useEffect(() => {
        if (!dispatched.current) {
            dispatch(getCustomerProfile());
            dispatched.current = true;
        }
    }, [dispatch]);

    const navigate = useNavigate();

    const [openProducts, setOpenProducts] = useState(false);
    const [openCustomers, setOpenCustomers] = useState(false);
    const [openOrders, setOpenOrders] = useState(false);

    const handleClickProducts = () => {
        setOpenProducts(!openProducts);
    };

    const handleClickCustomers = () => {
        setOpenCustomers(!openCustomers);
    };

    const handleClickOrders = () => {
        setOpenOrders(!openOrders);
    };
    const goTo = (path: string) => {
        navigate(path);
    };
    return (
        <List>
            <Card sx={{ width: "100%", maxWidth: 400, marginBottom: "16px" }}>
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
                                    width: 75,
                                    height: 75,
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <CardHeader
                            title={`Admin`}
                            subheader={`${customerData?.firstName} ${customerData?.lastName}`}
                        />
                        <CardContent
                            sx={{ paddingTop: "0", paddingBottom: "0" }}
                        >
                            <Typography variant='body1' gutterBottom>
                                <strong>Email: </strong>{" "}
                                {`${customerData?.email}`}
                            </Typography>
                        </CardContent>
                        <CardActions
                            sx={{
                                display: "flex",
                                justifyContent: "right",
                                paddingRight: "1rem",
                            }}
                        >
                            <Button
                                size='small'
                                onClick={() => goTo("/admin/account/edit")}
                            >
                                Edit
                            </Button>
                        </CardActions>
                    </Grid>
                </Grid>
            </Card>
            <ListSubheader>
                <Typography variant='h6'>Admin Dashboard Actions</Typography>
            </ListSubheader>
            <ListItem onClick={handleClickProducts}>
                <ListItemText primary='Products' />
                {openProducts ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openProducts} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    <ListItem
                        button
                        onClick={() => goTo("/admin/account/products")}
                    >
                        <ListItemText
                            sx={{ marginLeft: "16px" }}
                            primary='Products'
                        />
                    </ListItem>

                    <ListItem
                        button
                        onClick={() =>
                            goTo("/admin/account/products/create-new-product")
                        }
                    >
                        <ListItemText
                            sx={{ marginLeft: "16px" }}
                            primary='Add New Product'
                        />
                    </ListItem>

                    <ListItem
                        button
                        onClick={() => goTo("/admin/account/categories")}
                    >
                        <ListItemText
                            sx={{ marginLeft: "16px" }}
                            primary='Categories'
                        />
                    </ListItem>

                    <ListItem
                        button
                        onClick={() => goTo("/admin/account/brands")}
                    >
                        <ListItemText
                            sx={{ marginLeft: "16px" }}
                            primary='Brands'
                        />
                    </ListItem>
                </List>
            </Collapse>
            <ListItem onClick={handleClickCustomers}>
                <ListItemText primary='Customers' />
                {openCustomers ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openCustomers} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    <ListItem
                        button
                        onClick={() => goTo("/admin/account/customers")}
                    >
                        <ListItemText
                            sx={{ marginLeft: "16px" }}
                            primary='All Customers'
                        />
                    </ListItem>
                </List>
            </Collapse>
            <ListItem onClick={handleClickOrders}>
                <ListItemText primary='Orders' />
                {/* If openOrders is true, it renders the <ExpandLess /> component (an up arrow icon). If openOrders is false, it renders the <ExpandMore /> component (a down arrow icon). */}
                {openOrders ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            {/* openOrders is true, the nested list will be shown, otherwise it will be hidden. The timeout='auto' prop automatically calculates the duration of the animation, and unmountOnExit unmounts the child components when they are not visible, which can improve performance. */}
            <Collapse in={openOrders} timeout='auto' unmountOnExit>
                {/* component='div' tells Material-UI to use a div HTML element for this List, and disablePadding removes the padding from the List. */}
                <List component='div' disablePadding>
                    <ListItem
                        button
                        onClick={() => goTo("/admin/account/orders")}
                    >
                        <ListItemText
                            sx={{ marginLeft: "16px" }}
                            primary='All orders'
                        />
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
};

export default AdminSidebar;
