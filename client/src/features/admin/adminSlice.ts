// Dependencies imports
import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import {
    createNewProduct,
    getAllCustomers,
    toogleIsActive,
    updateProduct,
} from "./adminThunk";
import { CustomerType } from "types/customerType";
import { Pagination } from "types/productTypes";

const initialState = {
    customers: [] as Array<CustomerType>,
    pagination: {} as Pagination,
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
        // 1. Create new product
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
                    "Unable to create product. Please try again.";
                toast.error(action.error.message);
            });
        // 2. Update product
        builder
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                toast.success(action.payload.message);
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                // Update the message with the error message from the action reciwed from thunk from catch block by throw new Error
                state.message =
                    action.error.message ||
                    // use alias to handle undefined type
                    "Unable to update product. Please try again.";
                toast.error(action.error.message);
            });
        // 3. Toogle isActive
        builder
            .addCase(toogleIsActive.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(toogleIsActive.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                toast.success(action.payload.message);
            })
            .addCase(toogleIsActive.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                // Update the message with the error message from the action reciwed from thunk from catch block by throw new Error
                state.message =
                    action.error.message ||
                    // use alias to handle undefined type
                    "Unable to update product. Please try again.";
                toast.error(action.error.message);
            });
        // 3. Get all customers
        builder
            .addCase(getAllCustomers.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(getAllCustomers.fulfilled, (state, action) => {
                const customers = action.payload.payload.customers;
                // console.log(products);
                const pagination = action.payload.payload.pagination;

                state.pagination = pagination;
                state.customers = customers;
                state.loading = false;
                state.success = true;
                toast.success(action.payload.message);
            })
            .addCase(getAllCustomers.rejected, (state, action) => {
                state.customers = [];
                state.loading = false;
                state.error = true;
                state.success = false;
                // Update the message with the error message from the action reciwed from thunk from catch block by throw new Error
                state.message =
                    action.error.message ||
                    // use alias to handle undefined type
                    "Unable to update product. Please try again.";
                toast.error(action.error.message);
            });
    },
});

export default adminSlice.reducer;
