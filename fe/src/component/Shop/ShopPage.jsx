import React, {useEffect, useState} from 'react';

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import EditIcon from '@mui/icons-material/Edit';
import PhoneIcon from '@mui/icons-material/Phone';
import { ShopDashboardSidebar } from './ShopDashboardSidebar';


import {
    List,
    ListSubheader,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    ListItemButton,
    Collapse
} from '@mui/material';
import "../../style/ShopDashboard.css";
import {ExpandLess, ExpandMore, LocationOn, StarBorder} from "@mui/icons-material";
import {NavbarShop} from "../Navbar/NavbarShop";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const ShopPage = () => {
    const [shopId, setShopId] = useState("");
    const [shopData, setShopData] = useState(null);
    const token = localStorage.getItem('jwt');
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();
    const handleClick = () => {
        setOpen(!open);
    };

    //get shopId by userId
    useEffect(() => {
        const userId = localStorage.getItem("userId");

        let isMounted = true; // to prevent memory leaks
        axios.get(`http://localhost:8080/api/v1/shops/get-shopId/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (isMounted) setShopId(response.data.result);
            })
            .catch(error => {
                console.error("Error fetching shopId:", error);
            });

        return () => { isMounted = false; };
    }, [token]);

    // Fetch shop statistics by shopId
    useEffect(() => {
        if (shopId) {
            axios.get(`http://localhost:8080/api/v1/shops/get-statistic-shop/${shopId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => setShopData(response.data.result))
                .catch(error => console.error("Error fetching shop statistics:", error));
        }
    }, [shopId, token]);


    return (
        //Main content
        <div className="w-full bg-gray-50 min-h-screen overflow-y-auto">
            <div className="p-6">
                {/* Cover Image */}
                <div
                    className="w-full h-60 bg-cover bg-center relative"
                    style={{backgroundImage: `url(${shopData?.cover || 'default-cover-url'})`}}
                >
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                </div>

                {/* Profile Section */}
                <div className="relative z-10 px-6 -mt-20">
                    <div className="flex flex-wrap items-start gap-6">
                        {/* Logo */}
                        <img
                            src={shopData?.logo || 'default-logo-url'}
                            alt="Shop Logo"
                            className="rounded-full object-cover h-32 w-32 lg:h-40 lg:w-40 shadow-lg border-4 border-white"
                        />

                        {/* Shop Information */}
                        <div className="flex-1 mt-20">
                            <h1 className="text-3xl font-bold text-gray-800">{shopData?.shopName}</h1>
                            <div className="flex items-center text-gray-600 space-x-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <PhoneIcon className="text-gray-500" fontSize="small"/>
                                    <p>{shopData?.phone || 'N/A'}</p>
                                </div>
                                <span className="mx-2">|</span>
                                <div className="flex items-center space-x-2">
                                    <LocationOn className="text-gray-500" fontSize="small"/>
                                    <p>{shopData?.address || 'N/A'}, {shopData?.subdistrict || 'N/A'},
                                        {shopData?.district || 'N/A'}, {shopData?.subdistrict || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Edit Button */}
                        <button
                            className="inline-flex mt-24 items-center px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                            onClick={() => navigate(`/shop-dashboard/edit-shop/${shopId}`)}
                        >
                            <EditIcon className="mr-2" fontSize="small"/>
                            Edit Shop
                        </button>
                    </div>

                    {/* Additional Info Boxes */}
                    <div className="my-10 flex flex-wrap gap-6">
                        {/* Registered Since and Bio */}
                        <div className="w-full lg:w-1/3 p-6 bg-white rounded-lg shadow-md">
                            <div className="mt-6">
                                <h4 className="text-lg font-semibold text-gray-800">Bio</h4>
                                <p className="mt-2 text-gray-600">{shopData?.description || 'No bio available.'}</p>
                            </div>
                        </div>

                        {/* Total Products and Orders */}
                        <div
                            className="w-full lg:w-1/3 p-6 bg-white rounded-lg shadow-md flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{shopData?.totalProduct || 0}</h2>
                                <p className="text-gray-600">Total Product</p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{shopData?.totalOrders || 0}</h2>
                                <p className="text-gray-600">Total Order</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};