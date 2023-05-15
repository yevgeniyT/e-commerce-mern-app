import React from "react";
import {
    Container,
    Box,
    Button,
    Typography,
    Grid,
    Paper,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
} from "@mui/material";

const HomePage: React.FC = () => {
    const banners = [
        { title: "Banner 1", image: "/path/to/image1.jpg", action: "/action1" },
        { title: "Banner 2", image: "/path/to/image2.jpg", action: "/action2" },
        { title: "Banner 3", image: "/path/to/image3.jpg", action: "/action3" },
        { title: "Banner 4", image: "/path/to/image4.jpg", action: "/action4" },
    ];

    return (
        <Container maxWidth='xl'>
            <Grid container spacing={2}>
                {banners.map((banner, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component='img'
                                    height='140'
                                    image={banner.image}
                                    alt={banner.title}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant='h5'
                                        component='div'
                                    >
                                        {banner.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button
                                    size='small'
                                    color='primary'
                                    variant='contained'
                                >
                                    Call To Action
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Paper>
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

                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Paper>
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

                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Paper>
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

                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Paper>
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

                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Paper>
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
