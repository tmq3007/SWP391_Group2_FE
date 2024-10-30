import React, { useEffect, useState } from 'react';
import { IconButton, Button, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShopMenu from '../Shop/ShopMenu';
import ProfileList from '../User/ProfileList';
import '../../style/NavbarHomePage.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";
import {logout} from "../State/Authentication/Action";
import {useDispatch} from "react-redux";
import axios from "axios";
import config from "tailwindcss/defaultConfig";
import {HelpOutline} from "@mui/icons-material";

export const NavbarHomePage = ({ setSearchQuery }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const token = localStorage.getItem('jwt');
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const [shopId, setShopId] = useState(null);
    const [unverifiedShopId, setUnverifiedShopId] = useState(null);
    const [shopError, setShopError] = useState(false);
    const [unverifiedShopError, setUnverifiedShopError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const role = localStorage.getItem('role');
    const id = localStorage.getItem('userId');
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);  // Cập nhật giá trị tìm kiếm
    };

    useEffect(() => {
        if (token !== null && role) {
            setIsLoggedIn(true);
            setUserRole(role);
            console.log("Role from localStorage:", role);
        }
    }, [token]);

    useEffect(() => {
        if (token !== null && id) {
            setIsLoggedIn(true);
            setUserId(id);
            console.log("ID from localStorage:", id);
        }
    }, [token]);

    const handleLogout = () => {
        console.log('Logout clicked. Logging out...');

        dispatch(logout({token: token}));

        localStorage.removeItem('jwt');
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        setUserRole(null);
        navigate("/auth/login");
    };

    const handleVendorRegister = () => {
        dispatch(logout({token: token}));

        localStorage.removeItem('jwt');
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        navigate("/auth/vendor-register");
    };

    const handleVendorDashboard = () => {
        if (userId) {
            axios.get(`http://localhost:8080/api/v1/shops/get-shopId/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setShopId(response.data.result);
                    setShopError(false);
                })
                .catch(error => {
                    console.error("Error fetching shopId:", error);
                    setShopError(true);
                });

            axios.get(`http://localhost:8080/api/v1/get-unverifed-shopid/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setUnverifiedShopId(response.data);
                    setUnverifiedShopError(false);
                })
                .catch(error => {
                    console.error("Error fetching UnshopId:", error);
                    setUnverifiedShopError(true);
                });
        }
    }

    useEffect(() => {
        if (shopError && unverifiedShopError) {
            console.log('Both ShopID and UnverifiedShopID are null or have errors');
            navigate("/create-shop");
        }
        else if (shopError && unverifiedShopId) {
            console.log("ShopID Error but Unverified ShopID is valid");
            navigate("/processing");
        }
        else if (shopId && unverifiedShopError) {
            console.log("Unverified ShopID Error but ShopID is valid");
            navigate("/vendor-dashboard");
        }
    }, [shopError, unverifiedShopError, shopId, unverifiedShopId, navigate]);


    const handleJoin = () => {
        navigate("/auth/login");
        console.log('Redirecting to login page');
    };
    const handleClick = () => {
        if (userRole !== "ROLE_ADMIN") {
            navigate("/"); // Chuyển hướng về trang home page
        }
    };

    return (
        <div className="navbar navbar-padding flex items-center justify-between px-6 py-4 bg-white shadow-md">
            {/* Logo and ShopMenu */}
            <div className="flex items-center space-x-10">
                <div className="flex items-center space-x-2 lg:mr-10 cursor-pointer">
                    <li onClick={handleClick} className="logo font-semibold text-2xl" style={{color: '#019376'}}>
                        Shopii
                    </li>
                </div>

                {/*<ShopMenu className="shop-menu" />*/}

            </div>

            {/* Search Bar */}
            <div className="relative top-2 hidden w-full max-w-[710px] lg:flex items-center top-3">
                <SearchIcon className="absolute left-4 text-gray-400 top-2"/>
                <input
                    type="text"
                    className="block w-full pl-12 pr-4 py-2 rounded-full border border-gray-300 bg-gray-50 text-sm focus:border-green-500
                    focus:bg-white focus:outline-none "
                    placeholder="Search products..."
                    onChange={handleSearchChange}  // Xử lý thay đổi giá trị tìm kiếm
                />
            </div>

            <div className="flex items-center">
                <Button
                    sx={{color: '#039375'}}
                    size='small'
                    onClick={() => navigate("/help-center")}
                >
                    <HelpOutline className="mr-2" />
                    Help Center
                </Button>
            </div>

            {/* User Info and Actions */}
            <div className="flex items-center space-x-3">
                {/*<IconButton>*/}
                {/*    <Badge badgeContent={4} color="success">*/}
                {/*        <FavoriteIcon sx={{ fontSize: '1.5rem' }} />*/}
                {/*    </Badge>*/}
                {/*</IconButton>*/}
                {isLoggedIn ? (
                    <>
                        <ProfileList handleLogout={handleLogout}/>
                        {userRole === "ROLE_VENDOR" && (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{backgroundColor: '#019376'}}
                                onClick={() => handleVendorDashboard()}
                            >
                                <span style={{color: "#FFFFFF"}}>Dash Board</span>
                            </Button>
                        ) || userRole === "ROLE_ADMIN" && (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{backgroundColor: '#019376'}}
                                onClick={() => navigate("/admin-dashboard")}
                            >
                                <span style={{color: "#FFFFFF"}}>Dash Board</span>
                            </Button>
                        ) || userRole === "ROLE_CUSTOMER" && (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{backgroundColor: '#019376'}}
                                onClick={() => handleVendorRegister()}
                            >
                                <span style={{color: "#FFFFFF"}}>Become a seller</span>
                            </Button>
                        )}
                    </>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleJoin}
                        sx={{backgroundColor: '#019376'}}
                    >
                        <span style={{color: "#FFFFFF"}}>Join</span>
                    </Button>
                )}
            </div>

        </div>
    );
};
