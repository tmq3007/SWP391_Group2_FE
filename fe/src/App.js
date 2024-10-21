import React, {useEffect} from 'react';
import './App.css';
import { CssBaseline, Divider, ThemeProvider } from "@mui/material";
import { lightTheme } from "./component/Theme/DarkTheme"; // Adjust import to reflect lightTheme
import CustomRoute from "./component/Routers/CustomRoute";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "./component/State/Authentication/Action";
import VendorDashboard from "./component/Vendor/VendorDashboard";
import CustomerPayment from "./component/User/CustomerProfile/CustomerPayment";


function App() {


    return (
        <ThemeProvider theme={lightTheme}> {/* Directly use lightTheme */}
            <CssBaseline />
            {/*<NavbarHomePage />  No need to pass theme toggle props */}
            {/*<Divider />*/}
            {/*<Home />*/}
            {/*<VendorDashboard/>*/}
            <CustomRoute />

            {/*<CustomerPayment/>*/}
            {/*for testing*/}
            {/*<CustomerPayment/>*/}
            {/*<VendorDashboard/>*/}
        </ThemeProvider>
    );
}

export default App;