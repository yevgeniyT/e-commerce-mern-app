import { createSlice } from "@reduxjs/toolkit";
import { CustomerType } from "../../types/customerType";
import { createNewCustomer, verifyNewCustomer } from "./customersThunk";

import { toast } from "react-toastify";

const initialState = {
    customers: [] as CustomerType[],
    loading: false,
    error: false,
    success: false,
    message: "",
};

export const customerSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Used to cleare message states to emtpy while navigating between pages
        resetError: (state) => {
            state.error = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        // 1. Register new User
        builder
            .addCase(createNewCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(createNewCustomer.fulfilled, (state, action) => {
                // const newCustomer = action.payload;
                // state.customers = [...state.customers, newCustomer];
                state.loading = false;
                state.success = true;
                toast.success(action.payload.message);
            })
            .addCase(createNewCustomer.rejected, (state, action) => {
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
        // 2. Verify new User
        builder
            .addCase(verifyNewCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyNewCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.message = action.payload.message;
                state.success = true;
                toast.success(action.payload.message);
            })
            .addCase(verifyNewCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                state.message =
                    action.error.message ||
                    "Unable to activate user account. Please try again.";
                toast.error(action.error.message);
                console.log(state.message);
            });
    },
});

export default customerSlice.reducer;
