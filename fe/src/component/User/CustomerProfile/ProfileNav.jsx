import { Drawer, Divider } from '@mui/material';
import React from 'react';
import Person2Icon from '@mui/icons-material/Person2';
import PasswordIcon from '@mui/icons-material/Password';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import {useNavigate} from "react-router-dom";
const menu = [
  {
    title: 'Profile',
    icon: <Person2Icon/>,
    herf:'profile'
  },
  {
    title: 'Change Password',
    icon: <PasswordIcon/>,
    herf:'change-pass'
  },
  {
    title: 'My Orders',
    icon: <ShoppingCartIcon/>,
    herf:'orders'
  },
  {
    title: 'My Wishlists',
    icon: <FavoriteIcon />,
    herf:'wishlist'
  },
  {
    title: 'Need Help',
    icon: <HelpIcon/>,
    herf:'help'
  },
  {
    title: 'Log Out',
    icon: <LogoutIcon/>,
    herf:'logout'
  },

];
export default function ProfileNav({open, handleClose}) {
  const navigate=useNavigate();
  const handleNavigate = (item) => {
    navigate(`${item.herf}`); // Use backticks for template literals

  }

  return (
      <div className="sticky flex flex-col h-90 w-60 bg-white  m-10 border-t border-border-200 ml-5">
        <ul className="space-y-4 pt-4 ">
          {menu.map((item, i) => (
              <React.Fragment key={i}>
                <button
                    onClick={() => handleNavigate(item)}
                    className="px-5  flex items-center space-x-5 space-y-4 cursor-pointer hover:text-green-500 "
                >
                  {item.icon}
                  <span>{item.title}</span>
                </button>
                {/*{i !== menu.length - 1 && <Divider/>} /!* Ensure correct length check *!/*/}
              </React.Fragment>
          ))}
        </ul>
      </div>


  );
}
