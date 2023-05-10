// Dependencies imports
import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { ProductType } from "types/productTypes";
import { getAllProducts } from "./productsThunk";

const initialState = {
    products: [] as Array<ProductType>,
    loading: false,
    error: false,
    success: false,
    message: "",
};

export const productsSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                const products = action.payload.payload.products;
                // console.log(products);

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
export default productsSlice.reducer;
