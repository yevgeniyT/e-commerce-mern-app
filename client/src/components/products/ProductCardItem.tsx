import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    useTheme,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ProductType } from "types/productTypes";
import { getSingleProduct } from "features/products/productsThunk";
import { addProductToCart } from "features/cart/cartSlice";
import { toast } from "react-toastify";

interface ProductCardItemProps {
    product: ProductType;
}

const ProductCardItem: React.FC<ProductCardItemProps> = ({ product }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // use MUI schem to customise icon
    const theme = useTheme();
    // distructure data recived from product page
    const { name, price, images, _id, slug } = product;

    // Get access to cart store. Need to check if product in cart before edding new to prevent double check
    const cart = useAppSelector((state) => state.cartR.cart);

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
        <Card
            sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    cursor: "pointer",
                }}
                onClick={() => {
                    handleProductClick(_id);
                }}
            >
                <CardMedia
                    component='img'
                    alt={name}
                    image={images[0]}
                    sx={{
                        width: "275",
                        padding: "10px",
                    }}
                />
            </Box>
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px 10px",
                    "&:last-child": {
                        paddingBottom: "10px",
                    },
                }}
            >
                <Typography
                    gutterBottom
                    variant='body1'
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
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant='h6'
                        color='text.secondary'
                        sx={{ fontWeight: "bold" }}
                    >
                        {price.toLocaleString("de-DE", {
                            style: "currency",
                            currency: "EUR",
                        })}
                    </Typography>
                    <IconButton
                        color='primary'
                        aria-label='add to shopping cart'
                        onClick={() => {
                            handleAddToCart(product);
                        }}
                    >
                        <AddShoppingCartIcon />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCardItem;
