import React, {useState} from "react";
import StoreIcon from "@mui/icons-material/Store";
import { Menu, MenuItem } from '@mui/material';
import VendorProfile from "./VendorProfile";
export const VendorNavbar = () => {

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
        <div
            className="w-[100%] h-[10%] px-5 z-50  lg:px-20 flex items-center border-b-2  "
            style={{backgroundColor: "#FFFFFF"}}
        >
          <div className="w-[15%] h-[100%] border-r-2 flex justify-start items-center">
            <li
                className="logo font-semibold text-2xl pl-4"
                style={{color: "#019376"}}
            >
              Shopii
            </li>
          </div>
          <div className="w-[60%] h-[100%] border-r-2 justify-end flex items-center">
            <div
                className="logo bg-[#019376]  font-semibold p-2 rounded-full mr-10 cursor-pointer shadow-lg hover:bg-[#6fd2be]"
                style={{color: "#FFFFFF"}}
            >
              Create shop
            </div>
          </div>
          <div className="w-[12%] h-[100%] border-r-2 flex justify-center items-center ">
            <div
                className="flex justify-center items-center gap-1 border p-2 rounded-full hover:bg-[#6fd2be] group cursor-pointer shadow-lg">
              <StoreIcon
                  sx={{color: "#019376"}}
                  className="group-hover:text-white"
              />
              <span className="font-semibold text-[#019376] group-hover:text-white">
            Visit site
          </span>
            </div>
          </div>
          <div className="flex justify-center items-center w-[13%] h-[100%]">
            <div
                className="w-auto h-[4rem] ml-1 flex justify-center items-center cursor-pointer"
                onClick={handleClick} // Open dropdown on click
            >
              <img
                  src="d"
                  alt="demo"
                  className="w-[3rem] h-[3rem] rounded-full border-gray-200 shadow-lg border mr-2"
              />
              <div>
                <span className="block font-semibold">Name</span>
                <span className="block text-gray-400">Store owner</span>
              </div>
            </div>

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
    )
        ;
};