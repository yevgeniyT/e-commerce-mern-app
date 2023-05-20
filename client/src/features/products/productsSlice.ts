// Dependencies imports
import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { ProductType, Pagination } from "types/productTypes";
import {
    getAllProducts,
    getFilteredProducts,
    getSerchedProducts,
    getSingleProduct,
} from "./productsThunk";

const initialState = {
    products: [] as Array<ProductType>,
    singleProduct: {} as ProductType | null,
    pagination: {} as Pagination,
    searchResults: [] as Array<ProductType>,
    loading: false,
    error: false,
    success: false,
    message: "",
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        sortProducts: (state, action) => {
            switch (action.payload) {
                case "price_low_to_high":
                    state.products.sort((a, b) => a.price - b.price);
                    break;
                case "price_high_to_low":
                    state.products.sort((a, b) => b.price - a.price);
                    break;
                default:
                    break;
            }
        },
        resetSerchInput: (state) => {
            state.searchResults = [];
        },
    },
    extraReducers: (builder) => {
        // 1 Get all products
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                const products = action.payload.payload.products;
                // console.log(products);
                const pagination = action.payload.payload.pagination;

                state.pagination = pagination;
                state.products = products;
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                // Update the message with the error message from the action recieved from thunk from catch block by throw new Error
                state.message =
                    action.error.message ||
                    // use alias to handle undefined type
                    "Unable to fetch all products.";
                toast.error(action.error.message);
                console.log(state.message);
            });
        builder
            // 2. Get filtered Products
            .addCase(getFilteredProducts.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(getFilteredProducts.fulfilled, (state, action) => {
                const products = action.payload.payload.products;
                // console.log(products);
                state.products = products;
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                toast.success(action.payload.message);
            })
            .addCase(getFilteredProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                state.products = [];
                // Update the message with the error message from the action recieved from thunk from catch block by throw new Error
                state.message =
                    action.error.message ||
                    // use alias to handle undefined type
                    "Unable to fetch all products.";
                toast.error(action.error.message);
                console.log(state.message);
            });
        builder
            // 2. Get single Productt
            .addCase(getSingleProduct.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(getSingleProduct.fulfilled, (state, action) => {
                const product = action.payload.payload.product;
                state.singleProduct = product;
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                toast.success(action.payload.message);
            })
            .addCase(getSingleProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                state.singleProduct = null;
                state.message =
                    action.error.message || "Unable to fetch the product.";
                toast.error(action.error.message);
                console.log(state.message);
            });
        // 1 Get serched products
        builder
            .addCase(getSerchedProducts.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(getSerchedProducts.fulfilled, (state, action) => {
                const products = action.payload.payload.products;
                // console.log(products);
                state.searchResults = products;
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                toast.success(action.payload.message);
            })
            .addCase(getSerchedProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                // Update the message with the error message from the action recieved from thunk from catch block by throw new Error
                state.message =
                    action.error.message ||
                    // use alias to handle undefined type
                    "Unable to fetch all products.";
                toast.error(action.error.message);
                console.log(state.message);
            });
    },
});
export const { sortProducts, resetSerchInput } = productsSlice.actions;
export default productsSlice.reducer;
