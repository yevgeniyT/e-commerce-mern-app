import React, { useState, ChangeEvent } from "react";
import {
    AppBar,
    Toolbar,
    InputBase,
    Badge,
    IconButton,
    Box,
    styled,
    Typography,
    Paper,
    List,
    ClickAwayListener,
    Container,
} from "@mui/material";

import Popper from "@mui/material/Popper";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PhoneIcon from "@mui/icons-material/Phone";
import SearchIcon from "@mui/icons-material/Search";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { getSerchedProducts } from "features/products/productsThunk";
import ProductDropdownItem from "components/products/ProductSerchListItem";
import { resetSerchInput } from "features/products/productsSlice";
import { useNavigate } from "react-router-dom";

import logo from "../data/logo.png";

// Define a custom styled InputBase component
const CustomInputBase = styled(InputBase)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
    position: "relative",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    width: "100%",
    // height: "45px",
}));

const SerchAndCartBar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { searchResults } = useAppSelector((state) => state.productsR);
    const cart = useAppSelector((state) => state.cartR.cart);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [searchQuery, setSearchQuery] = useState("");
    // to handle dropdown be open. If true it will be open but inittialy by defalt it false
    const open = Boolean(anchorEl);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        setAnchorEl(event.currentTarget);
        if (query.length > 0) {
            dispatch(getSerchedProducts(query));
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSearchQuery("");
        dispatch(resetSerchInput());
    };
    return (
        <AppBar
            position='static'
            color='default'
            sx={{ paddingY: "12px", marginBottom: "32px" }}
        >
            <Container maxWidth='xl'>
                <Toolbar>
                    <Box
                        display='flex'
                        justifyContent='flex-start'
                        flexGrow={1}
                    >
                        <img
                            src={logo}
                            alt='Brand'
                            style={{ width: "150px", height: "auto" }}
                            onClick={() => navigate("/")}
                        />
                    </Box>
                    <ClickAwayListener onClickAway={handleClose}>
                        <Box display='flex' flexGrow={3}>
                            <CustomInputBase
                                placeholder='Search…'
                                inputProps={{ "aria-label": "search" }}
                                onChange={handleSearch}
                                endAdornment={<SearchIcon />}
                                value={searchQuery}
                            />
                            <Popper
                                open={open}
                                anchorEl={anchorEl}
                                placement='bottom'
                            >
                                <Paper
                                    sx={{
                                        backgroundColor: "background.paper",
                                        border: "1px solid",
                                        borderColor: "divider",
                                        maxHeight: "200px",
                                        overflowY: "auto",
                                    }}
                                >
                                    <List>
                                        {searchResults.map((product) => (
                                            <ProductDropdownItem
                                                key={product._id}
                                                product={product}
                                            />
                                        ))}
                                        {searchResults.length === 0 && (
                                            <Typography>
                                                No products found
                                            </Typography>
                                        )}
                                    </List>
                                </Paper>
                            </Popper>
                        </Box>
                    </ClickAwayListener>
                    <Box display='flex' justifyContent='flex-end' flexGrow={1}>
                        <Box display='flex' alignItems='center'>
                            <PhoneIcon style={{ marginRight: "10px" }} />
                            <Typography variant='h6'>
                                +49 (123) 456-7890
                            </Typography>
                        </Box>
                    </Box>

                    <Box display='flex' justifyContent='flex-end' flexGrow={1}>
                        <IconButton
                            color='inherit'
                            onClick={() => {
                                navigate("/chekout/cart");
                            }}
                        >
                            <Badge badgeContent={cart.length} color='error'>
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default SerchAndCartBar;

//TODO Adjust the size of proper to the size of serch input.
//TODO Fix the way serch works, if type correct at once and then incorrect it will not show no products match
