import React, { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "redux/hooks";

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
import { CategoryType } from "../types/categoryType";
import { BrandType } from "types/brandTypes";
import { getAllBrands } from "features/brands/brandThunk";
import { getAllCategories } from "features/categories/categoryThunk";
import { getFilteredProducts } from "features/products/productsThunk";

const FilterSidebar = () => {
    //use hooks
    const dispatch = useAppDispatch();
    // get data from store
    const { brands } = useAppSelector((state) => state.brandsR);
    const { categories } = useAppSelector((state) => state.categoriesR);
    const { products } = useAppSelector((state) => state.productsR);

    // Initialize the price range state with the minimum and maximum prices of all products
    //reduce is used to reduce the array to a single value. This method does not change the original array.
    //reduce takes a callback function as its first argument. This function is executed on each element of the array.The result of the function is stored in an accumulator (in this case, min), which is then used as a parameter in the next execution of the function.
    //The callback function here takes two arguments: min and product. min is the accumulator, and product is the current element in the array. This function is executed on every product in the products array.
    //Inside the callback function, Math.min(min, product.price) is used to compare the current minimum price (min) and the price of the current product (product.price).it's comparing the current smallest price found so far with the price of the current product, and returning the smaller of the two.
    //Infinity is the initial value of the min accumulator. This is the second argument to the reduce method. It's a way to ensure that any price from the products array will be less than the initial value, as Infinity is the largest possible number in JavaScript.
    // Summary: Go through each product in the products array, and for each one, compare its price to the current smallest price found. If this product's price is smaller, then it becomes the new smallest price. Continue this until we've checked every product, and give me the smallest price found." This smallest price is then stored in the minPrice constant.
    // const minPrice = products.reduce(
    //     (min, product) => Math.min(min, product.price),
    //     Infinity
    // );
    // const maxPrice = products.reduce(
    //     (max, product) => Math.max(max, product.price),
    //     0
    // );

    const [priceRange, setPriceRange] = useState({
        min: 0,
        max: 300,
    });
    const [sliderRange, setSliderRange] = useState([0, 300]);

    // Add state to save array of checked categories and brands
    const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
    const [checkedBrands, setCheckedBrands] = useState<string[]>([]);

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
    // Reset all filters
    const handleReset = () => {
        // Reset price range
        setPriceRange({ min: 0, max: 300 });
        setSliderRange([0, 300]);

        // Reset categories
        setCheckedCategories([]);

        // Reset brands
        setCheckedBrands([]);
    };

    //dispatch action to get brand
    useEffect(() => {
        dispatch(getAllBrands());
    }, [dispatch]);
    //dispatch action to get categories
    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            getFilteredProducts({
                priceRange: [priceRange.min, priceRange.max], // Transform to array
                checkedCategories,
                checkedBrands,
            })
        );
    }, [checkedBrands, checkedCategories, dispatch, priceRange]);

    //Save checked categories in state
    const handleCheckedCategories = (categoryId: string) => {
        //What ever is already in previous state
        setCheckedCategories((prevCategories) => {
            // Check if the category is already in the array
            // If it is, remove it (uncheck the category)
            //includes() method  is used to check if a certain value exists in an array or not. It returns true if the value is found in the array, and false otherwise.
            if (prevCategories.includes(categoryId)) {
                return prevCategories.filter((id) => id !== categoryId);
            }
            // If it's not in the array, add it (check the category)
            else {
                return [...prevCategories, categoryId];
            }
        });
    };

    // Save checked Barnds in state

    const handleChekedBrands = (brandId: string) => {
        // Whatever we have in previous state
        setCheckedBrands((previousBrands) => {
            if (previousBrands.includes(brandId)) {
                return previousBrands.filter((id) => id !== brandId);
            } else {
                return [...previousBrands, brandId];
            }
        });
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
                    {categories.map((category: CategoryType) => (
                        <FormControlLabel
                            key={category._id}
                            control={
                                // The checked prop determines whether the checkbox is checked or not. If the value you pass to checked is true, the checkbox will be checked; if it's false, the checkbox will be unchecked.
                                //checkedCategories.includes(category._id): checking if the current category's ID is in the checkedCategories array. If the category's ID is in the array, that means the user has checked that checkbox, so checkedCategories.includes(category._id) will be true and the checkbox will be checked. If the category's ID is not in the array, that means the user has not checked that checkbox, so checkedCategories.includes(category._id) will be false and the checkbox will be unchecked.
                                <Checkbox
                                    checked={checkedCategories.includes(
                                        category._id
                                    )}
                                />
                            }
                            label={`${category.name} (${category.productCount})`}
                            onChange={() => {
                                handleCheckedCategories(category._id);
                            }}
                        />
                    ))}
                </Grid>
            </Grid>

            {/* Brands section */}
            <Grid item xs={12}>
                <Typography variant='h6'>Brand</Typography>
                <Grid container direction='column'>
                    {brands.map((brand: BrandType) => (
                        <FormControlLabel
                            key={brand._id}
                            control={
                                <Checkbox
                                    checked={checkedBrands.includes(brand._id)}
                                />
                            }
                            label={`${brand.name} (${brand.productCount})`}
                            onChange={() => {
                                handleChekedBrands(brand._id);
                            }}
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
