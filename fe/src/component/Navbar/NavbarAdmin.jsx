import React, {useEffect, useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {Button, IconButton, Menu} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../../style/NavbarShop.css';
import Divider from '@mui/material/Divider';
import {useNavigate} from "react-router-dom";
import ProfileList from "../User/ProfileList";
import {useDispatch} from "react-redux";
import {logout} from "../State/Authentication/Action";
import MenuItem from "@mui/material/MenuItem";


export const NavbarAdmin = () => {
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
        navigate("/admin-dashboard");
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
                    <li className="text-gray-500 text-sm" style={{color: '#019376'}}>Admin Dashboard</li>
                </div>


            </div>



            {isLoggedIn ? (
                <>
                    <div className="flex items-center space-x-2">
                        <IconButton
                            edge="end"
                            aria-controls={isMenuOpen ? 'profile-menu' : undefined}
                            aria-haspopup="true"
                            onClick={handleMenuOpen}
                            color="inherit"
                        >
                            <img
                                src="https://pickbazar-react-admin-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F2449%2Fconversions%2Fman-thumbnail.jpg&w=1920&q=75"
                                alt="profile"
                                className="h-9 w-9 rounded-full"
                            />
                        </IconButton>

                        <div className="flex flex-col">
                            <span className="font-semibold text-sm text-black">Admin</span>
                            <span className="text-xs text-gray-400">Website Owner</span>
                        </div>
                    </div>

                    <Menu
                        id="profile-menu"
                        anchorEl={anchorEl}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                        MenuListProps={{
                            'aria-labelledby': 'profile-button',
                        }}
                    >
                        <MenuItem style={{ color: '#019376' }} onClick={handleLogout}>
                            Logout
                        </MenuItem>
                    </Menu>
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
    );
};
