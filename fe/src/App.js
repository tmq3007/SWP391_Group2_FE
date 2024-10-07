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
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
    const {auth} = useSelector((store)=>store);

    useEffect(() => {
        const isFirstRun = localStorage.getItem('firstRun');

        if (!isFirstRun) {
            // Clear all local storage data
            localStorage.clear();

            // Set the firstRun flag to true
            localStorage.setItem('firstRun', 'true');
        }
    }, []);

    useEffect(() => {
        if(jwt) {
            dispatch(getUser(auth.token || jwt))
        }
    }, [auth.token]);

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