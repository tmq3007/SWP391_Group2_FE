import React from 'react';
import './App.css';
import { NavbarHomePage } from "./component/Navbar/NavbarHomePage";
import { CssBaseline, Divider, ThemeProvider } from "@mui/material";
import { lightTheme } from "./component/Theme/DarkTheme"; // Adjust import to reflect lightTheme
import Home from "./component/Home/Home";

function App() {
    return (
        <ThemeProvider theme={lightTheme}> {/* Directly use lightTheme */}
            <CssBaseline />
            <NavbarHomePage /> {/* No need to pass theme toggle props */}
            <Divider />
            <Home />
        </ThemeProvider>
    );
}

export default App;
