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
    const [priceRange, setPriceRange] = useState({ min: 0, max: 300 });
    const [sliderRange, setSliderRange] = useState([0, 300]); // Set initial slider range

    // Update the state when the price range inputs change
    const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPriceRange = {
            ...priceRange,
            [e.target.name]: e.target.value,
        };
        setPriceRange(newPriceRange);

        // If both min and max fields have a value, update the slider
        if (newPriceRange.min !== 0 && newPriceRange.max !== 300) {
            setSliderRange([
                Number(newPriceRange.min),
                Number(newPriceRange.max),
            ]);
        }
    };
    //It takes two parameters: an underscore _, and newValue. The underscore _ is a convention in JavaScript and TypeScript meaning that the variable is not going to be used in the function body, and you don't care about its value. In this case, the first parameter of the onChange callback of the Slider component is the event, but we don't need it, so we ignore it with _.
    //newValue: number | number[] means that newValue can be either a single number or an array of numbers. In this case, since we're working with a range slider, newValue will always be an array of two numbers: the minimum and maximum of the range.
    const handleSliderRangeChange = (_: any, newValue: number | number[]) => {
        setSliderRange(newValue as number[]);
        setPriceRange({
            min: (newValue as number[])[0],
            max: (newValue as number[])[1],
        });
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
    const handleReset = () => {
        // TODO: Reset the state for categories and brands checkboxes
    };

    return (
        <Grid container spacing={12} sx={{ padding: "16px" }}>
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
                        max={300}
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
                    onClick={handleReset}
                >
                    Reset Filters
                </Button>
            </Grid>
        </Grid>
    );
};

export default FilterSidebar;
