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
import {Dashboard, ExpandLess, ExpandMore, Group, NewReleases, RecentActors, Storefront} from "@mui/icons-material";
import "../../style/ShopDashboard.css";

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

    return (
        <div className="w-1/5 bg-gray-100 p-6">
            {/* MAIN section */}
            <List
                subheader={
                    <ListSubheader style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }} component="div" className="text-sm font-semibold text-gray-400">
                        MAIN
                    </ListSubheader>
                }
            >
                <ListItem button style={{ borderRadius: '8px', marginBottom: '8px', transition: '0.3s', backgroundColor: '#ffffff', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                >
                    <ListItemIcon>
                        <WidgetsIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard"/>
                </ListItem>
            </List>


            {/* PRODUCT MANAGEMENT section */}
            <Divider className="mt-4 mb-4"/>
            <List
                subheader={
                    <ListSubheader style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }} component="div" className="text-sm font-semibold text-gray-400">
                        PRODUCT MANAGEMENT
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
                        <ListItemButton sx={{pl: 4}}>
                            <ListItemText primary="All Product"/>
                        </ListItemButton>

                        <ListItemButton sx={{pl: 4}}>
                            <ListItemText primary="Add New Product"/>
                        </ListItemButton>

                        <ListItemButton sx={{pl: 4}}>
                            <ListItemText primary="My Draft"/>
                        </ListItemButton>

                        <ListItemButton sx={{pl: 4}}>
                            <ListItemText primary="All Low & Out of Stock Product"/>
                        </ListItemButton>
                    </List>
                </Collapse>
                <ListItem button>
                    <ListItemIcon>
                        <InventoryIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Inventory"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <BookIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Attributes"/>
                </ListItem>
            </List>

            {/* FINANCIAL MANAGEMENT section */}
            <Divider className="mt-4 mb-4"/>
            <List
                subheader={
                    <ListSubheader style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }} component="div" className="text-sm font-semibold text-gray-400">
                        FINANCIAL MANAGEMENT
                    </ListSubheader>
                }
            >
                <ListItem button>
                    <ListItemIcon>
                        <StarIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Withdrawals"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <VolunteerActivismIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Refunds"/>
                </ListItem>
            </List>

            {/* ORDER MANAGEMENT section */}
            <Divider className="mt-4 mb-4"/>
            <List
                subheader={
                    <ListSubheader style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }} component="div" className="text-sm font-semibold text-gray-400">
                        ORDER MANAGEMENT
                    </ListSubheader>
                }
            >
                <ListItem button>
                    <ListItemIcon>
                        <FormatListNumberedRtlIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Orders"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <SubtitlesIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Transactions"/>
                </ListItem>
            </List>

            {/* FEATURE MANAGEMENT section */}
            <Divider className="mt-4 mb-4"/>
            <List
                subheader={
                    <ListSubheader style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }} component="div" className="text-sm font-semibold text-gray-400">
                        FEATURE MANAGEMENT
                    </ListSubheader>
                }
            >
                <ListItem button>
                    <ListItemIcon>
                        <ReceiptLongIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Store Notice"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <MessageIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Message"/>
                </ListItem>
            </List>

            {/* FEEDBACK CONTROL section */}
            <Divider className="mt-4 mb-4"/>
            <List
                subheader={
                    <ListSubheader style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }} component="div" className="text-sm font-semibold text-gray-400">
                        FEEDBACK CONTROL
                    </ListSubheader>
                }
            >
                <ListItem button>
                    <ListItemIcon>
                        <StarIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Reviews"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <HelpOutlineIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Questions"/>
                </ListItem>
            </List>

            {/* USER CONTROL section */}
            <Divider className="mt-4 mb-4"/>
            <List
                subheader={
                    <ListSubheader style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }} component="div" className="text-sm font-semibold text-gray-400">
                        USER CONTROL
                    </ListSubheader>
                }
            >
                <ListItem button>
                    <ListItemIcon>
                        <PeopleAltIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Staff"/>
                </ListItem>

            </List>

            {/* PROMOTIONAL CONTROL section */}
            <Divider className="mt-4 mb-4"/>
            <List
                subheader={
                    <ListSubheader style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }} component="div" className="text-sm font-semibold text-gray-400">
                        PROMOTIONAL CONTROL
                    </ListSubheader>
                }
            >
                <ListItem button>
                    <ListItemIcon>
                        <CardGiftcardIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Coupons"/>
                </ListItem>
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <ShoppingBagIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Flash Sale"/>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{pl: 4}}>
                            <ListItemText primary="Available Flash deals"/>
                        </ListItemButton>

                        <ListItemButton sx={{pl: 4}}>
                            <ListItemText primary="My Products in Deals"/>
                        </ListItemButton>

                        <ListItemButton sx={{pl: 4}}>
                            <ListItemText primary="Ask for Enrol;ment"/>
                        </ListItemButton>

                    </List>
                </Collapse>
            </List>

            {/* Layout/Page management section */}
            <Divider className="mt-4 mb-4"/>
            <List
                subheader={
                    <ListSubheader style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }} component="div" className="text-sm font-semibold text-gray-400">
                        LAYOUT/PAGE MANAGEMENT
                    </ListSubheader>
                }
            >
                <ListItem button>
                    <ListItemIcon>
                        <ElectricBoltIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="FAQs"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ElectricBoltIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Term And Conditions"/>
                </ListItem>
            </List>
        </div>
    );
};
