import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppDispatch } from "redux/hooks";

import { CategoryType } from "types/categoryType";
import {
    getAllCategories,
    getSingleCategory,
} from "features/categories/categoryThunk";
import { deleteCategory } from "features/admin/adminThunk";

interface ListItemProps {
    category: CategoryType;
}

const AdminCategoryListItem: React.FC<ListItemProps> = ({ category }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { name, _id, slug } = category;

    const handleCategoryClick = (id: string) => {
        dispatch(getSingleCategory(id));
        navigate(`/admin/account/categories/${slug}/edit`);
    };
    const handleCategoryDelete = (id: string) => {
        dispatch(deleteCategory(id)).then(() => {
            dispatch(getAllCategories());
        });
    };

    return (
        <Card>
            <Grid container>
                <Grid item xs={10}>
                    <CardContent
                        sx={{
                            height: "100%",
                            display: "flex",
                        }}
                    >
                        <Typography variant='h6' color='text.secondary'>
                            {name}
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid
                    item
                    xs={2}
                    sx={{
                        display: "flex",
                        alignItems: "botton",
                        justifyContent: "center",
                    }}
                >
                    <IconButton
                        color='primary'
                        onClick={() => {
                            handleCategoryClick(_id);
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        color='error'
                        onClick={() => {
                            handleCategoryDelete(_id);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Card>
    );
};

export default AdminCategoryListItem;
