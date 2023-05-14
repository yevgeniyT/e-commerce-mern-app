import { createSlice } from "@reduxjs/toolkit";
import { CustomerType } from "../../types/customerType";
import {
    createNewCustomer,
    forgotPassword,
    getCustomerProfile,
    logOutCustomer,
    loginCustomer,
    resetPasswordVarification,
    setNewPassword,
    updateCustomerProfile,
    verifyNewCustomer,
} from "./customersThunk";

import { toast } from "react-toastify";

const initialState = {
    isLoggedIn: false,
    isAdmin: false,
    customer: null as CustomerType | null,
    csutomerShortData: {} as CustomerType,
    loading: false,
    error: false,
    success: false,
    message: "",
};

export const customerSlice = createSlice({
    name: "customer",
    initialState,
    // TODO Find out if it's used anywahere
    reducers: {
        // Used to cleare message states to emtpy while navigating between pages
        resetError: (state) => {
            state.error = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        // 1. Register new User
        builder
            .addCase(createNewCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(createNewCustomer.fulfilled, (state, action) => {
                // const newCustomer = action.payload;
                // state.customers = [...state.customers, newCustomer];
                state.loading = false;
                state.success = true;
                toast.success(action.payload.message);
            })
            .addCase(createNewCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                // Update the message with the error message from the action reciwed from thunk from catch block by throw new Error
                state.message =
                    action.error.message ||
                    // use alias to handle undefined type
                    "Unable to create custimers's account. Please try again.";
                toast.error(action.error.message);
            });
        // 2. Verify new User
        builder
            .addCase(verifyNewCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyNewCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.message = action.payload.message;
                state.success = true;
                toast.success(action.payload.message);
            })
            .addCase(verifyNewCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                state.message =
                    action.error.message ||
                    "Unable to activate user account. Please try again.";
                toast.error(action.error.message);
                console.log(state.message);
            });
        // 3. get customer profile by id
        builder
            .addCase(getCustomerProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCustomerProfile.fulfilled, (state, action) => {
                state.customer = action.payload.Customer;
                state.loading = false;
                state.error = false;
                state.success = true;
                state.message = action.payload.message;
                toast.success(action.payload.message);
            })
            .addCase(getCustomerProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                state.message =
                    action.error.message ||
                    "Unable to reset password. Please try again.";
                state.customer = null;
                toast.error(action.error.message);
                console.log(state.message);
            });
        // 4. Loggin customer
        builder
            .addCase(loginCustomer.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.isLoggedIn = false;
            })
            .addCase(loginCustomer.fulfilled, (state, action) => {
                //TODO update to use state instedof isAdmin
                if (action.payload.payload.isAdmin) {
                    state.isAdmin = true;
                }
                state.csutomerShortData = action.payload.payload;
                state.loading = false;
                state.error = false;
                state.success = true;
                state.isLoggedIn = true;
                state.message = action.payload.message;
                toast.success(action.payload.message);
            })
            .addCase(loginCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                state.isLoggedIn = false;
                state.message =
                    action.error.message ||
                    "Unable to login. Please try again.";
                toast.error(action.error.message);
                console.log(state.message);
            });

        // 5. Reset ppassword request
        builder
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.success = true;
                toast.success(action.payload.message);
                state.message = action.payload.message;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                state.message =
                    action.error.message ||
                    "Unable to login. Please try again.";
                toast.error(action.error.message);
            });

        // 6. Reset passowrd varification
        builder
            .addCase(resetPasswordVarification.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(resetPasswordVarification.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.success = true;
                toast.success(action.payload.message);
                state.message = action.payload.message;
            })
            .addCase(resetPasswordVarification.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                state.message =
                    action.error.message ||
                    "Unable to reset password. Please try again.";
                toast.error(action.error.message);
            });
        // 7. Set new password
        builder
            .addCase(setNewPassword.pending, (state) => {
                state.success = false;
                state.loading = true;
            })
            .addCase(setNewPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.message = action.payload.message;
            })
            .addCase(setNewPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message =
                    action.error.message ||
                    "Unable to reset password. Please try again.";
                toast.error(action.error.message);
            });

        // 8. Update customer profile
        builder
            .addCase(updateCustomerProfile.pending, (state) => {
                state.success = false;
                state.loading = true;
            })
            .addCase(updateCustomerProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.success = true;
                console.log(action.payload);
                toast.success(action.payload.message);
                state.message = action.payload.message;
            })
            .addCase(updateCustomerProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message =
                    action.error.message ||
                    "Unable to reset password. Please try again.";
                toast.error(action.error.message);
            });

        // 9. Log Out customer
        builder
            .addCase(logOutCustomer.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.isLoggedIn = true;
            })
            .addCase(logOutCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.success = true;
                state.isLoggedIn = false;
                state.message = action.payload.message;
                toast.success(action.payload.message);
            })
            .addCase(logOutCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                state.isLoggedIn = false;
                state.message = action.error.message || "Unable to log out.";
                toast.error(action.error.message);
                console.log(state.message);
            });
    },
});

export default customerSlice.reducer;
