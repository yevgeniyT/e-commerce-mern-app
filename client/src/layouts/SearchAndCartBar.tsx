import React from "react";
import {
    AppBar,
    Toolbar,
    InputBase,
    Badge,
    IconButton,
    Box,
    styled,
    Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PhoneIcon from "@mui/icons-material/Phone";
import SearchIcon from "@mui/icons-material/Search";

// Define a custom styled InputBase component
const CustomInputBase = styled(InputBase)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
    position: "relative",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    width: "100%",
    height: "45px",
}));

const SerchAndCartBar = () => {
    return (
        <AppBar
            position='static'
            color='default'
            sx={{ paddingY: "12px", marginBottom: "32px" }}
        >
            <Toolbar style={{ width: "70%", margin: "auto" }}>
                <Box display='flex' justifyContent='flex-start' flexGrow={1}>
                    <Typography variant='h4' component='h1'>
                        Your Brand
                    </Typography>
                </Box>
                <Box display='flex' justifyContent='center' flexGrow={3}>
                    <CustomInputBase
                        placeholder='Search…'
                        inputProps={{ "aria-label": "search" }}
                        endAdornment={<SearchIcon />}
                    />
                </Box>
                <Box display='flex' justifyContent='flex-end' flexGrow={1}>
                    <Typography variant='h6'>
                        <PhoneIcon /> (123) 456-7890
                    </Typography>
                </Box>
                <Box display='flex' justifyContent='flex-end' flexGrow={1}>
                    <IconButton color='inherit'>
                        <Badge badgeContent={4} color='error'>
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default SerchAndCartBar;
