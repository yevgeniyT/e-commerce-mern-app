// Dependencies imports
import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { createNewProduct } from "./adminThunk";

const initialState = {
    loading: false,
    error: false,
    success: false,
    message: "",
};

export const adminSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        // fill with your reducer functions if you have any
    },
    extraReducers: (builder) => {
        // 1. Register new User
        builder
            .addCase(createNewProduct.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(createNewProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                toast.success(action.payload.message);
            })
            .addCase(createNewProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                // Update the message with the error message from the action reciwed from thunk from catch block by throw new Error
                state.message =
                    action.error.message ||
                    // use alias to handle undefined type
                    "Unable to create custimers's account. Please try again.";
                toast.error(action.error.message);
            });
    },
});

export default adminSlice.reducer;
