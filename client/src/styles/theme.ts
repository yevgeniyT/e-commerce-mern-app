// Create global colorse to be used in MUI app

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#8d7db9", // Customize the primary color
        },
        secondary: {
            main: "#74c6c7", // Customize the secondary color
        },
        error: {
            main: "#ef7d9a",
        },
        info: {
            main: "#bacf39",
        },
        success: {
            main: "#413d58",
        },

        // You can also set other colors like `error`, `warning`, `info`, and `success`
    },
});

export default theme;
