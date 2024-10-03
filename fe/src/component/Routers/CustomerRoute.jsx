import React, { useState, useEffect } from 'react';
import { NavbarHomePage } from "../Navbar/NavbarHomePage";
import { NavbarShop } from "../Navbar/NavbarShop";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "../Home/Home";
import Auth from "../Auth/Auth";
import ProductDetail from "../Product/ProductDetail";
import { ShopDashboard } from "../Shop/ShopDashboard";

const CustomerRoute = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const token = localStorage.getItem('jwt');
    const navigate = useNavigate();
    const location = useLocation(); // Dùng để lấy URL hiện tại

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (token && role) {
            setIsLoggedIn(true);
            setUserRole(role);
            console.log("Role from localStorage:", role);
        }
    }, [token]);

    return (
        <div>
            {/* Hiển thị Navbar dựa trên trang hiện tại */}
            {location.pathname === '/shop-dashboard' ? <NavbarShop /> : <NavbarHomePage />}

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/auth/:register' element={<Home />} />
                <Route path="/product-detail" element={<ProductDetail />} />
                <Route path="/shop-dashboard" element={<ShopDashboard />} />
            </Routes>

            <Auth />
        </div>
    );
};

export default CustomerRoute;
