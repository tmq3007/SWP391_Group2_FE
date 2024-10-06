import { Drawer, Divider } from '@mui/material';
import React from 'react';
import Person2Icon from '@mui/icons-material/Person2';
import PasswordIcon from '@mui/icons-material/Password';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import { useNavigate, useLocation } from "react-router-dom";
import {logout} from "../../State/Authentication/Action";
import {useDispatch} from "react-redux";

const menu = [
  {
    title: 'Profile',
    icon: <Person2Icon />,
    herf: 'profileinfo'
  },
  {
    title: 'Change Password',
    icon: <PasswordIcon />,
    herf: 'change-pass'
  },
  {
    title: 'My Orders',
    icon: <ShoppingCartIcon />,
    herf: 'orders'
  },
  {
    title: 'My Wishlists',
    icon: <FavoriteIcon />,
    herf: 'wishlist'
  },
  {
    title: 'Need Help',
    icon: <HelpIcon />,
    herf: 'help'
  },
  {
    title: 'Log Out',
    icon: <LogoutIcon />,
    herf: 'logout'
  },
];

export default function ProfileNav({ open, handleClose }) {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current URL
  const dispatch = useDispatch ();
  const handleNavigate = (item) => {


      navigate(`${item.herf}`);
    // Navigate to the selected menu item
  };

  return (
      <div className="sticky flex flex-col h-90 w-60 bg-white  m-10 border-t border-border-200 ml-5">
        <ul className=" ">
          {menu.map((item, i) => (
              <React.Fragment key={i}>
                <button
                    onClick={() => handleNavigate(item)}
                    className={`relative px-5 py-3 flex items-center my-5 cursor-pointer hover:text-green-500 
                    }`}
                >
                  {item.icon}
                  <span className='items-center justify-between px-4'>{item.title}</span>

                  {/* Thanh dọc bên phải nếu đang ở link đó */}
                  {location.pathname.includes(item.herf) && (
                      <div className="absolute left-0 top-0 h-full border-l-4 border-green-500"></div>
                  )}
                </button>
                {/* Add Divider if needed */}
              </React.Fragment>
          ))}
        </ul>
      </div>
  );
}
