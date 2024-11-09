import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Widgets from "@mui/icons-material/Widgets";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Forum from "@mui/icons-material/Forum";
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import { Phone } from "@mui/icons-material";

const VendorLeftBar = ({ onSelect, ooo }) => {
  const [user, setUser] = useState(ooo || {});
  console.log("Left bar", user);

  return (
      <div className="w-[20%] h-[90vh] border-r-2 border-gray-200 bg-white block mt-7">
        <div className="block border-b border-t border-b-gray-300 pt-5 pl-5 pb-5">
          <div className={"mt-2 block gap-2"}>
            <div className={"flex gap-2"}>
              <PersonIcon className={"text-green-500"} />
              <Typography>
                {user?.user ? `${user.user.firstName} ${user.user.lastName}` : "Shop owner name"}
              </Typography>
            </div>
            <div className={"flex gap-2"}>
              <EmailIcon className={"text-green-500"} />
              <Typography>{user?.user ? user.user.email : "Shop owner email"}</Typography>
            </div>
            <div className={"flex gap-2"}>
              <LocalPhoneIcon className={"text-green-500"} />
              <Typography>{user?.user ? user.user.phone : "Shop owner phone"}</Typography>
            </div>
          </div>
        </div>

        <div className="block pt-5 pl-3 pb-5">
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            <ListItem className="shadow-md hover:bg-slate-200" button onClick={() => onSelect(1)}>
              <ListItemAvatar>
                <Avatar>
                  <Widgets />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Dashboard" className="select-none" />
            </ListItem>

            <ListItem className="shadow-md hover:bg-slate-200" button onClick={() => onSelect(2)}>
              <ListItemAvatar>
                <Avatar>
                  <ShoppingBagIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="My shop" className="select-none" />
            </ListItem>

            <ListItem className="shadow-md hover:bg-slate-200" button onClick={() => onSelect(3)}>
              <ListItemAvatar>
                <Avatar>
                  <NotificationsIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Order information" className="select-none" />
            </ListItem>

            <ListItem className="shadow-md hover:bg-slate-200" button onClick={() => onSelect(4)}>
              <ListItemAvatar>
                <Avatar>
                  <StarsRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Top product" className="select-none" />
            </ListItem>

            <ListItem className="shadow-md hover:bg-slate-200" button onClick={() => onSelect(5)}>
              <ListItemAvatar>
                <Avatar>
                  <CategoryRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Top 10 paid product" className="select-none" />
            </ListItem>
          </List>
        </div>
      </div>
  );
};

export default VendorLeftBar;
