import { createSlice } from "@reduxjs/toolkit";
import { CustomerType } from "../../types/customerType";
import { createNewCustomer } from "./customersThunk";

import { toast } from "react-toastify";
import { log } from "console";

const initialState = {
    customers: [] as CustomerType[],
    loading: false,
    error: false,
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
                console.log(action.payload);
                toast.success(action.payload.message);
            })
            .addCase(createNewCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                // Update the message with the error message from the action reciwed from thunk from catch block by throw new Error
                state.message =
                    action.error.message ||
                    // use alias to handle undefined type
                    "Unable to create custimers's account. Please try again.";
                toast.error(action.error.message);
            });
    },
});

export default customerSlice.reducer;
