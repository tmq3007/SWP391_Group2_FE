import { Drawer, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Person2Icon from '@mui/icons-material/Person2';
import PasswordIcon from '@mui/icons-material/Password';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import { useNavigate, useLocation } from "react-router-dom";
import { getUser, logout } from "../../State/Authentication/Action";
import { useDispatch } from "react-redux";
import SettingsIcon from '@mui/icons-material/Settings';
import { Settings } from "@mui/icons-material";

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
    herf: 'orders',
    restricted: true
  },
  {
    title: 'My Wishlist',
    icon: <FavoriteIcon />,
    herf: 'wishlist',
    restricted: true
  },
  {
    title: 'Need Help',
    icon: <HelpIcon />,
    herf: 'help-center',
    restricted: true
  },

];

export default function ProfileNav({ open, handleClose }) {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const jwt = localStorage.getItem("jwt");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt)).then((data) => {
        setUserId(data.result.roles[0].name);
      }).catch((error) => {
        console.error('Error getting user:', error);
      });
    }
  }, [dispatch, jwt]);

  const handleNavigate = (item) => {
    navigate(item.title === 'Need Help' ? '/help-center' : `${item.herf}`);
  };

  const filteredMenu = menu.filter(item => !item.restricted || userId === 'CUSTOMER');

  return (
      <div className="max-h-[500px] h-[600px] sticky flex flex-col w-60 bg-white m-10 border-t border-border-200 ml-5">
        <ul>
          {filteredMenu.map((item, i) => (
              <React.Fragment key={i}>
                <button
                    onClick={() => handleNavigate(item)}
                    className="relative px-5 py-3 flex items-center my-5 cursor-pointer hover:text-green-500"
                >
                  {item.icon}
                  <span className='items-center justify-between px-4'>{item.title}</span>
                  {location.pathname.includes(item.herf) && (
                      <div className="absolute left-0 top-0 h-full border-l-4 border-green-500"></div>
                  )}
                </button>
              </React.Fragment>
          ))}
        </ul>
      </div>
  );
}
