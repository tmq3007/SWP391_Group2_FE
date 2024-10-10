import React from 'react';
import WidgetsIcon from '@mui/icons-material/Widgets';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StarIcon from '@mui/icons-material/Star';
import BookIcon from '@mui/icons-material/Book';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
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
import {
    Dashboard,
    ExpandLess,
    ExpandMore,
    Group,
    NewReleases,
    RecentActors,
    Settings,
    Storefront
} from "@mui/icons-material";
import "../../style/ShopDashboard.css";
import {NavLink, useNavigate} from "react-router-dom";


const menu=[
    {title:"Dashboard", icon:<Dashboard/>, path:"/dashboard-page"},
    {title:"All Shops", icon:<ShoppingBagIcon/>, path:"/all-shops"},
    {title:"Add New Shop", icon:<BookIcon/>, path:"/add-new-shop"},
    {title:"Inactive/New shops", icon:<NewReleases/>, path:"/inactive-new-shops"},
    {title:"All Users", icon:<Group/>, path:"/all-users"},
    {title:"All Vendors", icon:<Storefront/>, path:"/all-vendors"},
    {title:"All Customers", icon:<RecentActors/>, path:"/all-customers"},
]

export const AdminDashboardSidebar = () => {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(`/admin-dashboard${path}`)
    }

    return (
        <div className="w-1/5 bg-gray p-6 h-full overflow-y-auto">
            {/* MAIN section */}
            <List
                subheader={
                    <ListSubheader style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }} component="div" className="text-sm font-semibold text-gray-400">
                        MAIN
                    </ListSubheader>
                }
            >
                <ListItem onClick={() =>  handleNavigate('/dashboard-page')} button style={{ borderRadius: '8px', marginBottom: '8px', transition: '0.3s', backgroundColor: '#ffffff', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                >
                    <ListItemIcon>
                        <WidgetsIcon fontSize="small"/>
                    </ListItemIcon>
                        <ListItemText primary='Dashboard' />
                </ListItem>
            </List>


            {/* PRODUCT MANAGEMENT section */}
            <Divider className="mt-4 mb-4"/>
            <List
                subheader={
                    <ListSubheader style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }} component="div" className="text-sm font-semibold text-gray-400">
                        SHOP MANAGEMENT
                    </ListSubheader>
                }
            >
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <ShoppingBagIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Shops"/>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton onClick={() => handleNavigate('/all-shops')} sx={{pl: 4}}>
                            <ListItemText primary="All Shops"/>
                        </ListItemButton>

                        <ListItemButton onClick={() => handleNavigate('/inactive-new-shops')} sx={{pl: 4}}>
                            <ListItemText primary="Inactive/New shops"/>
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>

            {/* FINANCIAL MANAGEMENT section */}
            <Divider className="mt-4 mb-4"/>
            <List
                subheader={
                    <ListSubheader style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }} component="div" className="text-sm font-semibold text-gray-400">
                        USER MANAGEMENT
                    </ListSubheader>
                }
            >
                <ListItem button onClick={() => handleNavigate('/all-users')}>
                    <ListItemIcon>
                        <StarIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="All Users"/>
                </ListItem>
                <ListItem button onClick={() => handleNavigate('/all-vendors')}>
                    <ListItemIcon>
                        <VolunteerActivismIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="All Vendors"/>
                </ListItem>
                <ListItem button onClick={() => handleNavigate('/all-customers')}>
                    <ListItemIcon>
                        <VolunteerActivismIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="All Customers"/>
                </ListItem>
            </List>


            {/*CATEGORY MANAGEMENT section*/}
            <Divider className="mt-4 mb-4"/>
            <List
                subheader={
                    <ListSubheader style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }} component="div" className="text-sm font-semibold text-gray-400">
                        CATEGORY MANAGEMENT
                    </ListSubheader>
                }
            >
                <ListItem button onClick={() => handleNavigate('/all-categories')}>
                    <ListItemIcon>
                        <Settings fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="All Categories"/>
                </ListItem>
            </List>

            {/* SETTING MANAGEMENT section */}
            <Divider className="mt-4 mb-4"/>
            <List
                subheader={
                    <ListSubheader style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }} component="div" className="text-sm font-semibold text-gray-400">
                        SETTING MANAGEMENT
                    </ListSubheader>
                }
            >
                <ListItem button onClick={() => handleNavigate('/settings')}>
                    <ListItemIcon>
                        <Settings fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Settings"/>
                </ListItem>
            </List>


        </div>
    );
};
