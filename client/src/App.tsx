import Index from "routers";

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
            </div>
        </ThemeProvider>
    );
};
export default App;
