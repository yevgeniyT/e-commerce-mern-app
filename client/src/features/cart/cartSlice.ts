import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "types/productTypes";

const initialState = {
    cart: [] as Array<ProductType>,
};

export const cartList = createSlice({
    name: "cartList",
    initialState: initialState,
    reducers: {
        addProductToCart: (state, action) => {
            state.cart.push(action.payload);
        },

        deleteProductFromCart: (state, action) => {
            state.cart = state.cart.filter(
                (product) => product._id !== action.payload
            );
        },
        clearCart: (state) => {
            state.cart = [];
        },
    },
});

export const { addProductToCart, deleteProductFromCart, clearCart } =
    cartList.actions;

export default cartList.reducer;
