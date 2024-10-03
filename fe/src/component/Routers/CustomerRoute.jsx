import React from 'react';
import {NavbarHomePage} from "../Navbar/NavbarHomePage";
import {Route, Routes} from "react-router-dom";
import Home from "../Home/Home";
import Auth from "../Auth/Auth";
import ProductDetail from "../Product/ProductDetail";
import {ShopDashboard} from "../Shop/ShopDashboard";

const CustomerRoute = () => {
    return (
        <div>
            <NavbarHomePage/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/auth/:register' element={<Home/>}/>
                <Route path="/product-detail" element={<ProductDetail />} />
                <Route path="/shop-dashboard" element={<ShopDashboard/>}/>
            </Routes>
            <Auth/>

        </div>
    );
};

export default CustomerRoute;