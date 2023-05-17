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
import { ProductType } from "types/productTypes";
import { getSingleProduct } from "features/products/productsThunk";
import { useAppDispatch } from "redux/hooks";
import { toogleIsActive } from "features/admin/adminThunk";

interface ProductCardItemProps {
    product: ProductType;
}

const AdminProductListItem: React.FC<ProductCardItemProps> = ({ product }) => {
    const {
        name,
        price,
        images,
        discount,
        category,
        brand,
        slug,
        _id,
        isActive,
    } = product;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [activeProduct, setActiveProduct] = useState(isActive);

    const handleProductClick = (id: string) => {
        dispatch(getSingleProduct(id));
        navigate(`/admin/account/products/${slug}/edit`);
    };
    //TODO make it more dependent on state in db not in lockal state
    const handleIsActiveChange = (id: string) => {
        setActiveProduct(!activeProduct);
        dispatch(toogleIsActive(id));
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
                        alt={name}
                        sx={{
                            width: "auto", // maintain original aspect ratio
                            height: "150px", // change this to desired height
                            maxHeight: "100%", // prevent image from going out of the parent's bounds
                            objectFit: "cover", // cover the entire width/height of the parent while maintaining aspect ratio
                        }}
                        image={images[0]}
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
                                Name: {name}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                Brand: {brand.name}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                Category: {category.name}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                Price:{" "}
                                {price.toLocaleString("de-DE", {
                                    style: "currency",
                                    currency: "EUR",
                                })}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                Discount: {discount || 0}%
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                variant='contained'
                                color='primary'
                                sx={{ width: "30%", minWidth: "140px" }}
                                onClick={() => {
                                    handleProductClick(_id);
                                }}
                            >
                                Edit Product
                            </Button>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={activeProduct}
                                        onChange={() =>
                                            handleIsActiveChange(_id)
                                        }
                                        name='isActive'
                                        color='primary'
                                    />
                                }
                                label='Active'
                            />
                        </Box>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
};

export default AdminProductListItem;
