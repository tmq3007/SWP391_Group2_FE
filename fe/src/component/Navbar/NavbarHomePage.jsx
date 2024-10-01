import React, { useState } from 'react';
import { IconButton, Button, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShopMenu from '../Shop/ShopMenu';
import ProfileList from '../User/ProfileList';
import '../../style/NavbarHomePage.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const NavbarHomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Đặt là true khi đang đăng nhập
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

    const handleLogout = () => {
        console.log('Logout clicked. Logging out...');
        setIsLoggedIn(false);
        console.log('isLoggedIn:', isLoggedIn);
        navigate('/'); // Điều hướng về trang Home sau khi logout
    };

    const handleJoin = () => {
        console.log('Redirecting to login page');
        navigate('/login'); // Điều hướng đến trang login nếu người dùng bấm Join
    };

    const handleLogoClick = () => {
        navigate('/'); // Điều hướng về trang Home khi nhấp vào logo
    };

    return (
        <div className="navbar navbar-padding flex justify-between">
            <div className="flex items-center space-x-4">
                <div className="lg:mr-10 cursor-pointer flex items-center space-x-4" onClick={handleLogoClick}>
                    <li className="logo font-semibold text-2xl" style={{ color: '#019376' }}>
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
                    <ProfileList handleLogout={handleLogout} /> // Pass logout handler to ProfileList
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
