import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, CardMedia, Typography, Box } from "@mui/material";
import { ProductType } from "types/productTypes";
import { useAppDispatch } from "redux/hooks";
import { getSingleProduct } from "features/products/productsThunk";

interface ProductCardItemProps {
    product: ProductType;
}

const ProductDropdownItem: React.FC<ProductCardItemProps> = ({ product }) => {
    const { name, price, images, slug, _id } = product;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleProductClick = (id: string) => {
        dispatch(getSingleProduct(id));
        navigate(`/products/${slug}`);
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                padding: "10px",
                "&:hover": {
                    backgroundColor: "lightgray",
                },
            }}
            onClick={() => {
                handleProductClick(_id);
            }}
        >
            <CardMedia
                component='img'
                alt={name}
                height='50'
                image={images[0]}
                sx={{ marginRight: "10px" }}
            />
            <Typography variant='body1' noWrap>
                {name}
            </Typography>
            <Typography variant='body2' sx={{ marginLeft: "auto" }}>
                {price.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                })}
            </Typography>
        </Box>
    );
};

export default ProductDropdownItem;

//TODO update the render make picture small name and price one under one
