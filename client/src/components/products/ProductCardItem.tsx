import React from "react";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
} from "@mui/material";

import { ProductType } from "types/productTypes";

interface ProductCardItemProps {
    product: ProductType;
}

const ProductCardItem: React.FC<ProductCardItemProps> = ({ product }) => {
    const { name, price, images } = product;

    return (
        <Card
            sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "&:hover .product-card-add-to-cart": {
                    opacity: 1,
                    transform: "translateY(0)",
                },
            }}
        >
            <Box
                sx={{
                    position: "relative",
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
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        opacity: 0,
                        transform: "translateY(10%)",
                        transition: "opacity 0.3s, transform 0.5s",
                    }}
                    className='product-card-add-to-cart'
                >
                    <Button
                        variant='contained'
                        color='primary'
                        sx={{ width: "100%" }}
                    >
                        Add to Cart
                    </Button>
                </Box>
            </Box>
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px 10px",
                    "&:last-child": {
                        paddingBottom: "10px", // Change the value as needed
                    },
                }}
            >
                <Typography gutterBottom variant='body1' component='div'>
                    {name}
                </Typography>
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
            </CardContent>
        </Card>
    );
};

export default ProductCardItem;
