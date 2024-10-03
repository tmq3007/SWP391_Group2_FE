import React from 'react';
import {NavbarHomePage} from "../Navbar/NavbarHomePage";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../Home/Home";
import Auth from "../Auth/Auth";
import ProductDetail from "../Product/ProductDetail";
import {ShopDashboard} from "../Shop/ShopDashboard";


const ProtectedRoute = ({ role, children }) => {
    const userRole = localStorage.getItem('role');

    if (!userRole) {
        return <Navigate to="/auth/login" />;
    }

    return userRole === role ? children : <Navigate to="/auth/unauthorized" />;
};


const CustomRoute = () => {
    return (
        <div>

            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/auth/:register' element={<Home/>}/>
                <Route path="/product-detail" element={<ProductDetail />} />
                <Route path="/shop-dashboard"
                       element={
                           <ProtectedRoute role="ROLE_VENDOR">
                               <ShopDashboard/>
                           </ProtectedRoute>
                       }/>
                <Route path="/auth/unauthorized" element={<h1>Unauthorized Access</h1>} />
            </Routes>
            <Auth/>

        </div>
    );
};

export default CustomRoute;