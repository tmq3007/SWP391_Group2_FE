import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@mui/material';

const ShopMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                aria-controls={open ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ color: '#019376' }}
            >
                <p>Category</p>
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} >Category 1</MenuItem>
                <MenuItem onClick={handleClose}  >Category 2</MenuItem>
                <MenuItem onClick={handleClose}  >Category 3</MenuItem>
            </Menu>
        </div>
    );
};

export default ShopMenu;
