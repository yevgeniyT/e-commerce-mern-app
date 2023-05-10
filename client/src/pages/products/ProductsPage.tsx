import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";

import {
    Grid,
    IconButton,
    Select,
    MenuItem,
    Box,
    Container,
} from "@mui/material";

import { ViewList, ViewModule } from "@mui/icons-material";
import { SelectChangeEvent } from "@mui/material/Select";
import FilterSidebar from "layouts/Sidebar";

import { getAllProducts } from "features/products/productsThunk";
import ProductCardItem from "components/products/ProductCardItem";
import { ProductType } from "types/productTypes";
import ProductListItem from "components/products/ProductListItem";
import { sortProducts } from "features/products/productsSlice";

const ProductPage = () => {
    //Use hooks
    const dispatch = useAppDispatch();

    // get data from store
    const { products } = useAppSelector((state) => state.productsR);

    const [layout, setLayout] = useState("cards");
    const [sortOption, setSortOption] = useState("default");
    const [productsPerPage, setProductsPerPage] = useState("10");

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    const handleLayoutChange = (newLayout: string) => {
        setLayout(newLayout);
    };

    const handleSortOptionChange = (event: SelectChangeEvent) => {
        const sortOption = event.target.value as string;
        setSortOption(sortOption);
        dispatch(sortProducts(sortOption));
    };

    const handleProductsPerPageChange = (event: SelectChangeEvent) => {
        setProductsPerPage(event.target.value as string);
    };

    // TODO:  handle pagination and implement 'show more' functionality

    return (
        <Container maxWidth='xl'>
            {/* Filtering section  */}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={3} lg={3}>
                    <Box
                        border={1}
                        borderColor='divider'
                        borderRadius={1}
                        p={1}
                    >
                        <FilterSidebar />
                    </Box>
                </Grid>

                {/* Products and sorting section */}
                <Grid item xs={12} sm={8} md={9} lg={9}>
                    {/* Sorting and type of layout section */}
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        marginBottom={2}
                        border={1}
                        borderColor='divider'
                        borderRadius={1}
                        p={1}
                    >
                        <Box
                            display='flex'
                            justifyContent='space-between'
                            alignItems='center'
                        >
                            <IconButton
                                onClick={() => handleLayoutChange("list")}
                            >
                                <ViewList />
                            </IconButton>
                            <IconButton
                                onClick={() => handleLayoutChange("cards")}
                            >
                                <ViewModule />
                            </IconButton>
                        </Box>
                        <Box
                            display='flex'
                            justifyContent='space-between'
                            alignItems='center'
                        >
                            <Select
                                value={sortOption}
                                onChange={handleSortOptionChange}
                                sx={{
                                    minWidth: "250px", // Set the width of the input field
                                    height: "40px", // Set the height of the input field
                                    marginRight: "16px", // Set the spacing between the input fields
                                }}
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

                            <Select
                                value={productsPerPage}
                                onChange={handleProductsPerPageChange}
                                sx={{
                                    minWidth: "50px", // Set the width of the input field
                                    height: "40px", // Set the height of the input field
                                }}
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                {/* Add more items per page options if needed */}
                            </Select>
                        </Box>
                    </Box>

                    <Box
                        border={1}
                        borderColor='divider'
                        borderRadius={1}
                        p={1}
                    >
                        {layout === "cards" && (
                            <Grid container spacing={2}>
                                {products &&
                                    products.map((product: ProductType) => (
                                        <Grid
                                            item
                                            key={product.id}
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            lg={3}
                                        >
                                            <ProductCardItem
                                                product={product}
                                            />
                                        </Grid>
                                    ))}
                            </Grid>
                        )}

                        {layout === "list" && (
                            <Grid container spacing={2}>
                                {products &&
                                    products.map((product: ProductType) => (
                                        <Grid item key={product.id} xs={12}>
                                            <ProductListItem
                                                product={product}
                                            />
                                        </Grid>
                                    ))}
                            </Grid>
                        )}

                        {/* TODO: Add 'show more' button and pagination controls */}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductPage;

// TODO Findout about Helmet package and how to use
