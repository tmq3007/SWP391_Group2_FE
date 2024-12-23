import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {AccountBox, Logout, RecentActors} from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
const ProfileList = ({ handleLogout }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuLogout = () => {
        console.log('Logout from ProfileList'); // Check if this gets logged
        handleLogout(); // Trigger the logout function from the parent
        handleMenuClose(); // Close the menu after logout
    };

    const handleProfileClick = () => {
        navigate('/my-profile'); // Navigate to /my-profile when Profile is clicked
        handleMenuClose(); // Close the menu after navigation
    };

    return (
        <div>
            {/* Wrap the AccountCircleIcon with IconButton for click functionality */}
            <IconButton
                edge="end"
                aria-controls={isMenuOpen ? 'profile-menu' : undefined}
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
            >
                <img
                    src="https://pickbazar-react-admin-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F2449%2Fconversions%2Fman-thumbnail.jpg&w=1920&q=75"
                    alt=""
                    className="h-10 w-10 rounded-full"
                />
                {/* <AccountCircleIcon sx={{ fontSize: '1.8rem' }} /> */}
            </IconButton>

            {/* Menu for profile options */}
            <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'profile-button',
                }}
            >
                <MenuItem style={{ color: '#019376' }} onClick={handleProfileClick}>
                   <AccountBox sx={{ marginRight:"10px" }} /> Profile
                </MenuItem>

                <MenuItem style={{ color: '#019376' }} onClick={handleMenuLogout}>
                   <Logout sx={{ marginRight:"10px" }}/> Logout
                </MenuItem>
            </Menu>
        </div>
    );
};

export default ProfileList;
