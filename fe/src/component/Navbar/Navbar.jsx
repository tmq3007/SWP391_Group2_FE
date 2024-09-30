import React from 'react';
import { Avatar, FormControlLabel, IconButton, Switch } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { pink } from "@mui/material/colors";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from "@mui/material";
import "./Navbar.css";
import ShopMenu from "../Shop/ShopMenu";
import ProfileList from "../User/ProfileList";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export const Navbar = ({ isDarkTheme, toggleTheme }) => {
    return (
        <div
            className={`px-5 z-50 py-[.8rem] lg:px-20 flex justify-between`}
            style={{
                backgroundColor: isDarkTheme ? '#5d676c' : '#FFFFFF', // Change background color based on theme
            }}
        >
            <div className="flex items-center space-x-4">
                <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
                    <li className="logo font-semibold text-2xl" style={{color: "#019376"}}>
                        Shopii
                    </li>
                </div>
                <ShopMenu/>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-10">
                <div>
                    <IconButton>
                        <SearchIcon sx={{fontSize: "1.5rem"}}/>
                    </IconButton>
                </div>
                <div>

                        <ProfileList/>

                </div>
                <div>
                    <IconButton>
                        <Badge badgeContent={4} color="success">
                            <ShoppingCartIcon sx={{fontSize: "1.5rem"}}/>
                        </Badge>
                    </IconButton>
                </div>
                <FormControlLabel
                    control={<Switch checked={isDarkTheme} onChange={toggleTheme}/>}
                    label={isDarkTheme ? "Dark Mode" : "Light Mode"}
                />
            </div>

            {/* Theme Toggle Switch only in Navbar */}

        </div>
    );
};
