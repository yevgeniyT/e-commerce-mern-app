import Index from "routers";

import { ToastContainer } from "react-toastify";
//MUI imports
import { ThemeProvider } from "@mui/material/styles";

import { PersistGate } from "redux-persist/integration/react";

//Other components
import theme from "styles/theme";
import { persistor } from "redux/store";
import { useEffect } from "react";
import { useAppDispatch } from "redux/hooks";
import { checkAuth } from "features/customers/customersThunk";

const App = () => {
    // Check if the user authorised alredy on first time we run app
    const dispatch = useAppDispatch();
    useEffect(() => {
        const authToken = localStorage.getItem("accessToken");
        if (authToken) {
            dispatch(checkAuth());
        }
    }, []);

    return (
        //Use custom theme
        <ThemeProvider theme={theme}>
            <PersistGate loading={null} persistor={persistor}>
                <div>
                    <Index />
                    <ToastContainer hideProgressBar autoClose={3000} />
                </div>
            </PersistGate>
        </ThemeProvider>
    );
};
export default App;
