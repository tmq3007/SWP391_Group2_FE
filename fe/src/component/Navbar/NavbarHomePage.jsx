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

export const NavbarHomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const token = localStorage.getItem('jwt');
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const role = localStorage.getItem('role');


    useEffect(() => {
        if (token && role) {
            setIsLoggedIn(true);
            setUserRole(role);
            console.log("Role from localStorage:", role);
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
        console.log('isLoggedIn:', false);
    };

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
                    <li onClick={handleClick} className="logo font-semibold text-2xl" style={{ color: '#019376' }}>
                        Shopii
                    </li>
                </div>

                <ShopMenu className="shop-menu" />

            </div>

            {/* Search Bar */}
            <div className="relative hidden w-full max-w-[710px] lg:flex items-center">
                <SearchIcon className="absolute left-4 text-gray-400" />
                <input
                    type="text"
                    className="block w-full pl-12 pr-4 py-2 rounded-full border border-gray-300 bg-gray-50 text-sm focus:border-green-500 focus:bg-white focus:outline-none"
                    placeholder="Search your route..."
                />
            </div>

            {/* User Info and Actions */}
            <div className="flex items-center space-x-3">
                <IconButton>
                    <Badge badgeContent={4} color="success">
                        <FavoriteIcon sx={{ fontSize: '1.5rem' }} />
                    </Badge>
                </IconButton>
                <IconButton>
                    <Badge badgeContent={4} color="success">
                        <ShoppingCartIcon sx={{ fontSize: '1.5rem' }} />
                    </Badge>
                </IconButton>

                {isLoggedIn ? (
                    <>
                        <ProfileList handleLogout={handleLogout} />
                        {userRole === "ROLE_VENDOR" && (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ backgroundColor: '#019376' }}
                                onClick={() => navigate("/shop-dashboard")}
                            >
                                <span style={{ color: "#FFFFFF" }}>Dash Board</span>
                            </Button>
                        )}
                    </>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleJoin}
                        sx={{ backgroundColor: '#019376' }}
                    >
                        <span style={{ color: "#FFFFFF" }}>Join</span>
                    </Button>
                )}
            </div>
        </div>
    );
};
