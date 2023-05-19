import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "types/productTypes";
import { createNewOrder } from "./cartThunk";
import { toast } from "react-toastify";

const initialState = {
    cart: [] as Array<ProductType>,
    loading: false,
    error: false,
    success: false,
    message: "",
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
    extraReducers: (builder) => {
        // 1. Create new product
        builder
            .addCase(createNewOrder.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(createNewOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                toast.success(action.payload.message);
            })
            .addCase(createNewOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                // Update the message with the error message from the action reciwed from thunk from catch block by throw new Error
                state.message =
                    action.error.message ||
                    // use alias to handle undefined type
                    "Unable to create order";
                toast.error(action.error.message);
            });
    },
});

export const { addProductToCart, deleteProductFromCart, clearCart } =
    cartList.actions;

export default cartList.reducer;
