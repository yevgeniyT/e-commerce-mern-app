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
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { addProductToCart } from "features/cart/cartSlice";
import { toast } from "react-toastify";

interface ProductCardItemProps {
    product: ProductType;
}

const ProductListItem: React.FC<ProductCardItemProps> = ({ product }) => {
    const { name, price, images, description, slug, _id } = product;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    // Get access to cart store. Need to check if product in cart before edding new to prevent double check
    const cart = useAppSelector((state) => state.cartR.cart);

    const limitedDescription =
        description.length > 300
            ? description.slice(0, 300) + "..."
            : description;

    const handleProductClick = (id: string) => {
        dispatch(getSingleProduct(id));
        navigate(`/products/${slug}`);
    };

    // add product to cart, check if product oin cart already before adding
    const handleAddToCart = (product: ProductType) => {
        //Array.prototype.some method is used to check if there's at least one product in the cart with the same id as the product you're trying to add. If some returns true, that means the product is already in the cart, so an alert is shown. If some returns false, that means the product isn't in the cart, so it's added to the cart.
        const isProductInCart = cart.some((item) => item._id === product._id);
        if (isProductInCart) {
            // Product is already in the cart. Show a message.
            toast.error("This product is already in your cart.");
        } else {
            // Product is not in the cart. Add it.
            dispatch(addProductToCart(product));
        }
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
                                onClick={() => {
                                    handleAddToCart(product);
                                }}
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
