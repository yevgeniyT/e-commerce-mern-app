import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    Avatar,
    Menu,
    MenuItem,
    Container,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "redux/hooks";
import { logOutCustomer } from "features/customers/customersThunk";

const Navbar: React.FC = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.customerR.isLoggedIn);

    const customer = useAppSelector((state) => state.customerR.customer);

    let avatarImage, isAdmin;

    if (customer) {
        avatarImage = customer.avatarImage;
        isAdmin = customer.isAdmin;
    }

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const goTo = (path: string) => {
        navigate(path);
        handleClose();
    };

    const handleLogOut = () => {
        console.log("logout action");

        dispatch(logOutCustomer());
        navigate("/");
    };

    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Box display='flex'>
                        <Button
                            color='inherit'
                            onClick={() => goTo("/")}
                            sx={{ textTransform: "capitalize" }}
                        >
                            Location
                        </Button>
                        <Button
                            color='inherit'
                            onClick={() => goTo("/")}
                            sx={{ textTransform: "capitalize" }}
                        >
                            Operating Hours
                        </Button>
                        <Button
                            color='inherit'
                            onClick={() => goTo("/")}
                            sx={{ textTransform: "capitalize" }}
                        >
                            Delivery & Payment
                        </Button>
                        <Button
                            color='inherit'
                            onClick={() => goTo("/")}
                            sx={{ textTransform: "capitalize" }}
                        >
                            About Us
                        </Button>
                        <Button
                            color='inherit'
                            onClick={() => goTo("/")}
                            sx={{ textTransform: "capitalize" }}
                        >
                            Contact Us
                        </Button>
                    </Box>
                    <Box display='flex' alignItems='center'>
                        {!isLoggedIn && (
                            <Button
                                color='inherit'
                                onClick={() => goTo("/customer/account/login")}
                            >
                                Sign in
                            </Button>
                        )}

                        {isLoggedIn && (
                            <>
                                <Avatar
                                    aria-controls='simple-menu'
                                    aria-haspopup='true'
                                    onClick={handleClick}
                                    src={avatarImage}
                                    sx={{
                                        marginLeft: "16px",
                                        cursor: "pointer",
                                    }}
                                ></Avatar>
                                <Menu
                                    id='simple-menu'
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    {isAdmin
                                        ? [
                                              <MenuItem
                                                  key='admin-dashboard'
                                                  onClick={() =>
                                                      goTo(
                                                          "/admin/account/products"
                                                      )
                                                  }
                                              >
                                                  Admin Dashboard
                                              </MenuItem>,
                                              <MenuItem
                                                  key='logout'
                                                  onClick={handleLogOut}
                                              >
                                                  Sign Out
                                              </MenuItem>,
                                          ]
                                        : [
                                              <MenuItem
                                                  key='profile'
                                                  onClick={() =>
                                                      goTo("customer/account")
                                                  }
                                              >
                                                  Profile
                                              </MenuItem>,
                                              <MenuItem
                                                  key='my-orders'
                                                  onClick={() =>
                                                      goTo("/my-orders")
                                                  }
                                              >
                                                  My Orders
                                              </MenuItem>,
                                              <MenuItem
                                                  key='logout'
                                                  onClick={handleLogOut}
                                              >
                                                  Sign Out
                                              </MenuItem>,
                                          ]}
                                </Menu>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
