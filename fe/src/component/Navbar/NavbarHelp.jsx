import React, {useEffect, useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {Button, IconButton, Menu} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../../style/NavbarShop.css';
import Divider from '@mui/material/Divider';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../State/Authentication/Action";
import MenuItem from "@mui/material/MenuItem";
import {HelpOutline, Home} from "@mui/icons-material";


export const NavbarHelp = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

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


    const handleJoin = () => {
        navigate("/auth/login");
        console.log('Redirecting to login page');
    };

    const handleClick = () => {
        navigate("/help-center");
        return null;
    }

    return (

        <div className="navbar navbar-padding flex items-center justify-between px-6 py-4 bg-white shadow-md">
            {/* Logo and Menu */}
            <div className="flex items-center space-x-10">
                <div className="flex items-center space-x-2 lg:mr-10 cursor-pointer">
                    <li onClick={handleClick} className="logo font-semibold text-2xl" style={{color: '#019376'}}>
                        Shopii
                    </li>
                    <div style={{
                        width: '1.5px',
                        height: '20px',
                        backgroundColor: '#019376',
                        margin: '0 10px'
                    }}></div>
                    <li className="text-gray-500 text-sm" style={{color: '#019376'}}>Help Center</li>
                </div>


            </div>

            <div className="flex items-center">
                <Button
                    sx={{color: '#039375'}}
                    size='small'
                    onClick={() => navigate("/")}
                >
                    <Home className="mr-2"/>
                    Home
                </Button>
            </div>


        </div>

    );
};
