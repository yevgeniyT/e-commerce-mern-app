import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { OrderType } from "types/ordersTypes";

interface ErrorResponseData {
    message: string;
}

const BASE_URL = "http://localhost:8080/api/v1/orders";

// 1. Get all products
// const getAllCategories = createAsyncThunk(
//     "categories/getAllcategories",
//     async () => {
//         try {
//             const response = await axios.get(`${BASE_URL}`);
//             // console.log(response.data.payload);

//             return response.data;
//         } catch (error) {
//             // use type of error from axios to type error massege from backend
//             const axiosError = error as AxiosError;
//             if (axiosError.response) {
//                 const errorData = axiosError.response.data as ErrorResponseData;
//                 //When an error is thrown in the async thunk, Redux Toolkit automatically triggers the rejected case in the slice. The error object thrown in the thunk is passed to the rejected case through the action.error object.
//                 throw new Error(errorData.message);
//             }
//             throw new Error("Failed to fetch all brands");
//         }
//     }
// );

// 2 Create order
const createNewOrder = createAsyncThunk(
    "order/createNeworder",
    async (newCategory: OrderType) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/`,
                {
                    items: newCategory.items,
                    deliveryCost: newCategory.deliveryCost,
                    totalPrice: newCategory.totalPrice,
                },
                { withCredentials: true } // To send token back to backend
            );
            return response.data;
        } catch (error) {
            // use type of error from axios to type error massege from backend
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                const errorData = axiosError.response.data as ErrorResponseData;
                //When an error is thrown in the async thunk, Redux Toolkit automatically triggers the rejected case in the slice. The error object thrown in the thunk is passed to the rejected case through the action.error object.
                throw new Error(errorData.message);
            }
            throw new Error("Failed to create new order");
        }
    }
);
export { createNewOrder };
