import Index from "routers";

import { ToastContainer } from "react-toastify";
//MUI imports
import { ThemeProvider } from "@mui/material/styles";

//Other components
import theme from "styles/theme";

const App = () => {
    return (
        //Use custom theme
        <ThemeProvider theme={theme}>
            <div>
                <Index />
                <ToastContainer hideProgressBar autoClose={3000} />
            </div>
        </ThemeProvider>
    );
};
export default App;
