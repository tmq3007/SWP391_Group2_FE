import React from 'react';
import "../../style/ShopDashboard.css";
import {AdminDashboardSidebar} from "./AdminDashboardSidebar";
    import {Navigate, Route, Routes} from "react-router-dom";
    import DashboardPage from "./AdminDashboardDetails/AdminPage/DashboardPage";
    import ShopsPage from "./AdminDashboardDetails/AdminPage/ShopPage";
    import {NavbarAdmin} from "../Navbar/NavbarAdmin";
import InactiveNewShopsPage from "./AdminDashboardDetails/AdminPage/InactiveNewShopsPage";
import UsersPage from "./AdminDashboardDetails/AdminPage/UsersPage";
import VendorsPage from "./AdminDashboardDetails/AdminPage/VendorsPage";
import CustomersPage from "./AdminDashboardDetails/AdminPage/CustomersPage";
import SettingPage from "./AdminDashboardDetails/AdminPage/SettingPage";
import CategoriesPage from "./AdminDashboardDetails/AdminPage/CategoriesPage";
import UpdateCategoryForm from "./Form/UpdateCategoryForm";
import {CreateCategoryForm} from "./Form/CreateCategoryForm";

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

                    <Route path="/inactive-new-shops" element={<InactiveNewShopsPage />} />

                    <Route path="/all-users" element={<UsersPage />} />

                    <Route path="/all-vendors" element={<VendorsPage />} />

                    <Route path="/all-customers" element={<CustomersPage />} />

                    <Route path="/settings" element={<SettingPage />} />

                    <Route path="/all-categories" element={<CategoriesPage />} />

                    <Route path="/create-category" element={<CreateCategoryForm />} />

                    <Route path="/edit-category/:categoryId" element={<UpdateCategoryForm />} />

                        {/* Add more routes here */}

                </Routes>
            </div>

        </section>
    );
};

