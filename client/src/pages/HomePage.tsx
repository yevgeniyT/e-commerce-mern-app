import React from "react";
import { Container, Box, Typography, Grid, Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import courusel from "../components/home/courusel.json";
import CouruselItem from "components/home/CouruselItem";
import { CarouselProductType } from "types/productTypes";

const HomePage: React.FC = () => {
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
                }}
            >
                <Grid item xs={12} sm={5} md={4} lg={2}>
                    <Paper sx={{ height: "100%" }}>
                        <Box p={2}>
                            <Typography variant='h6'>
                                <span role='img' aria-label='truck'>
                                    🚚
                                </span>
                                Free Delivery
                            </Typography>
                            <Typography>For all orders over Euro 30</Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={5} md={4} lg={2}>
                    <Paper sx={{ height: "100%" }}>
                        <Box p={2}>
                            <Typography variant='h6'>
                                <span role='img' aria-label='shield'>
                                    🛡️
                                </span>
                                Safe Payment
                            </Typography>
                            <Typography>100% secure payment</Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={5} md={4} lg={2}>
                    <Paper sx={{ height: "100%" }}>
                        <Box p={2}>
                            <Typography variant='h6'>
                                <span role='img' aria-label='check'>
                                    ✔️
                                </span>
                                Shop With Confidence
                            </Typography>
                            <Typography>If goods have problems</Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={5} md={4} lg={2}>
                    <Paper sx={{ height: "100%" }}>
                        <Box p={2}>
                            <Typography variant='h6'>
                                <span role='img' aria-label='phone'>
                                    📞
                                </span>
                                Need Advise?
                            </Typography>
                            <Typography>
                                Talk to our customer support
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={5} md={4} lg={2}>
                    <Paper sx={{ height: "100%" }}>
                        <Box p={2}>
                            <Typography variant='h6'>
                                <span role='img' aria-label='smile'>
                                    😊
                                </span>
                                Friendly Services
                            </Typography>
                            <Typography>
                                30 day satisfaction guarantee
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;
