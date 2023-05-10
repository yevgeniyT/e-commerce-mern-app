import React from "react";
import {
    Box,
    Grid,
    CardMedia,
    Card,
    CardContent,
    Typography,
    Button,
} from "@mui/material";
import { ProductType } from "types/productTypes";

interface ProductCardItemProps {
    product: ProductType;
}

const ProductListItem: React.FC<ProductCardItemProps> = ({ product }) => {
    const { name, price, images, description } = product;

    const limitedDescription =
        description.length > 300
            ? description.slice(0, 300) + "..."
            : description;

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
                        <Typography gutterBottom variant='h5' component='div'>
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
