import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../../style/NavbarShop.css';
import Divider from '@mui/material/Divider';
import {useNavigate} from "react-router-dom";


export const NavbarAdmin = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
        return null;
    }

    return (
        <div className="navbar navbar-padding flex items-center justify-between px-6 py-4 bg-white shadow-md">
            {/* Logo and Menu */}
            <div className="flex items-center space-x-10">
                <div className="flex items-center space-x-2 lg:mr-10 cursor-pointer">
                    <li onClick={handleClick} className="logo font-semibold text-2xl" style={{ color: '#019376' }}>
                        Shopii
                    </li>
                </div>
                <IconButton className="block lg:hidden">
                    <MenuIcon sx={{ fontSize: '1.5rem' }} />
                </IconButton>
                <Divider orientation="vertical" variant="middle" flexItem />
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
            <Divider orientation="vertical" variant="middle" flexItem />

            {/* User Info */}
            <div className="flex items-center space-x-3">
                <img
                    src="https://pickbazar-react-admin-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F2449%2Fconversions%2Fman-thumbnail.jpg&w=1920&q=75"
                    alt=""
                    className="h-9 w-9 rounded-full"
                />
                <div className="flex flex-col">
                    <span className="font-semibold text-black">Siu</span>
                    <span className="text-xs text-gray-400">Store Owner</span>
                </div>
            </div>
        </div>
    );
};
