import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import customersReducer from "features/customers/customersSlice";
import productsReducer from "features/products/productsSlice";
import brandReducer from "features/brands/brandSlice";
import categoryReducer from "features/categories/categorySlice";

export const store = configureStore({
    reducer: {
        customerR: customersReducer,
        productsR: productsReducer,
        brandsR: brandReducer,
        categoriesR: categoryReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
