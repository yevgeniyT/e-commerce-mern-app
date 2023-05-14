import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Grid,
    CardMedia,
    Card,
    CardContent,
    Typography,
    Button,
    useTheme,
} from "@mui/material";
import { ProductType } from "types/productTypes";
import { getSingleProduct } from "features/products/productsThunk";
import { useAppDispatch } from "redux/hooks";

interface ProductCardItemProps {
    product: ProductType;
}

const ProductListItem: React.FC<ProductCardItemProps> = ({ product }) => {
    const { name, price, images, description, slug, _id } = product;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const limitedDescription =
        description.length > 300
            ? description.slice(0, 300) + "..."
            : description;

    const handleProductClick = (id: string) => {
        dispatch(getSingleProduct(id));
        navigate(`/products/${slug}`);
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
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        handleProductClick(_id);
                    }}
                >
                    <CardMedia
                        component='img'
                        alt={name}
                        height='275'
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
                        <Typography
                            gutterBottom
                            variant='h5'
                            component='div'
                            sx={{
                                cursor: "pointer",
                                "&:hover": {
                                    color: theme.palette.error.main,
                                },
                            }}
                            onClick={() => {
                                handleProductClick(_id);
                            }}
                        >
                            {name}
                        </Typography>
                        <Typography
                            variant='body2'
                            color='text.secondary'
                            sx={{
                                marginBottom: "10px",
                            }}
                        >
                            {limitedDescription}
                        </Typography>
                        <Box>
                            <Typography
                                variant='h6'
                                color='text.secondary'
                                sx={{
                                    fontWeight: "bold",
                                    marginBottom: "10px",
                                }}
                            >
                                {price.toLocaleString("de-DE", {
                                    style: "currency",
                                    currency: "EUR",
                                })}
                            </Typography>
                            <Button
                                variant='contained'
                                color='primary'
                                sx={{ width: "30%", minWidth: "140px" }}
                            >
                                Add to Cart
                            </Button>
                        </Box>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
};

export default ProductListItem;
