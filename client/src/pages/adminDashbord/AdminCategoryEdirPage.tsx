// Dependencies import
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";

// MUI  import
import {
    Container,
    Grid,
    Typography,
    TextField,
    Button,
    Box,
} from "@mui/material";

import { getAllCategories } from "features/categories/categoryThunk";
import { updateCategory } from "features/admin/adminThunk";

const AdminCategoryEditePage: React.FC = () => {
    //Use hooks
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [updatedName, setUpdatedName] = useState("");

    // Get data from store
    const { singleCategory } = useAppSelector((state) => state.categoriesR);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedName(e.target.value);
    };

    const updatedCategory = { name: updatedName };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (singleCategory) {
            dispatch(
                updateCategory({
                    newCategoryData: updatedCategory,
                    id: singleCategory._id,
                })
            )
                //dispatch function returns a Promise when used with async thunks, so you can chain .then() after the dispatch(createNewCategory(newCategory)) call. The getAllCategories() function will not be dispatched until the createNewCategory action is completed.
                .then(() => {
                    dispatch(getAllCategories());
                    navigate("/admin/account/categories");
                });
        } else {
            console.log("Unable create new category");
        }
    };

    // Use useEffect to update state when singleProduct changes
    useEffect(() => {
        if (singleCategory) {
            setUpdatedName(singleCategory.name);
        }
    }, [singleCategory]);

    return (
        <Container maxWidth='sm'>
            <Box sx={{ mt: 8 }}>
                <Typography variant='h4' align='center' sx={{ mb: 3 }}>
                    Update Category
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name='name'
                                label='Name'
                                value={updatedCategory.name}
                                onChange={handleOnChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Box display='flex' justifyContent='space-between'>
                                <Button
                                    sx={{ textTransform: "none" }}
                                    fullWidth
                                    variant='contained'
                                    color='primary'
                                    style={{ marginRight: "8px" }}
                                    onClick={() =>
                                        navigate("/admin/account/categories")
                                    }
                                >
                                    Back
                                </Button>
                                <Button
                                    sx={{ textTransform: "none" }}
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    color='primary'
                                >
                                    Update category
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default AdminCategoryEditePage;
