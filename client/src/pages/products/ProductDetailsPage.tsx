import React, { useState, useEffect } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

import { useAppSelector } from "redux/hooks";
import Loading from "components/common/Loading";
import Error from "components/common/Error";

const ProductDetailsPage = () => {
    const { singleProduct, loading, error } = useAppSelector(
        (state) => state.productsR
    );
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

    console.log(singleProduct);

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
                                    <Button variant='contained' color='primary'>
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
