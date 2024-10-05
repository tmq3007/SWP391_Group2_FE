import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Widgets from "@mui/icons-material/Widgets";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Forum from "@mui/icons-material/Forum";
import NotificationsIcon from '@mui/icons-material/Notifications';

const VendorLeftBar = ({ onSelect }) => {
  return (
    <div  className="w-[18.3%] h-[90vh] border-r-2 border-gray-200 bg-white block">
      <div className="block border-b border-t border-b-gray-300 pt-5 pl-5 pb-5">
        <div className="flex items-center mb-2">
          <div className="w-[4rem] h-[4rem] border border-black rounded-full">
            <img
              src="https://th.bing.com/th/id/OIP.Agy7SqK_8DPerG6Xf-Ue9gHaFu?w=234&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="vendor"
              className="text-center w-[100%] h-[100%] rounded-full border-1 p-0.4 shadow-lg mr-2"
            />
          </div>
          <div className="ml-2 block">
            <div className="flex items-center justify-center gap-1">
              <PersonIcon sx={{ color: "#019376" }} />
              <span className="text-black text-sm font-semibold">Name</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <EmailIcon sx={{ color: "#019376" }} />
              <span className="text-black text-sm font-semibold">Email</span>
            </div>
          </div>
        </div>
        <div className="flex-start ml-2 mt-5">
          <LocalPhoneIcon sx={{ color: "#019376" }} />
          <span className="text-black font-semibold"> Phone number</span>
        </div>
      </div>

      <div className="block pt-5 pl-3 pb-5">
        <h2 className="ml-4 font-semibold text-gray-400 mb-4">Menu</h2>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItem className="shadow-md hover:bg-slate-200" button="true" onClick={() => onSelect(1)}>
            <ListItemAvatar>
              <Avatar>
                <Widgets />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Dashboard" className="select-none"/>
          </ListItem>

          <ListItem className="shadow-md hover:bg-slate-200" button="true" onClick={() => onSelect(2)}>
            <ListItemAvatar>
              <Avatar>
                <ShoppingBagIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="My shop" className="select-none"/>
          </ListItem>

          <ListItem className="shadow-md hover:bg-slate-200" button="true" onClick={() => onSelect(3)}>
            <ListItemAvatar>
              <Avatar>
                <NotificationsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Notification" className="select-none"/>
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default VendorLeftBar;
