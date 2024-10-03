import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import '../../style/CategoryMenu.css';
import { Collapse } from "@mui/material";

const CategoryMenu = () => {
    const [openIndex, setOpenIndex] = React.useState(null); // Theo dõi chỉ số danh sách đang mở

    const handleClick = (index) => {
        // Nếu danh sách đang mở, đóng nó; ngược lại, mở danh sách mới
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <List
            subheader={
                <ListSubheader
                    style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }}
                    component="div"
                    className="text-sm font-semibold text-center text-gray-400"
                >
                    CATEGORY LIST
                </ListSubheader>
            }
        >
            {['Categories 1', 'Categories 2'].map((category, index) => (
                <React.Fragment key={index}>
                    <ListItemButton onClick={() => handleClick(index)}>
                        <ListItemIcon>
                            <ShoppingBagIcon />
                        </ListItemIcon>
                        <ListItemText primary={category} />
                        {openIndex === index ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Category 1" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Category 2" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Category 3" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </React.Fragment>
            ))}
        </List>
    );
};

export default CategoryMenu;
