import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Collapse } from "@mui/material";
import { getAllCategoriesAction } from "../State/Category/Action";

const CategoryMenu = () => {
    const dispatch = useDispatch();
    const categories = useSelector((store) => store.categories.categories); // Lấy categories từ store
    const [openIndex, setOpenIndex] = React.useState(null);

    useEffect(() => {
        dispatch(getAllCategoriesAction());
    }, [dispatch]);

    const handleClick = (index) => {
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
            {categories.length === 0 ? ( // Kiểm tra xem có danh mục không
                <ListItemText primary="No categories available." />
            ) : (
                categories.map((category, index) => (
                    <React.Fragment key={category.id}>
                        <ListItemButton onClick={() => handleClick(index)}>
                            <ListItemIcon>
                                <ShoppingBagIcon />
                            </ListItemIcon>
                            <ListItemText primary={category.categoryName} />
                            {openIndex === index ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemText primary={category.description} sx={{ pl: 4 }} /> {/* Hiển thị mô tả của category */}
                            </List>
                        </Collapse>
                    </React.Fragment>
                ))
            )}
        </List>
    );
};

export default CategoryMenu;
