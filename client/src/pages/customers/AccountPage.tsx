// UserCard.tsx
import React from "react";
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    CardHeader,
    Avatar,
    Box,
    Grid,
} from "@mui/material";

import { BaseCustomer } from "types/customerType";

const onEdit = () => {};

const onChangePassword = () => {};
const CustomerAccount: React.FC = () => {
    return (
        <Grid container spacing={4} direction='column'>
            <Grid item xs={12}>
                <Card sx={{ width: "100%", maxWidth: 600 }}>
                    <Grid container>
                        <Grid item xs={12} md={4}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    p: 2,
                                }}
                            >
                                <Avatar
                                    alt={"Full Name"}
                                    src={"/"}
                                    sx={{
                                        width: 150,
                                        height: 150,
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <CardHeader
                                title={"Account Information"}
                                subheader={
                                    <Typography component='span'>
                                        Full Name
                                    </Typography>
                                }
                            />
                            <CardContent>
                                <Typography variant='body1' gutterBottom>
                                    email: {""}
                                </Typography>
                                <Typography variant='body1' gutterBottom>
                                    phone: {"city"}
                                </Typography>
                            </CardContent>
                            <CardActions
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    paddingRight: "1rem",
                                }}
                            >
                                <Button
                                    size='small'
                                    onClick={onChangePassword}
                                    color='error'
                                >
                                    Change password
                                </Button>
                                <Button size='small' onClick={onEdit}>
                                    Edit
                                </Button>
                            </CardActions>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card sx={{ width: "100%", maxWidth: 600 }}>
                    <Grid container>
                        <Grid item xs={12} md={4}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    p: 2,
                                }}
                            >
                                <Avatar
                                    alt={"Default Billing Address"}
                                    src={"/"}
                                    sx={{
                                        width: 150,
                                        height: 150,
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <CardHeader title={"Default Billing Address"} />
                            <CardContent>
                                <Typography variant='body1' gutterBottom>
                                    Street: {""}
                                </Typography>
                                <Typography variant='body1' gutterBottom>
                                    City: {"city"}
                                </Typography>
                                <Typography variant='body1' gutterBottom>
                                    State: {"state"}
                                </Typography>
                                <Typography variant='body1' gutterBottom>
                                    Zip: {"zip"}
                                </Typography>
                                <Typography variant='body1' gutterBottom>
                                    Country: {"country"}
                                </Typography>
                            </CardContent>

                            <CardActions
                                sx={{
                                    display: "flex",
                                    justifyContent: "right",
                                    paddingRight: "1rem",
                                }}
                            >
                                <Button size='small' onClick={onEdit}>
                                    Edit
                                </Button>
                            </CardActions>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card sx={{ width: "100%", maxWidth: 600 }}>
                    <Grid container>
                        <Grid item xs={12} md={4}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    p: 2,
                                }}
                            >
                                <Avatar
                                    alt={"Default Billing Address"}
                                    src={"/"}
                                    sx={{
                                        width: 150,
                                        height: 150,
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <CardHeader title={"Default Shipping Address"} />
                            <CardContent>
                                <Typography variant='body1' gutterBottom>
                                    Street: {""}
                                </Typography>
                                <Typography variant='body1' gutterBottom>
                                    City: {"city"}
                                </Typography>
                                <Typography variant='body1' gutterBottom>
                                    State: {"state"}
                                </Typography>
                                <Typography variant='body1' gutterBottom>
                                    Zip: {"zip"}
                                </Typography>
                                <Typography variant='body1' gutterBottom>
                                    Country: {"country"}
                                </Typography>
                            </CardContent>
                            <CardActions
                                sx={{
                                    display: "flex",
                                    justifyContent: "right",
                                    paddingRight: "1rem",
                                }}
                            >
                                <Button size='small' onClick={onEdit}>
                                    Edit
                                </Button>
                            </CardActions>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    );
};
export default CustomerAccount;
