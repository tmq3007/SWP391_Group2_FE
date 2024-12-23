import React from 'react';
import WidgetsIcon from '@mui/icons-material/Widgets';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StarIcon from '@mui/icons-material/Star';
import BookIcon from '@mui/icons-material/Book';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import MessageIcon from '@mui/icons-material/Message';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import "../../style/ShopDashboardSidebar.css";

import {
    List,
    ListSubheader,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    ListItemButton,
    Collapse
} from '@mui/material';
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import "../../style/ShopDashboard.css";

import { useNavigate } from 'react-router-dom';



export const ShopDashboardSidebar = () => {
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();

    const handleClick = () => {
        setOpen(!open);
    };

    return (
            <div className="w-1/5 bg-white p-6 h-full overflow-y-auto">
                {/* MAIN section */}
                <List className="cursor-pointer"
                    subheader={
                        <ListSubheader style={{borderRadius: '8px', backgroundColor: '#f9f9f9'}} component="div"
                                       className="text-sm font-semibold text-gray-500" >
                            MAIN
                        </ListSubheader>
                    }
                >
                    <ListItem button className="sidebar-item">
                        <ListItemIcon>
                            <WidgetsIcon fontSize="small" className="text-gray-600"/>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" onClick={() => navigate("/shop-dashboard")}/>
                    </ListItem>
                </List>

                {/* PRODUCT MANAGEMENT section */}
                <Divider className="mt-4 mb-4"/>
                <List className="cursor-pointer"
                    subheader={
                        <ListSubheader style={{borderRadius: '8px', backgroundColor: '#f9f9f9'}} component="div"
                                       className="text-sm font-semibold text-gray-500">
                            PRODUCT MANAGEMENT
                        </ListSubheader>
                    }
                >
                    <ListItemButton onClick={handleClick} className="sidebar-item">
                        <ListItemIcon>
                            <ShoppingBagIcon className="text-gray-600"/>
                        </ListItemIcon>
                        <ListItemText primary="Products"/>
                        {open ? <ExpandLess className="text-gray-600"/> : <ExpandMore className="text-gray-600"/>}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding >
                            <ListItemButton className="pl-8 sidebar-item" onClick={() => navigate("/shop-dashboard/shop-product")}>
                                <ListItemText primary="All Product"/>
                            </ListItemButton>
                            <ListItemButton className="pl-8 sidebar-item" onClick={() => navigate("/shop-dashboard/shop-add-product")} >
                                <ListItemText primary="Add New Product"/>
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <ListItem button className="sidebar-item" onClick={() => navigate("/shop-dashboard/shop-inventory")}>
                        <ListItemIcon>
                            <InventoryIcon fontSize="small" className="text-gray-600"/>
                        </ListItemIcon>
                        <ListItemText primary="Inventory"/>
                    </ListItem>
                </List>

                {/* ORDER MANAGEMENT section */}
                <Divider className="mt-4 mb-4"/>
                <List className="cursor-pointer"
                    subheader={
                        <ListSubheader style={{borderRadius: '8px', backgroundColor: '#f9f9f9'}} component="div"
                                       className="text-sm font-semibold text-gray-500">
                            ORDER MANAGEMENT
                        </ListSubheader>
                    }
                >
                    <ListItem button className="sidebar-item" onClick={() => navigate("/shop-dashboard/shop-orders")}>
                        <ListItemIcon>
                            <FormatListNumberedRtlIcon fontSize="small" className="text-gray-600"/>
                        </ListItemIcon>
                        <ListItemText primary="Orders"/>
                    </ListItem>
                    <ListItem button className="sidebar-item" onClick={()=>navigate("/shop-dashboard/shop-transaction")}>
                        <ListItemIcon>
                            <SubtitlesIcon fontSize="small" className="text-gray-600"/>
                        </ListItemIcon>
                        <ListItemText primary="Transactions" />
                    </ListItem>
                </List>

                {/* FEEDBACK CONTROL section */}
                <Divider className="mt-4 mb-4"/>
                <List className="cursor-pointer"
                    subheader={
                        <ListSubheader style={{borderRadius: '8px', backgroundColor: '#f9f9f9'}} component="div"
                                       className="text-sm font-semibold text-gray-500">
                            FEEDBACK CONTROL
                        </ListSubheader>
                    }
                >
                    <ListItem button className="sidebar-item" onClick={() => navigate("/shop-dashboard/shop-review")}>
                        <ListItemIcon>
                            <StarIcon fontSize="small" className="text-gray-600"/>
                        </ListItemIcon>
                        <ListItemText primary="Reviews"/>
                    </ListItem>
                </List>


            </div>

    );
};
