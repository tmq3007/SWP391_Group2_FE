import React from 'react';
import './App.css';
import { NavbarHomePage } from "./component/Navbar/NavbarHomePage";
import { CssBaseline, Divider, ThemeProvider } from "@mui/material";
import { lightTheme } from "./component/Theme/DarkTheme";
import Home from "./component/Home/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from "./component/Product/ProductDetail"; // Import Router

function App() {
    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Router>
                <NavbarHomePage />
                <Divider />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product-detail" element={<ProductDetail />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
