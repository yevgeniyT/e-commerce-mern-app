// Dependencies import
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";

// MUI  import
import {
    Container,
    Grid,
    Typography,
    TextField,
    Button,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { getAllCategories } from "features/categories/categoryThunk";
import { getAllBrands } from "features/brands/brandThunk";
import { updateProduct } from "features/admin/adminThunk";

const AdminProductEditePage: React.FC = () => {
    //Use hooks
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Get data from store
    const { singleProduct } = useAppSelector((state) => state.productsR);

    console.log("diatils action");

    const categories = useAppSelector((state) => state.categoriesR.categories);
    const brands = useAppSelector((state) => state.brandsR.brands);

    // 1. Set nedded states
    // 1.1 Set state to get and store users data from input
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        images: [] as File[] | null, // Here's the change
    });

    const [Category, setCategory] = useState("");
    const [Brand, setBrand] = useState("");

    // 2. Actions handelers
    // 2.1 Handle actions on submit form data
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const newProductData = new FormData();
            newProductData.append("name", newProduct.name);
            newProductData.append("description", newProduct.description);
            newProductData.append("price", newProduct.price);
            newProductData.append("category", Category);
            newProductData.append("brand", Brand);
            if (newProduct.images) {
                newProduct.images.forEach((image, index) => {
                    // Loop through the images and append each one. The forEach loop provides two values: the current item (in this case, image), and the current index (in this case, index).For the first image file in the array, index will be 0 and image will be the first image file. So, "images[" + index + "]" -> (expression of concatination) will be "images[0]", and the append method will add a field named "images[0]" with the value of the first image file to the FormData object.
                    newProductData.append("images", image);
                });
            }

            if (singleProduct) {
                dispatch(
                    updateProduct({
                        id: singleProduct._id,
                        newProductData: newProductData,
                    })
                );
                navigate("/admin/account/products");
            } else {
                console.log("Cant update product");
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error while creating form-data - ", error.message);
            } else {
                console.log(
                    "An unknown error occurred while creating form-data."
                );
            }
        }
    };
    // 2.2 Handle data from input fileds
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProduct((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };
    // 2.3 Handle image upload
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setNewProduct((prev) => ({
                ...prev,
                images: Array.from(files),
            }));
        }
    };
    // SelectChangeEvent imported from MUI and used to type select filed as React.ChangeEvent<HTMLInputElement> is not working here
    const handleSelectCategory = (event: SelectChangeEvent) => {
        if (typeof event.target.value === "string") {
            setCategory(event.target.value);
        }
    };
    const handleSelectBrand = (event: SelectChangeEvent) => {
        if (typeof event.target.value === "string") {
            setBrand(event.target.value);
        }
    };

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllBrands());
    }, [dispatch]);

    // Use useEffect to update state when singleProduct changes
    useEffect(() => {
        if (singleProduct) {
            setNewProduct({
                name: singleProduct.name || "",
                description: singleProduct.description || "",
                price: singleProduct.price.toString() || "",
                images: null,
            });
            setCategory(singleProduct.category.name);
        }
    }, [singleProduct]);

    return (
        <Container maxWidth='sm'>
            <Box sx={{ mt: 8 }}>
                <Typography variant='h4' align='center' sx={{ mb: 3 }}>
                    Update Product
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name='name'
                                label='Name'
                                value={newProduct.name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                multiline // Allows the field to expand vertically
                                rows={4} // Specifies the number of visible lines
                                name='description'
                                label='Description'
                                value={newProduct.description}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type='number'
                                name='price'
                                label='Price'
                                value={newProduct.price}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {/* FormControl is used here to set lable inside input filed and manage it behavior by mooving on hoovering in the left to corner */}
                            <FormControl fullWidth required>
                                {/* Neede to show name of lable inside input filed */}
                                <InputLabel id='category-label'>
                                    Category
                                </InputLabel>
                                <Select
                                    // conected to input lable by id
                                    labelId='category-label'
                                    name='category'
                                    value={Category}
                                    //needed to make Category lable be in front of border line
                                    input={<OutlinedInput label='Category' />}
                                    onChange={handleSelectCategory}
                                >
                                    {categories.map((category) => (
                                        <MenuItem
                                            key={category._id}
                                            value={category._id}
                                        >
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            {/* FormControl is used here to set lable inside input filed and manage it behavior by mooving on hoovering in the left to corner */}
                            <FormControl fullWidth required>
                                {/* Neede to show name of lable inside input filed */}
                                <InputLabel id='brand-label'>Brand</InputLabel>
                                <Select
                                    // conected to input lable by id
                                    labelId='brand-label'
                                    name='brand'
                                    value={Brand}
                                    //needed to make Category lable be in front of border line
                                    input={<OutlinedInput label='Brand' />}
                                    onChange={handleSelectBrand}
                                >
                                    {brands.map((brand) => (
                                        <MenuItem
                                            key={brand._id}
                                            value={brand._id}
                                        >
                                            {brand.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <input
                                accept='image/*'
                                id='contained-button-file'
                                multiple
                                type='file'
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                            <label htmlFor='contained-button-file'>
                                <Button variant='contained' component='span'>
                                    Upload Images
                                </Button>
                            </label>
                            {newProduct.images &&
                                newProduct.images.map((image, index) => (
                                    <p key={index}>{image.name}</p>
                                ))}
                        </Grid>
                        <Grid item xs={12}>
                            <Box display='flex' justifyContent='space-between'>
                                <Button
                                    sx={{ textTransform: "none" }}
                                    fullWidth
                                    variant='contained'
                                    color='primary'
                                    style={{ marginRight: "8px" }}
                                    onClick={() =>
                                        navigate("/admin/account/products")
                                    }
                                >
                                    Back
                                </Button>
                                <Button
                                    sx={{ textTransform: "none" }}
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    color='primary'
                                >
                                    Update Product
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default AdminProductEditePage;
