import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
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

    const handleLogOut = () => {
        dispatch(logOutCustomer());
        navigate("/");
    };

    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    onClick={() => goTo("/")}
                >
                    {/* Add your logo/icon here */}
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    E-commerce app
                </Typography>
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
                            >
                                {/* Add your avatar image here */}
                            </Avatar>

                            <Menu
                                id='simple-menu'
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem
                                    onClick={() => goTo("/user-dashbord")}
                                >
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={() => goTo("/my-orders")}>
                                    My Orders
                                </MenuItem>
                                <MenuItem onClick={handleLogOut}>
                                    Sign Out
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                    {/*         
          <Button color="inherit" onClick={handleLoginLogout}>
            {loggedIn ? 'Logout' : 'Login'}
          </Button> */}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
