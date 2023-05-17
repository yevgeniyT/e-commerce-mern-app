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

interface ListItemProps {
    category: CategoryType;
}

const AdminCategoryListItem: React.FC<ListItemProps> = ({ category }) => {
    const { name, _id } = category;

    // const dispatch = useAppDispatch();
    // const navigate = useNavigate();

    // const handleClick = (id: string) => {
    //     dispatch(getSingleProduct(id));
    //     navigate(`/admin/account/products/${slug}/edit`);
    // };

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
                            // handleProductClick(_id);
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
