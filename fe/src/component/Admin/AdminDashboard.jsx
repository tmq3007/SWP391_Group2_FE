import React from 'react';
import "../../style/ShopDashboard.css";
import {AdminDashboardSidebar} from "./AdminDashboardSidebar";
    import {Navigate, Route, Routes} from "react-router-dom";
    import DashboardPage from "./AdminDashboardDetails/AdminPage/DashboardPage";
    import ShopsPage from "./AdminDashboardDetails/AdminPage/ShopPage";
    import {NavbarAdmin} from "../Navbar/NavbarAdmin";

export const AdminDashboard = () => {
    const [open, setOpen] = React.useState(true);



    const handleClick = () => {
        setOpen(!open);
    };
    return (


        <section className="main flex h-screen">

            <NavbarAdmin/>

            <AdminDashboardSidebar/>

            <div className='lg: w-[80%]'>
                <Routes>
                    {/* Main layout route with sidebar and navbar */}

                        <Route path="/" element={<DashboardPage />} />

                        <Route path="/dashboard-page" element={<DashboardPage />} />

                        <Route path="/all-shops" element={<ShopsPage />} />
                        {/* Add more routes here */}

                </Routes>
            </div>

        </section>
    );
};

