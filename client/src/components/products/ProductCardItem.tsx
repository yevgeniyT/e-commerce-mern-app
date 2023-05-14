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
import { useAppDispatch } from "redux/hooks";
import { ProductType } from "types/productTypes";
import { getSingleProduct } from "features/products/productsThunk";

interface ProductCardItemProps {
    product: ProductType;
}

const ProductCardItem: React.FC<ProductCardItemProps> = ({ product }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const theme = useTheme();
    const { name, price, images, _id, slug } = product;

    const handleProductClick = (id: string) => {
        dispatch(getSingleProduct(id));
        navigate(`/products/${slug}`);
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
                    >
                        <AddShoppingCartIcon />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCardItem;
