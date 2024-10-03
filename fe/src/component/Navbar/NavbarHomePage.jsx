import React, { useEffect, useState } from 'react';
import { IconButton, Button, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShopMenu from '../Shop/ShopMenu';
import ProfileList from '../User/ProfileList';
import '../../style/NavbarHomePage.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";

export const NavbarHomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const token = localStorage.getItem('jwt');
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (token && role) {
            setIsLoggedIn(true);
            setUserRole(role);
            console.log("Role from localStorage:", role);
        }
    }, [token]);

    const handleLogout = () => {
        console.log('Logout clicked. Logging out...');
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
        <div className="navbar navbar-padding flex justify-between">
            <div className="flex items-center space-x-4">
                <div  className="lg:mr-10 cursor-pointer flex items-center space-x-4">
                    <li onClick={handleClick} className="logo font-semibold text-2xl" style={{ color: '#019376' }}>
                        Shopii
                    </li>
                </div>
                <ShopMenu />
            </div>
            <div className="flex items-center space-x-2 lg:space-x-10">
                <IconButton>
                    <SearchIcon sx={{ fontSize: '1.5rem' }} />
                </IconButton>
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
                        {(userRole === "ROLE_VENDOR") && (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ backgroundColor: '#019376' }}
                                onClick={() => {
                                    if (userRole === "ROLE_VENDOR") {
                                        navigate("/vendor-dashboard");
                                    }
                                }}
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
