import Index from "routers";

import { ToastContainer } from "react-toastify";
//MUI imports
import { ThemeProvider } from "@mui/material/styles";

import { PersistGate } from "redux-persist/integration/react";

//Other components
import theme from "styles/theme";
import { persistor } from "redux/store";

const App = () => {
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
