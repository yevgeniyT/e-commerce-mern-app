import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import customersReducer from "features/customers/customersSlice";
import productsReducer from "features/products/productsSlice";

export const store = configureStore({
    reducer: {
        customerR: customersReducer,
        productsR: productsReducer,
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
