import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface ErrorResponseData {
    message: string;
}

const BASE_URL = "http://localhost:8080/api/v1/admin";

const createNewProduct = createAsyncThunk(
    "admin/createNewProduct",
    async (newProduct: FormData) => {
        // log form data this way
        for (const [key, value] of newProduct) {
            console.log(key, value);
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/products`,
                newProduct,
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
            throw new Error("Failed to create new product");
        }
    }
);

export { createNewProduct };
