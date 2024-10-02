import React from 'react';
import {NavbarHomePage} from "../Navbar/NavbarHomePage";
import {Route, Routes} from "react-router-dom";
import Home from "../Home/Home";
import Auth from "../Auth/Auth";
import ProductDetail from "../Product/ProductDetail";

const CustomerRoute = () => {
    return (
        <div>
            <NavbarHomePage/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/auth/:register' element={<Home/>}/>
                <Route path="/product-detail" element={<ProductDetail />} />
            </Routes>
            <Auth/>

        </div>
    );
};

export default CustomerRoute;