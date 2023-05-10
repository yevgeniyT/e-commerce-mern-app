import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { UserCredentials, CustomerPayload } from "types/customerType";

interface ErrorResponseData {
    message: string;
}
interface ResetPasswordData {
    email: string;
    password: string;
}

interface ResetPasswordResponse {
    message: string;
}
const BASE_URL = "http://localhost:8080/api/v1/customers";

// 1. Post request to register user to backend
const createNewCustomer = createAsyncThunk(
    "customer/createNewCustomer",
    async (newCustomer: FormData) => {
        // log form data this way
        // for (const [key, value] of newUser) {
        //   console.log(key, value);
        // }

        try {
            const response = await axios.post(
                `${BASE_URL}/create`,
                newCustomer
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
            throw new Error("Failed to create new customer");
        }
    }
);
// 2. Post request to verify email
const verifyNewCustomer = createAsyncThunk(
    "customer/verifyNewCustomer",
    // 1. get token from acountActivation component
    async (token: string) => {
        try {
            // 2. post request to the router verify-email from backend (see in userRouters)
            const response = await axios.post(`${BASE_URL}/verify-customer`, {
                token,
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
            throw new Error("Failed to create new customer");
        }
    }
);
// 3. Post reqiest to backend login user
const loginCustomer = createAsyncThunk(
    "customer/loginCustomer",
    async (credentials: UserCredentials) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/login`,
                credentials,
                {
                    withCredentials: true,
                }
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
            throw new Error("Failed to login");
        }
    }
);
// 3.1 Log out customer
// TODO logout customer
// 4. Post reqiest to send email to reset password
const forgotPassword = createAsyncThunk(
    "customer/forgotpassword",
    async (email: string) => {
        try {
            const response = await axios.post(`${BASE_URL}/forgot-password`, {
                email,
            });
            console.log(response.data.message);
            return response.data;
        } catch (error) {
            // use type of error from axios to type error massege from backend
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                const errorData = axiosError.response.data as ErrorResponseData;
                //When an error is thrown in the async thunk, Redux Toolkit automatically triggers the rejected case in the slice. The error object thrown in the thunk is passed to the rejected case through the action.error object.
                console.log(errorData.message);

                throw new Error(errorData.message);
            }
            throw new Error("Error on reseting password");
        }
    }
);
// 5 Post reqiest to verify email to reset password
const resetPasswordVarification = createAsyncThunk(
    "customer/resetPasswordVarification",
    async (token: string) => {
        try {
            const response = await axios.post(`${BASE_URL}/verify-password`, {
                token,
            });
            console.log(response.data.message);
            return response.data;
        } catch (error) {
            // use type of error from axios to type error massege from backend
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                const errorData = axiosError.response.data as ErrorResponseData;
                //When an error is thrown in the async thunk, Redux Toolkit automatically triggers the rejected case in the slice. The error object thrown in the thunk is passed to the rejected case through the action.error object.
                console.log(errorData);

                throw new Error(errorData.message);
            }
            throw new Error("Error on reseting password");
        }
    }
);
// 6 Post reqiest to set new password
const setNewPassword = createAsyncThunk<
    ResetPasswordResponse,
    ResetPasswordData
>("customer/setNewPassword", async (resetPasswordData) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/set-newpassword`,
            resetPasswordData
        );
        console.log(response.data.message);
        return response.data;
    } catch (error) {
        // use type of error from axios to type error massege from backend
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            const errorData = axiosError.response.data as ErrorResponseData;
            //When an error is thrown in the async thunk, Redux Toolkit automatically triggers the rejected case in the slice. The error object thrown in the thunk is passed to the rejected case through the action.error object.
            console.log(errorData.message);

            throw new Error(errorData.message);
        }
        throw new Error("Error on reseting password");
    }
});
// 7.Read customer Profile
const getCustomerProfile = createAsyncThunk(
    "customer/getCustomerProfile",
    async () => {
        try {
            // use this- { withCredentials: true } to send cookie to backend
            const response = await axios.get(`${BASE_URL}/profile`, {
                withCredentials: true,
            });
            // console.log(response.data);
            return response.data;
        } catch (error) {
            // use type of error from axios to type error massege from backend
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                const errorData = axiosError.response.data as ErrorResponseData;
                //When an error is thrown in the async thunk, Redux Toolkit automatically triggers the rejected case in the slice. The error object thrown in the thunk is passed to the rejected case through the action.error object.
                throw new Error(errorData.message);
            }
            throw new Error("Failed to fetch customer profile");
        }
    }
);

// 8. Update customer Profile
const updateCustomerProfile = createAsyncThunk(
    "customer/updateCustomerProfile",
    async (updatedCustomerData: CustomerPayload) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/profile`,
                updatedCustomerData,
                {
                    withCredentials: true,
                }
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
            throw new Error("Failed to update customer profile");
        }
    }
);
export {
    createNewCustomer,
    verifyNewCustomer,
    getCustomerProfile,
    loginCustomer,
    forgotPassword,
    resetPasswordVarification,
    setNewPassword,
    updateCustomerProfile,
};
