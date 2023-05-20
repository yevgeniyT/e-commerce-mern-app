import React, { useEffect } from "react";
import { Container, Box, Typography, Grid, Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import courusel from "../components/home/courusel.json";
import CouruselItem from "components/home/CouruselItem";
import { CarouselProductType, ProductType } from "types/productTypes";
import baner1 from "../data/baner1.png";
import baner2 from "../data/baner2.png";
import baner3 from "../data/baner3.png";
import baner4 from "../data/baner4.png";
import { getAllProducts } from "features/products/productsThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import ProductCardItem from "components/products/ProductCardItem";
import FooterSubscriptionBar from "layouts/FooterSubscriptionBar";

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();

    // get data from store
    const { products } = useAppSelector((state) => state.productsR);

    useEffect(() => {
        dispatch(getAllProducts({ page: 1, limit: 8 }));
    }, [dispatch]);

    return (
        <Container maxWidth='xl'>
            <Grid container>
                <Grid item xs={12} sx={{ marginBottom: "32px" }}>
                    <Carousel interval={5000} animation='slide'>
                        {courusel.map((product: CarouselProductType) => (
                            <CouruselItem key={product._id} product={product} />
                        ))}
                    </Carousel>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={2}
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "32px",
                }}
            >
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Paper
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Box
                            p={2}
                            display='flex'
                            flexDirection='row'
                            alignItems='center'
                            justifyContent='space-around'
                        >
                            <img
                                src={baner4}
                                alt='check'
                                style={{
                                    width: "20%",
                                    height: "auto",
                                    objectFit: "contain",
                                }}
                            />
                            <Box>
                                <Typography variant='h6'>
                                    Free Delivery
                                </Typography>
                                <Typography>
                                    For all orders over Euro 30
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Paper
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Box
                            p={2}
                            display='flex'
                            flexDirection='row'
                            alignItems='center'
                            justifyContent='space-around'
                        >
                            <img
                                src={baner3}
                                alt='check'
                                style={{
                                    width: "20%",
                                    height: "auto",
                                    objectFit: "contain",
                                }}
                            />
                            <Box>
                                <Typography variant='h6'>
                                    Safe Payment
                                </Typography>
                                <Typography>100% secure payment</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Paper
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Box
                            p={2}
                            display='flex'
                            flexDirection='row'
                            alignItems='center'
                            justifyContent='space-around'
                        >
                            <img
                                src={baner1}
                                alt='check'
                                style={{
                                    width: "20%",
                                    height: "auto",
                                    objectFit: "contain",
                                }}
                            />
                            <Box>
                                <Typography variant='h6'>
                                    Shop With Confidence
                                </Typography>
                                <Typography>If goods have problems</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Paper
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Box
                            p={2}
                            display='flex'
                            flexDirection='row'
                            alignItems='center'
                            justifyContent='space-around'
                        >
                            <img
                                src={baner2}
                                alt='check'
                                style={{
                                    width: "20%",
                                    height: "auto",
                                    objectFit: "contain",
                                }}
                            />
                            <Box>
                                <Typography variant='h6'>
                                    Friendly Services
                                </Typography>
                                <Typography>
                                    30 day satisfaction guarantee
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            <Grid
                container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "32px",
                }}
            >
                <Typography variant='h4'>
                    {" "}
                    Top Featured Dental Products{" "}
                </Typography>
            </Grid>
            <Grid
                container
                spacing={2}
                sx={{
                    marginBottom: "32px",
                }}
            >
                {products &&
                    products.map((product: ProductType) => (
                        <Grid
                            item
                            key={product._id}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                        >
                            <ProductCardItem product={product} />
                        </Grid>
                    ))}
            </Grid>
            <Grid>
                <FooterSubscriptionBar />
            </Grid>
        </Container>
    );
};

export default HomePage;
