import React from "react";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    IconButton,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

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
                    >
                        <AddShoppingCartIcon />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCardItem;
