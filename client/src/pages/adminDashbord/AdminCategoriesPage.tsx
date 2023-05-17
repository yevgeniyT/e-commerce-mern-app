import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";

import { Grid, Box, Container, TextField, Button } from "@mui/material";

import AdminSidebar from "components/admin/AdminSidebar";
import { getAllCategories } from "features/categories/categoryThunk";
import { CategoryType } from "types/categoryType";
import AdminCategoryListItem from "components/admin/AdminCategoriesListItem";
import { createNewCategory } from "features/admin/adminThunk";

const AdminCategoriesPage = () => {
    //Use hooks
    const dispatch = useAppDispatch();

    const [newName, setNewName] = useState("");

    // get data from store
    const { categories } = useAppSelector((state) => state.categoriesR);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    };

    const newCategory = {
        name: newName,
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createNewCategory(newCategory))
            //dispatch function returns a Promise when used with async thunks, so you can chain .then() after the dispatch(createNewCategory(newCategory)) call. The getAllCategories() function will not be dispatched until the createNewCategory action is completed.
            .then(() => {
                dispatch(getAllCategories());
            });
    };

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

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
                    {/* Add new category section */}
                    <form onSubmit={handleSubmit}>
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
                            <TextField
                                name='new-category'
                                label='Add new category'
                                variant='outlined'
                                autoComplete='off'
                                sx={{ width: "80%" }}
                                onChange={handleOnChange}
                            />
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                sx={{ width: "15%", textTransform: "none" }}
                            >
                                Add
                            </Button>
                        </Box>
                    </form>

                    <Box
                        border={1}
                        borderColor='divider'
                        borderRadius={1}
                        p={1}
                    >
                        <Grid container spacing={2}>
                            {categories &&
                                categories.map((category: CategoryType) => (
                                    <Grid item key={category._id} xs={6}>
                                        <AdminCategoryListItem
                                            category={category}
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

export default AdminCategoriesPage;
