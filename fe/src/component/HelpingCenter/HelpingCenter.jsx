import React, { useState } from "react";
import { NavbarHelp } from "../Navbar/NavbarHelp";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Homepage } from "./HelpingCenterPage/Homepage";
import { SearchBar } from "./SearchBar";
import Sidebar from "./Sidebar";
import { NewUserPage } from "./HelpingCenterPage/NewUserPage";
import { ExplorePage } from "./HelpingCenterPage/ExplorePage";
import { OrderPaymentPage } from "./HelpingCenterPage/OrderPaymentPage";
import PromotionsPage from "./HelpingCenterPage/PromotionsPage";
import PolicyPage from "./HelpingCenterPage/PolicyPage";
import AccountPage from "./HelpingCenterPage/AccountPage";

export const HelpingCenter = () => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (term) => {
        const keywordMap = {
            "new user": "/new-user",
            "all":"/",
            "user":"/new-user",
            "payment": "/explore",
            "order": "/order-payment",
            "cart": "/order-payment",
            "sale": "/promotions",
            "policies":"/shopii-policies",
            "policy": "/shopii-policies",
            "account": "/shopii-account",
            "accounts":"/shopii-account"
        };

        const lowerTerm = term.toLowerCase();
        const route = Object.keys(keywordMap).find(keyword => lowerTerm.includes(keyword));

        if (route) {
            navigate(`/help-center${keywordMap[route]}`);
        } else {
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 1000); // Đóng modal sau 2 giây
        }
    };

    return (
        <section className="main flex flex-col h-screen">
            <NavbarHelp />

            <div className="w-full">
                <SearchBar handleSearch={handleSearch} />
            </div>

            <div className="mt-10 ml-[400px] w-[1000px] h-[600px] flex top-20 align-middle justify-center overflow-y-auto">
                <Sidebar />

                <div className="content-container w-full h-full ">
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/new-user" element={<NewUserPage />} />
                        <Route path="/explore" element={<ExplorePage />} />
                        <Route path="/order-payment" element={<OrderPaymentPage />} />
                        <Route path="/promotions" element={<PromotionsPage />} />
                        <Route path="/shopii-policies" element={<PolicyPage/>}/>
                        <Route path="/shopii-account" element={<AccountPage />}/>
                    </Routes>
                </div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-80">
                        <h2 className="text-lg font-bold mb-4">Notice</h2>
                        <p>No matching content found!</p>
                    </div>
                </div>
            )}
        </section>
    );
};
