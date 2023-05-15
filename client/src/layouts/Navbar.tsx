import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    Avatar,
    Menu,
    MenuItem,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "redux/hooks";
import { logOutCustomer } from "features/customers/customersThunk";

const Navbar: React.FC = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.customerR.isLoggedIn);
    const { avatarImage, isAdmin } = useAppSelector(
        (state) => state.customerR.csutomerShortData
    );
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

    const handleLogOutCustomer = () => {
        dispatch(logOutCustomer());
        navigate("/");
    };

    const handleLogOutAdmin = () => {};

    return (
        <AppBar position='static'>
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "70%",
                    margin: "auto",
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
                                {isAdmin ? (
                                    <>
                                        <MenuItem
                                            onClick={() =>
                                                goTo("/admin-dashbord")
                                            }
                                        >
                                            Admin Dashboard
                                        </MenuItem>
                                        <MenuItem onClick={handleLogOutAdmin}>
                                            Sign Out
                                        </MenuItem>
                                    </>
                                ) : (
                                    <>
                                        <MenuItem
                                            onClick={() =>
                                                goTo("/user-dashbord")
                                            }
                                        >
                                            Profile
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => goTo("/my-orders")}
                                        >
                                            My Orders
                                        </MenuItem>
                                        <MenuItem
                                            onClick={handleLogOutCustomer}
                                        >
                                            Sign Out
                                        </MenuItem>
                                    </>
                                )}
                            </Menu>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
