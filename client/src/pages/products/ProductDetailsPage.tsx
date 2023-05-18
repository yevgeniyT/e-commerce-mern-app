import React, { useState, useEffect } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import Loading from "components/common/Loading";
import Error from "components/common/Error";
import { ProductType } from "types/productTypes";
import { addProductToCart } from "features/cart/cartSlice";
import { toast } from "react-toastify";

const ProductDetailsPage = () => {
    const dispatch = useAppDispatch();

    const { singleProduct, loading, error } = useAppSelector(
        (state) => state.productsR
    );
    // Get access to cart store. Need to check if product in cart before edding new to prevent double check
    const cart = useAppSelector((state) => state.cartR.cart);
    // used to change images
    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
        setSelectedImage(singleProduct?.images[0] || "");
    }, [singleProduct]);

    if (!singleProduct) {
        return <Loading />;
    }

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

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
        <Container maxWidth='xl'>
            <Grid container spacing={2}>
                <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    marginBottom={2}
                    border={1}
                    borderColor='divider'
                    borderRadius={1}
                    p={1}
                >
                    {singleProduct ? (
                        <>
                            <Grid item xs={12} md={6}>
                                {selectedImage && (
                                    <img
                                        src={selectedImage}
                                        alt={singleProduct.name}
                                        style={{
                                            width: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                )}
                                <Box display='flex' justifyContent='center'>
                                    {singleProduct.images.map(
                                        (image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={singleProduct.name}
                                                onClick={() =>
                                                    setSelectedImage(image)
                                                }
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    objectFit: "cover",
                                                    cursor: "pointer",
                                                }}
                                            />
                                        )
                                    )}
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box>
                                    <Typography variant='h4'>
                                        {singleProduct.name}
                                    </Typography>
                                    <Typography variant='body1'>
                                        {singleProduct.description}
                                    </Typography>
                                    <Typography variant='h6'>
                                        {singleProduct.price}$
                                    </Typography>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={() => {
                                            handleAddToCart(singleProduct);
                                        }}
                                    >
                                        Add to cart
                                    </Button>
                                </Box>
                            </Grid>
                        </>
                    ) : (
                        <Typography>No product found</Typography>
                    )}
                </Box>
            </Grid>
        </Container>
    );
};

export default ProductDetailsPage;
