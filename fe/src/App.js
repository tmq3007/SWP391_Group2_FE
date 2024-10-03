import React, {useEffect} from 'react';
import './App.css';
import { CssBaseline, Divider, ThemeProvider } from "@mui/material";
import { lightTheme } from "./component/Theme/DarkTheme"; // Adjust import to reflect lightTheme
import CustomerRoute from "./component/Routers/CustomerRoute";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "./component/State/Authentication/Action";

function App() {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
    const {auth} = useSelector((store)=>store);
    useEffect(() => {
        if(jwt) {
            dispatch(getUser(auth.token || jwt))
        }
    }, [auth.token]);
    return (
        <ThemeProvider theme={lightTheme}> {/* Directly use lightTheme */}
            <CssBaseline />
            {/*<NavbarHomePage /> /!* No need to pass theme toggle props *!/*/}
            {/*<Divider />*/}
            {/*<Home />*/}
            <CustomerRoute/>
        </ThemeProvider>
    );
}

export default App;