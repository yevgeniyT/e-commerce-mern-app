// Dependencies imports
import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { getAllCategories, getSingleCategory } from "./categoryThunk";
import { CategoryType } from "types/categoryType";

const initialState = {
    categories: [] as Array<CategoryType>,
    singleCategory: {} as CategoryType | null,
    loading: false,
    error: false,
    success: false,
    message: "",
};

export const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                const categories = action.payload.payload.finalCategories;

                state.categories = categories;
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                toast.success(action.payload.message);
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                // Update the message with the error message from the action reciwed from thunk from catch block by throw new Error
                state.message =
                    action.error.message ||
                    // use alias to handle undefined type
                    "Unable to fetch all brands.";
                toast.error(action.error.message);
                console.log(state.message);
            });

        // 2. Get single Category
        builder
            .addCase(getSingleCategory.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(getSingleCategory.fulfilled, (state, action) => {
                const category = action.payload.payload.category;
                state.singleCategory = category;
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                toast.success(action.payload.message);
            })
            .addCase(getSingleCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                state.singleCategory = null;
                state.message =
                    action.error.message || "Unable to fetch the product.";
                toast.error(action.error.message);
                console.log(state.message);
            });
    },
});

export default categorySlice.reducer;
