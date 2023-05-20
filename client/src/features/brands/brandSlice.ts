// Dependencies imports
import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { BrandType } from "types/brandTypes";
import { getAllBrands } from "./brandThunk";

const initialState = {
    brands: [] as Array<BrandType>,
    loading: false,
    error: false,
    success: false,
    message: "",
};

export const brandSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllBrands.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(getAllBrands.fulfilled, (state, action) => {
                const brands = action.payload.payload.brands;
                state.brands = brands;
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(getAllBrands.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                // Update the message with the error message from the action reciwed from thunk from catch block by throw new Error
                state.message =
                    action.error.message ||
                    // use alias to handle undefined type
                    "Unable to fetch all brands.";

                console.log(state.message);
            });
    },
});

export default brandSlice.reducer;
