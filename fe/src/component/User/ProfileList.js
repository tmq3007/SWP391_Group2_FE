import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ProfileList = ({ handleLogout }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

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
                        className="h-8 w-8 rounded-full"
                    />
                {/*<AccountCircleIcon sx={{fontSize: '1.8rem'}}/>*/}
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
                <MenuItem style={{color: '#019376'}} onClick={handleMenuClose}>
                    Profile
                </MenuItem>
                <MenuItem style={{color: '#019376' }} onClick={handleMenuClose}>
                    My account
                </MenuItem>
                <MenuItem style={{ color: '#019376' }} onClick={handleMenuLogout}>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
};

export default ProfileList;
