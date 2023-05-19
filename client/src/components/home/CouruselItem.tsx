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
} from "@mui/material";
import { CarouselProductType } from "types/productTypes";
import { getSingleProduct } from "features/products/productsThunk";
import { useAppDispatch } from "redux/hooks";

interface ProductCardItemProps {
    product: CarouselProductType;
}

const CouruselItem: React.FC<ProductCardItemProps> = ({ product }) => {
    const { name, image, description, slug, _id } = product;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleProductClick = (id: string) => {
        dispatch(getSingleProduct(id));
        navigate(`/products/${slug}`);
    };

    return (
        <Card elevation={0}>
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CardContent
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <Typography gutterBottom variant='h2' component='div'>
                            {name}
                        </Typography>
                        <Typography
                            variant='h5'
                            color='text.secondary'
                            sx={{
                                marginBottom: "10px",
                            }}
                        >
                            {description}
                        </Typography>
                        <Box>
                            <Button
                                variant='contained'
                                color='primary'
                                sx={{ width: "30%", minWidth: "140px" }}
                                onClick={() => {
                                    handleProductClick(_id);
                                }}
                            >
                                Lern more
                            </Button>
                        </Box>
                    </CardContent>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <CardMedia
                        component='img'
                        alt={name}
                        height='500'
                        image={image}
                    />
                </Grid>
            </Grid>
        </Card>
    );
};

export default CouruselItem;
