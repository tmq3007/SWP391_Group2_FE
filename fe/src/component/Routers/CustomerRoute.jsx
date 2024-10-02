import React from 'react';
import {NavbarHomePage} from "../Navbar/NavbarHomePage";
import {Route, Routes} from "react-router-dom";
import Home from "../Home/Home";
import Auth from "../Auth/Auth";

const CustomerRoute = () => {
    return (
        <div>
            <NavbarHomePage/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/auth/:register' element={<Home/>}/>
            </Routes>
            <Auth/>

        </div>
    );
};

export default CustomerRoute;