import React from 'react';
import {NavbarHomePage} from "../Navbar/NavbarHomePage";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../Home/Home";
import Auth from "../Auth/Auth";
import ProductDetail from "../Product/ProductDetail";
import {ShopPage} from "../Shop/ShopPage";
import {AdminDashboard} from "../Admin/AdminDashboard";
import {ShopProduct} from "../Shop/ShopProduct";
import VendorDashboard from "../Vendor/VendorDashboard";
import {ShopEditProduct} from "../Shop/ShopEditProduct";
import {ShopAddProduct} from "../Shop/ShopAddProduct";
import {CustomerProfile} from "../User/CustomerProfile/CustomerProfile";
import {ShopDashboard} from "../Shop/ShopDashboard";
import {CreateShop} from "../Shop/CreateShop";
import Processing from "../Shop/Processing";
import Cart from "../Cart/Cart";


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
                <Route path="/product-detail" element={<ProductDetail/>}/>
                <Route path="/my-profile/*" element={<CustomerProfile/>}/>
                <Route path="/shop-dashboard/*"
                       element={
                           <ProtectedRoute role="ROLE_VENDOR">
                               <ShopDashboard/>
                           </ProtectedRoute>
                       }/>

                <Route path="/vendor-dashboard/*"
                       element={
                           <ProtectedRoute role="ROLE_VENDOR">
                               <VendorDashboard/>
                           </ProtectedRoute>
                       }/>

                <Route path="/cart"
                    element={
                    <ProtectedRoute role="ROLE_CUSTOMER">
                        <Cart></Cart>
                    </ProtectedRoute>
                    }
                />

                <Route path={"/create-shop"}
                       element={
                        <ProtectedRoute role={"ROLE_VENDOR"}>
                            <CreateShop/>
                        </ProtectedRoute>
                }/>

                <Route path="/processing" element={
                    <ProtectedRoute role={"ROLE_VENDOR"}>
                        <Processing/>
                    </ProtectedRoute>
                }/>

                <Route path="/auth/unauthorized" element={<h1>Unauthorized Access</h1>} />
                <Route path="/admin-dashboard/*"
                       element={
                           <ProtectedRoute role="ROLE_ADMIN">
                               <AdminDashboard/>
                           </ProtectedRoute>
                       }/>

            </Routes>
            <Auth/>
        </div>
    );
};

export default CustomRoute;