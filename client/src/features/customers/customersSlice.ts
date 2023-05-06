import { createSlice } from "@reduxjs/toolkit";
import { CustomerType } from "../../types/customerType";
import {
    createNewCustomer,
    getCustomerProfile,
    loginCustomer,
    verifyNewCustomer,
} from "./customersThunk";

import { toast } from "react-toastify";

const initialState = {
    customer: null as CustomerType | null,
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
        // 3. get customer profile by id
        builder
            .addCase(getCustomerProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCustomerProfile.fulfilled, (state, action) => {
                state.customer = action.payload.Customer;
                state.loading = false;
                state.error = false;
                state.success = true;
                state.message = action.payload.message;
                toast.success(action.payload.message);
            })
            .addCase(getCustomerProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                state.message =
                    action.error.message ||
                    "Unable to reset password. Please try again.";
                state.customer = null;
                toast.error(action.error.message);
                console.log(state.message);
            });
        // 4. Loggin customer
        builder
            .addCase(loginCustomer.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(loginCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.success = true;
                state.message = action.payload.message;
                toast.success(action.payload.message);
            })
            .addCase(loginCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                state.message =
                    action.error.message ||
                    "Unable to login. Please try again.";
                toast.error(action.error.message);
                console.log(state.message);
            });
    },
});

export default customerSlice.reducer;