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

import { getAllCustomers } from "features/admin/adminThunk";
import { CustomerType } from "types/customerType";

import AdminSidebar from "components/admin/AdminSidebar";
import AdminCustomerListItem from "components/admin/AdminCustomersListItem";

const AdminCustomerPage = () => {
    //Use hooks
    const dispatch = useAppDispatch();
    // get data from store
    const { customers, pagination } = useAppSelector((state) => state.adminR);

    const [customersPerPage, setCustomersPerPage] = useState("4"); // set state for nuber of pages on list
    const [page, setPage] = useState(1); // set state to define page to send to backend

    // TODO Find out how to prevent doble dispatch here
    // dispatch page and products per page for initial render
    useEffect(() => {
        dispatch(
            getAllCustomers({ page: page, limit: parseInt(customersPerPage) })
        );
    }, [dispatch, page, customersPerPage]);

    const handleCustomersPerPageChange = (event: SelectChangeEvent) => {
        setCustomersPerPage(event.target.value as string);
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
                        <AdminSidebar />
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
                            <Typography>fitering menu</Typography>
                        </Box>
                        <Box
                            display='flex'
                            justifyContent='space-between'
                            alignItems='center'
                        >
                            <Select
                                value={customersPerPage}
                                onChange={handleCustomersPerPageChange}
                                sx={{
                                    minWidth: "50px", // Set the width of the input field
                                    height: "40px", // Set the height of the input field
                                }}
                            >
                                <MenuItem value={4}>4</MenuItem>
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
                        <Grid container spacing={2}>
                            {customers &&
                                customers.map((customer: CustomerType) => (
                                    <Grid item key={customer._id} xs={12}>
                                        <AdminCustomerListItem
                                            customer={customer}
                                        />
                                    </Grid>
                                ))}
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sx={{
                                marginTop: "16px",
                            }}
                        >
                            <Box
                                display='flex'
                                flexDirection='column'
                                alignItems='center'
                                borderTop={1}
                                borderColor='rgba(0, 0, 0, 0.1)'
                                pt={2}
                                sx={{
                                    width: "60%",
                                    margin: "auto",
                                }}
                            >
                                <Pagination
                                    count={pagination.totalPages}
                                    page={page}
                                    onChange={(event, value) => setPage(value)}
                                />
                            </Box>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminCustomerPage;
