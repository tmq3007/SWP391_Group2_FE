import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

const VendorProfile = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        console.log('Profile Clicked');
        handleClose();
    };

    const handleLogout = () => {
        console.log('Logout Clicked');
        handleClose();
    };

    return (
        <div className="flex justify-center items-center w-[13%] h-[100%]">
            <div className="relative">
                <Button
                    onClick={handleClick}
                    className="w-auto h-[4rem] ml-1 flex justify-center items-center"
                >
                    <div className='flex justify- items-center'>
                    <img
                        src=""
                        alt="demo"
                        className="w-[3rem] h-[3rem] rounded-full border-gray-200 shadow-lg border mr-2 "
                    />
                    <div>
                        <span className="block font-semibold text-[10px]">Name</span>
                        <span className="block text-gray-400 text-[5px]">Store owner</span>
                    </div></div>
                </Button>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            bgcolor: 'background.paper',
                        },
                    }}
                >
                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </div>
        </div>
    );
};

export default VendorProfile;
