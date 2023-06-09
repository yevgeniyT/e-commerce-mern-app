import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface ErrorResponseData {
    message: string;
}

const BASE_URL = "http://localhost:8888/api/v1/brands";

// 1. Get all products
const getAllBrands = createAsyncThunk("brands/getAllbrands", async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
        // console.log(response.data.payload);

        return response.data;
    } catch (error) {
        // use type of error from axios to type error massege from backend
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            const errorData = axiosError.response.data as ErrorResponseData;
            //When an error is thrown in the async thunk, Redux Toolkit automatically triggers the rejected case in the slice. The error object thrown in the thunk is passed to the rejected case through the action.error object.
            throw new Error(errorData.message);
        }
        throw new Error("Failed to fetch all brands");
    }
});

export { getAllBrands };
