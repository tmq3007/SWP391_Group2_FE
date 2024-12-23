import React from 'react';
import {Route, Routes} from "react-router-dom";
import {NavbarShop} from "../Navbar/NavbarShop";
import {ShopDashboardSidebar} from "./ShopDashboardSidebar";
import {ShopPage} from "./ShopPage";
import {ShopProduct} from "./ShopProduct";
import {ShopAddProduct} from "./ShopAddProduct";
import {ShopEditProduct} from "./ShopEditProduct";
import {ShopTransaction} from "./ShopTransaction";
import Processing from "./Processing";
import RejectedShopCreation from "./RejectedShopCreation";
import {EditShop} from "./EditShop";
import {ShopInventory} from "./ShopInventory";
import {ShopOrders} from "./ShopOrders";
import {ShopReview} from "./ShopReview";

export const ShopDashboard = () => {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <section className="main flex h-screen">

            <NavbarShop/>

            <ShopDashboardSidebar/>

            <div className='lg: w-[80%]'>
                <Routes>
                    {/* Main layout route with sidebar and navbar */}

                    <Route path="/" element={<ShopPage/>}/>

                    <Route path="/shop-dashboard" element={<ShopPage/>}/>

                    <Route path="/shop-transaction" element={<ShopTransaction/>}/>

                    <Route path="/shop-product" element={<ShopProduct/>}/>

                    <Route path="/shop-add-product" element={<ShopAddProduct/>}/>

                    <Route path="/shop-edit-product/:productId" element={<ShopEditProduct/>}/>

                    <Route path={"/edit-shop/:shopId"} element={<EditShop/>}/>

                    <Route path="/shop-inventory" element={<ShopInventory/>}/>

                    <Route path="/shop-orders" element={<ShopOrders/>}/>

                    <Route path="/shop-review" element={<ShopReview/>}/>
                    {/* Add more routes here */}

                </Routes>
            </div>

        </section>
    )
}
