import React from 'react';
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from "@mui/material";
import "./NavbarHomePage.css";
import ShopMenu from "../Shop/ShopMenu";
import ProfileList from "../User/ProfileList";

export const NavbarHomePage = () => {
    return (
        <div className="px-5 z-50 py-[.8rem] lg:px-20 flex justify-between" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="flex items-center space-x-4">
                <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
                    <li className="logo font-semibold text-2xl" style={{ color: "#019376" }}>
                        Shopii
                    </li>
                </div>
                <ShopMenu />
            </div>
            <div className="flex items-center space-x-2 lg:space-x-10">
                <IconButton>
                    <SearchIcon sx={{ fontSize: "1.5rem" }} />
                </IconButton>
                <ProfileList />
                <IconButton>
                    <Badge badgeContent={4} color="success">
                        <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
                    </Badge>
                </IconButton>
            </div>
        </div>
    );
};
