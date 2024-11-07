import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "../Home/Home";
import Auth from "../Auth/Auth";
import ProductDetail from "../Product/ProductDetail";
import { AdminDashboard } from "../Admin/AdminDashboard";
import VendorDashboard from "../Vendor/VendorDashboard";
import { CustomerProfile } from "../User/CustomerProfile/CustomerProfile";
import { ShopDashboard } from "../Shop/ShopDashboard";
import { CreateShop } from "../Shop/CreateShop";
import Processing from "../Shop/Processing";
import Cart from "../Cart/Cart";
import CustomerPayment from "../User/CustomerProfile/CustomerPayment";
import SuccessOrderShow from "../User/CustomerProfile/SuccessOrderShow";
import { HelpingCenter } from "../HelpingCenter/HelpingCenter";
import PaymentTimeOut from "../Payment/PaymentTimeOut";
import Payment from "../Payment/Payment";
import UnAuthorizedPage from "../Auth/UnAuthorizedPage";
import RejectedShopCreation from "../Shop/RejectedShopCreation";
import { EditShop } from "../Shop/EditShop";
import Review from "../User/CustomerProfile/Orders/ReviewProduct";
import axios from "axios";

const PaymentRoute = ({ children }) => {
    const orderPlaced = localStorage.getItem('orderPlaced');
    return orderPlaced ? children : <Navigate to="/cart" />;
};

const ProtectedRoute = ({ role, children }) => {
    const userRole = localStorage.getItem('role');
    return userRole === role ? children : <Navigate to="/auth/unauthorized" />;
};

const ProtectedVendorRoute = ({ role, children }) => {
    const token = localStorage.getItem('jwt');
    const userRole = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');
    const [hasShop, setHasShop] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchShopStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/shops/get-shopId/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setHasShop(!!response.data.result);
            } catch (error) {
                console.error("Error fetching shop status:", error);
            }
        };

        if (userId && userRole === role) {
            fetchShopStatus();
        }
    }, [token, userId, userRole, role]);

    if (!userRole) return <Navigate to="/auth/login" />;
    if (userRole === role && !hasShop) return <Navigate to="/create-shop" />;

    return children;
};

const CustomRoute = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/auth/:register' element={<Home />} />
                <Route path="/product-detail" element={<ProductDetail />} />
                <Route path="/help-center/*" element={<HelpingCenter />} />
                <Route path="/my-profile/*" element={<CustomerProfile />} />
                <Route path="/payment-time-out" element={<PaymentTimeOut />} />

                <Route path="/payment" element={<PaymentRoute><Payment /></PaymentRoute>} />
                <Route path="/my-payment" element={<PaymentRoute><CustomerPayment /></PaymentRoute>} />
                <Route path="/success-place-order" element={<PaymentRoute><SuccessOrderShow /></PaymentRoute>} />

                <Route path="/shop-dashboard/*" element={
                    <ProtectedVendorRoute role="ROLE_VENDOR">
                        <ShopDashboard />
                    </ProtectedVendorRoute>
                } />

                <Route path="/vendor-dashboard/*" element={
                    <ProtectedVendorRoute role="ROLE_VENDOR">
                        <VendorDashboard />
                    </ProtectedVendorRoute>
                } />

                <Route path="/cart" element={
                    <ProtectedRoute role="ROLE_CUSTOMER">
                        <Cart />
                    </ProtectedRoute>
                } />

                <Route path="/create-shop" element={
                    <ProtectedRoute role="ROLE_VENDOR">
                        <CreateShop />
                    </ProtectedRoute>
                } />

                <Route path="/processing" element={
                    <ProtectedRoute role="ROLE_VENDOR">
                        <Processing />
                    </ProtectedRoute>
                } />

                <Route path="/rejected-shop-creation/:unverifiedShopId" element={
                    <ProtectedRoute role="ROLE_VENDOR">
                        <RejectedShopCreation />
                    </ProtectedRoute>
                } />

                <Route path="/auth/unauthorized" element={<UnAuthorizedPage />} />
                <Route path="/admin-dashboard/*" element={
                    <ProtectedRoute role="ROLE_ADMIN">
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
            </Routes>
            <Auth />
        </div>
    );
};

export default CustomRoute;
