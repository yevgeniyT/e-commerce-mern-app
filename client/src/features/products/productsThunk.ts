import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { FilteredProductsParams } from "types/productTypes";

interface ErrorResponseData {
    message: string;
}

const BASE_URL = "http://localhost:8080/api/v1/products";

// 1. Get all products
const getAllProducts = createAsyncThunk(
    "products/getAllproducts",
    async ({ page, limit }: { page: number; limit: number }) => {
        try {
            // add page as query parameter
            const response = await axios.get(
                `${BASE_URL}?page=${page}&limit=${limit}`
            );
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
            throw new Error("Failed to fetch all products");
        }
    }
);

// 2. Get filtered products
const getFilteredProducts = createAsyncThunk(
    "products/getFilteredproducts",
    async ({
        priceRange,
        checkedCategories,
        checkedBrands,
    }: FilteredProductsParams) => {
        try {
            // add page as query parameter
            const response = await axios.post(`${BASE_URL}/filtered`, {
                priceRange,
                checkedCategories,
                checkedBrands,
            });

            return response.data;
        } catch (error) {
            // use type of error from axios to type error massege from backend
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                const errorData = axiosError.response.data as ErrorResponseData;
                //When an error is thrown in the async thunk, Redux Toolkit automatically triggers the rejected case in the slice. The error object thrown in the thunk is passed to the rejected case through the action.error object.
                throw new Error(errorData.message);
            }
            throw new Error("Failed to fetch all products");
        }
    }
);

// 3. Get single product by ID

const getSingleProduct = createAsyncThunk(
    "products/getSingleProduct",
    async (id: string) => {
        try {
            // add page as query parameter
            const response = await axios.get(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            // use type of error from axios to type error massege from backend
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                const errorData = axiosError.response.data as ErrorResponseData;
                //When an error is thrown in the async thunk, Redux Toolkit automatically triggers the rejected case in the slice. The error object thrown in the thunk is passed to the rejected case through the action.error object.
                throw new Error(errorData.message);
            }
            throw new Error("Failed to fetch single product");
        }
    }
);

export { getAllProducts, getFilteredProducts, getSingleProduct };
