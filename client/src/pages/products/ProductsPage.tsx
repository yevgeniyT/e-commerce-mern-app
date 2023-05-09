import React, { useState } from "react";
import {
    Grid,
    IconButton,
    Select,
    MenuItem,
    Typography,
    Box,
} from "@mui/material";
import { ViewList, ViewModule } from "@mui/icons-material";
import { SelectChangeEvent } from "@mui/material/Select";
import FilterSidebar from "layouts/Sidebar";

const ProductPage = () => {
    const [layout, setLayout] = useState("cards");
    const [sortOption, setSortOption] = useState("default");
    const [productsPerPage, setProductsPerPage] = useState("10");

    const handleLayoutChange = (newLayout: string) => {
        setLayout(newLayout);
    };

    const handleSortOptionChange = (event: SelectChangeEvent) => {
        setSortOption(event.target.value as string);
    };

    const handleProductsPerPageChange = (event: SelectChangeEvent) => {
        setProductsPerPage(event.target.value as string);
    };

    // TODO: Fetch products, handle pagination and implement 'show more' functionality

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3} lg={2}>
                <FilterSidebar />
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10}>
                <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    marginBottom={2}
                >
                    <Box>
                        <IconButton onClick={() => handleLayoutChange("list")}>
                            <ViewList />
                        </IconButton>
                        <IconButton onClick={() => handleLayoutChange("cards")}>
                            <ViewModule />
                        </IconButton>
                    </Box>
                    <Box>
                        <Typography>Sort by:</Typography>
                        <Select
                            value={sortOption}
                            onChange={handleSortOptionChange}
                        >
                            <MenuItem value='default'>Default</MenuItem>
                            <MenuItem value='price_low_to_high'>
                                Price: Low to High
                            </MenuItem>
                            <MenuItem value='price_high_to_low'>
                                Price: High to Low
                            </MenuItem>
                            {/* Add more sorting options if needed */}
                        </Select>
                        <Typography>Products per page:</Typography>
                        <Select
                            value={productsPerPage}
                            onChange={handleProductsPerPageChange}
                        >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            {/* Add more items per page options if needed */}
                        </Select>
                    </Box>
                </Box>
                {/* TODO: Render products in the chosen layout (cards or list) */}

                {/* TODO: Add 'show more' button and pagination controls */}
            </Grid>
        </Grid>
    );
};

export default ProductPage;
