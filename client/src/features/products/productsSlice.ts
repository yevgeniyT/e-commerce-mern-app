// Dependencies imports
import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { ProductType, Pagination } from "types/productTypes";
import { getAllProducts } from "./productsThunk";

const initialState = {
    products: [] as Array<ProductType>,
    pagination: {} as Pagination,
    loading: false,
    error: false,
    success: false,
    message: "",
};

export const productsSlice = createSlice({
    name: "auth",
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
    },
    extraReducers: (builder) => {
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
                toast.success(action.payload.message);
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                // Update the message with the error message from the action reciwed from thunk from catch block by throw new Error
                state.message =
                    action.error.message ||
                    // use alias to handle undefined type
                    "Unable to fetch all products.";
                toast.error(action.error.message);
                console.log(state.message);
            });
    },
});
export const { sortProducts } = productsSlice.actions;
export default productsSlice.reducer;
