import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Grid,
    CardMedia,
    Card,
    CardContent,
    Typography,
    Button,
    Checkbox,
    FormControlLabel,
} from "@mui/material";

import { useAppDispatch } from "redux/hooks";

import { CustomerType } from "types/customerType";

interface ListItemProps {
    customer: CustomerType;
}

const AdminCustomerListItem: React.FC<ListItemProps> = ({ customer }) => {
    const { firstName, lastName, avatarImage, email, phone, isBanned, _id } =
        customer;

    // const dispatch = useAppDispatch();
    // const navigate = useNavigate();

    const [bannedCustomer, setsetBannedCustomer] = useState(isBanned);

    // const handleClick = (id: string) => {
    //     dispatch(getSingleProduct(id));
    //     navigate(`/admin/account/products/${slug}/edit`);
    // };
    //TODO Finish is Banned feature
    const handleIsBannedChange = (id: string) => {
        setsetBannedCustomer(!bannedCustomer);
        // dispatch(toogleIsActive(id));
    };

    return (
        <Card>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CardMedia
                        component='img'
                        alt={firstName}
                        sx={{
                            width: "auto", // maintain original aspect ratio
                            height: "150px", // change this to desired height
                            maxHeight: "100%", // prevent image from going out of the parent's bounds
                            objectFit: "cover", // cover the entire width/height of the parent while maintaining aspect ratio
                        }}
                        image={avatarImage}
                    />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <CardContent
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box
                            sx={{
                                marginBottom: "16px",
                            }}
                        >
                            <Typography
                                gutterBottom
                                variant='h5'
                                component='div'
                            >
                                {firstName} {lastName}
                            </Typography>

                            <Typography variant='body2' color='text.secondary'>
                                Email: {email}
                            </Typography>

                            <Typography variant='body2' color='text.secondary'>
                                Pnone : {phone || "N/A"}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={!bannedCustomer}
                                        onChange={() =>
                                            handleIsBannedChange(_id)
                                        }
                                        name='Bunned'
                                        color='primary'
                                    />
                                }
                                label='is Banned'
                            />
                        </Box>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
};

export default AdminCustomerListItem;
