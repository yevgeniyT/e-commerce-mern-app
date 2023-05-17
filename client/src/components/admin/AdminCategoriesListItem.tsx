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

import { useAppDispatch } from "redux/hooks";

import { CategoryType } from "types/categoryType";
import { getSingleCategory } from "features/categories/categoryThunk";

interface ListItemProps {
    category: CategoryType;
}

const AdminCategoryListItem: React.FC<ListItemProps> = ({ category }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { name, _id, slug } = category;

    // const dispatch = useAppDispatch();
    // const navigate = useNavigate();

    const handleCategoryClick = (id: string) => {
        dispatch(getSingleCategory(id));
        navigate(`/admin/account/categories/${slug}/edit`);
    };

    return (
        <Card>
            <Grid container>
                <Grid item xs={11}>
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
                    xs={1}
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
                </Grid>
            </Grid>
        </Card>
    );
};

export default AdminCategoryListItem;
