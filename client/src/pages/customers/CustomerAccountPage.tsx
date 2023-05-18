import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";

import {
    Grid,
    Select,
    MenuItem,
    Box,
    Container,
    Pagination,
    Typography,
} from "@mui/material";

import { SelectChangeEvent } from "@mui/material/Select";

import { getAllProducts } from "features/products/productsThunk";
import { ProductType } from "types/productTypes";

import { sortProducts } from "features/products/productsSlice";
import AdminProductListItem from "components/admin/AdminProductListItem";
import CustomerSidebar from "components/customers/CustomerSidebar";

const CustomerAcountPage = () => {
    //Use hooks
    const dispatch = useAppDispatch();
    // get data from store
    const { products, pagination } = useAppSelector((state) => state.productsR);

    const [sortOption, setSortOption] = useState("default"); // set state for sorting
    const [productsPerPage, setProductsPerPage] = useState("4"); // set state for nuber of pages on list
    const [page, setPage] = useState(1); // set state to define page to send to backend

    // TODO Find out how to prevent doble dispatch here
    // dispatch page and products per page for initial render
    useEffect(() => {
        dispatch(
            getAllProducts({ page: page, limit: parseInt(productsPerPage) })
        );
    }, [dispatch, page, productsPerPage]);

    const handleSortOptionChange = (event: SelectChangeEvent) => {
        const sortOption = event.target.value as string;
        setSortOption(sortOption);
        dispatch(sortProducts(sortOption));
    };

    const handleProductsPerPageChange = (event: SelectChangeEvent) => {
        setProductsPerPage(event.target.value as string);
    };

    return (
        <Container maxWidth='xl'>
            {/* Side bar section  */}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={3} lg={3}>
                    <Box
                        border={1}
                        borderColor='divider'
                        borderRadius={1}
                        p={1}
                    >
                        <CustomerSidebar />
                    </Box>
                </Grid>

                {/* Products and sorting section */}
                <Grid item xs={12} sm={8} md={9} lg={9}>
                    {/* Sorting and type of layout section */}

                    <Box
                        border={1}
                        borderColor='divider'
                        borderRadius={1}
                        p={1}
                    >
                        <Grid container spacing={2}>
                            {products &&
                                products.map((product: ProductType) => (
                                    <Grid item key={product._id} xs={12}>
                                        <AdminProductListItem
                                            product={product}
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CustomerAcountPage;
