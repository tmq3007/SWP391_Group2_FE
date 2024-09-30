import React, { useState, useEffect } from 'react';
import './App.css';
import { Navbar } from "./component/Navbar/Navbar";
import {CssBaseline, Divider, ThemeProvider} from "@mui/material";
import { darkTheme, lightTheme } from "./component/Theme/DarkTheme";
import Home from "./component/Home/Home";

function App() {
    // Initialize theme based on localStorage or default to dark theme
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        const savedTheme = localStorage.getItem("isDarkTheme");
        return savedTheme ? JSON.parse(savedTheme) : true;  // Default is dark theme
    });

    // Toggle theme and save preference to localStorage
    const toggleTheme = () => {
        setIsDarkTheme((prevTheme) => {
            const newTheme = !prevTheme;
            localStorage.setItem("isDarkTheme", JSON.stringify(newTheme)); // Save to localStorage
            return newTheme;
        });
    };

    return (
        <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
            <CssBaseline />
            {/* Pass the state and function to Navbar */}
            <Navbar isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
            <Divider/>
            <Home/>
        </ThemeProvider>
    );
}

export default App;
