import React, { useState } from "react";
import {
    Box,
    TextField,
    Typography,
    FormControlLabel,
    Checkbox,
    Grid,
    Slider,
    Button,
} from "@mui/material";

const FilterSidebar = () => {
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [sliderRange, setSliderRange] = useState([0, 100]); // Set initial slider range

    // Update the state when the price range inputs change
    const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPriceRange({ ...priceRange, [e.target.name]: e.target.value });
    };

    const handleSliderRangeChange = (_: any, newValue: number | number[]) => {
        setSliderRange(newValue as number[]);
    };

    // Example data for categories and brands
    const categories = [
        { name: "Category 1", count: 10 },
        { name: "Category 2", count: 5 },
    ];

    const brands = [
        { name: "Brand 1", count: 7 },
        { name: "Brand 2", count: 8 },
    ];

    // Reset all filters
    const resetFilters = () => {
        setPriceRange({ min: "", max: "" });
        setSliderRange([0, 100]);
        // TODO: Reset the state for categories and brands checkboxes
    };

    return (
        <Grid container spacing={12}>
            {/* Price section */}
            <Grid item xs={12}>
                <Typography variant='h6'>Price</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            name='min'
                            label='Min'
                            type='number'
                            value={priceRange.min}
                            onChange={handlePriceRangeChange}
                            variant='outlined'
                            size='small'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name='max'
                            label='Max'
                            type='number'
                            value={priceRange.max}
                            onChange={handlePriceRangeChange}
                            variant='outlined'
                            size='small'
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Slider
                        value={sliderRange}
                        onChange={handleSliderRangeChange}
                        valueLabelDisplay='auto'
                        min={0}
                        max={100}
                    />
                </Box>
            </Grid>

            {/* Categories section */}
            <Grid item xs={12}>
                <Typography variant='h6'>Category</Typography>
                <Grid container direction='column'>
                    {categories.map((category, index) => (
                        <FormControlLabel
                            key={index}
                            control={<Checkbox />}
                            label={`${category.name} (${category.count})`}
                        />
                    ))}
                </Grid>
            </Grid>

            {/* Brands section */}
            <Grid item xs={12}>
                <Typography variant='h6'>Brand</Typography>
                <Grid container direction='column'>
                    {brands.map((brand, index) => (
                        <FormControlLabel
                            key={index}
                            control={<Checkbox />}
                            label={`${brand.name} (${brand.count})`}
                        />
                    ))}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={resetFilters}
                >
                    Reset Filters
                </Button>
            </Grid>
        </Grid>
    );
};

export default FilterSidebar;
