import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { NewCategory } from "types/categoryType";

interface ErrorResponseData {
    message: string;
}

const BASE_URL = "http://localhost:8888/api/v1/admin";

// 1. Create new product
const createNewProduct = createAsyncThunk(
    "admin/createNewProduct",
    async (newProduct: FormData) => {
        // log form data this way
        // for (const [key, value] of newProduct) {
        //     console.log(key, value);
        // }

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

// 2. Update product
const updateProduct = createAsyncThunk(
    "admin/updateProduct",
    async ({
        newProductData,
        id,
    }: {
        newProductData: FormData;
        id: string;
    }) => {
        // log form data this way
        // for (const [key, value] of newProductData) {
        //     console.log(key, value);
        // }

        try {
            const response = await axios.put(
                `${BASE_URL}/products/${id}`,
                newProductData,
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
            throw new Error("Failed to update product");
        }
    }
);
// 3. Togle isActive
const toogleIsActive = createAsyncThunk(
    "admin/toogleIsActive",
    async (id: string) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/products/${id}/active`,
                {},
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
            throw new Error("Failed to toogle isActive ");
        }
    }
);

// 4. Get all products
const getAllCustomers = createAsyncThunk(
    "admin/getAllCustomers",
    async ({ page, limit }: { page: number; limit: number }) => {
        try {
            // add page as query parameter
            const response = await axios.get(
                `${BASE_URL}/customers?page=${page}&limit=${limit}`,
                { withCredentials: true } // To send token back to backend
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
            throw new Error("Failed to fetch all customers");
        }
    }
);

// 5. Create new category
const createNewCategory = createAsyncThunk(
    "admin/createNewCategory",
    async (newCategory: NewCategory) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/categories`,
                { name: newCategory.name },
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
// 6. Update category
const updateCategory = createAsyncThunk(
    "admin/updateCategory",
    async ({
        newCategoryData,
        id,
    }: {
        newCategoryData: NewCategory;
        id: string;
    }) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/categories/${id}`,
                { name: newCategoryData.name },
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
            throw new Error("Failed to update product");
        }
    }
);
// 7. Update category
const deleteCategory = createAsyncThunk(
    "admin/deleteCategory",
    async (id: string) => {
        try {
            const response = await axios.delete(
                `${BASE_URL}/categories/${id}`,
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
            throw new Error("Failed to update product");
        }
    }
);
// 4. Get all products
const getAllOrders = createAsyncThunk(
    "admin/getAllOrders",
    async ({ page, limit }: { page: number; limit: number }) => {
        try {
            // add page as query parameter
            const response = await axios.get(
                `${BASE_URL}/orders?page=${page}&limit=${limit}`,
                { withCredentials: true } // To send token back to backend
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
            throw new Error("Failed to fetch all orders");
        }
    }
);

export {
    createNewProduct,
    updateProduct,
    toogleIsActive,
    getAllCustomers,
    createNewCategory,
    updateCategory,
    deleteCategory,
    getAllOrders,
};
