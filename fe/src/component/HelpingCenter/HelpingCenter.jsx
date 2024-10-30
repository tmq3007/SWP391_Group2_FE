import React from "react";
import { NavbarHelp } from "../Navbar/NavbarHelp";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Homepage } from "./HelpingCenterPage/Homepage";
import { SearchBar } from "./SearchBar";
import Sidebar from "./Sidebar";
import { NewUserPage } from "./HelpingCenterPage/NewUserPage";
import { ExplorePage } from "./HelpingCenterPage/ExplorePage";
import { OrderPaymentPage } from "./HelpingCenterPage/OrderPaymentPage";
import PromotionsPage from "./HelpingCenterPage/PromotionsPage";

export const HelpingCenter = () => {
    const navigate = useNavigate();

    const handleSearch = (term) => {
        const keywordMap = {
            "new user": "/new-user",
            "payment": "/explore",
            "order": "/order-payment",
            "cart": "/order-payment",
            "sale": "/promotions",
        };

        const lowerTerm = term.toLowerCase();
        const route = Object.keys(keywordMap).find(keyword => lowerTerm.includes(keyword));

        if (route) {
            navigate(`/help-center${keywordMap[route]}`);
        } else {
            alert("No matching content found!");
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
                    </Routes>
                </div>
            </div>
        </section>
    );
};
