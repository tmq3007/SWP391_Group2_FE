import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { getAllCategoriesAction } from "../State/Category/Action";
import { List, ListItem, ListSubheader } from "@mui/material";

const CategoryMenu = ({ setSelectedCategory, setSelectedPrice }) => {
    const [valueCategory, setValueCategory] = React.useState('all'); // Giá trị mặc định cho radio category
    const [valuePrice, setValuePrice] = React.useState('all'); // Giá trị mặc định cho radio price
    const dispatch = useDispatch();
    const categories = useSelector((store) => store.categories.categories); // Lấy danh mục từ store

    useEffect(() => {
        dispatch(getAllCategoriesAction()); // Gọi action lấy danh mục khi component mount
    }, [dispatch]);

    const handleCategoryChange = (event) => {
        setValueCategory(event.target.value); // Cập nhật khi người dùng chọn danh mục
        setSelectedCategory(event.target.value);  // Gửi giá trị danh mục đã chọn về Home
    };

    const handlePriceChange = (event) => {
        setValuePrice(event.target.value); // Cập nhật khi người dùng chọn giá
        setSelectedPrice(event.target.value);  // Gửi giá trị giá đã chọn về Home
    };

    return (
        <FormControl component="fieldset">
            {/* Danh mục Category */}
            <List
                className="cursor-pointer w-[230px]"
                subheader={
                    <ListSubheader
                        style={{
                            borderRadius: '8px',
                            backgroundColor: '#019376',  // Màu nền đậm hơn
                            color: '#ffffff',  // Màu chữ trắng
                            fontWeight: 'bold',
                            fontSize: '18px',
                            padding: '10px 16px',
                            border: '1px solid #ccc',
                        }}
                    >
                        Filter by Category
                    </ListSubheader>
                }
            >
                <RadioGroup value={valueCategory} onChange={handleCategoryChange}>
                    <ListItem>
                        <FormControlLabel
                            value="all"
                            control={<Radio sx={{
                                '&.Mui-checked': {
                                    color: '#019376',
                                }
                            }} />}
                            label="All"
                        />
                    </ListItem>
                    {
                        categories.map((category) => (
                            <ListItem key={category.id}>
                                <FormControlLabel
                                    value={category.categoryName}
                                    control={<Radio sx={{
                                        '&.Mui-checked': {
                                            color: '#019376',
                                        }
                                    }} />}
                                    label={category.categoryName}
                                />
                            </ListItem>
                        ))
                    }
                </RadioGroup>
            </List>

            {/* Lọc theo giá */}
            <List
                className="cursor-pointer w-[230px] mt-5"
                subheader={
                    <ListSubheader
                        style={{
                            borderRadius: '8px',
                            backgroundColor: '#019376',
                            color: '#ffffff',
                            fontWeight: 'bold',
                            fontSize: '18px',
                            padding: '10px 16px',
                            border: '1px solid #ccc',
                        }}
                    >
                        Filter by Price
                    </ListSubheader>
                }
            >
                <RadioGroup value={valuePrice} onChange={handlePriceChange}>
                    <ListItem>
                        <FormControlLabel
                            value="all"
                            control={<Radio sx={{
                                '&.Mui-checked': {
                                    color: '#019376',
                                }
                            }} />}
                            label="All"
                        />
                    </ListItem>
                    <ListItem>
                        <FormControlLabel
                            value="low"
                            control={<Radio sx={{
                                '&.Mui-checked': {
                                    color: '#019376',
                                }
                            }} />}
                            label="Under $50"
                        />
                    </ListItem>
                    <ListItem>
                        <FormControlLabel
                            value="high"
                            control={<Radio sx={{
                                '&.Mui-checked': {
                                    color: '#019376',
                                }
                            }} />}
                            label="Above $50"
                        />
                    </ListItem>
                </RadioGroup>
            </List>
        </FormControl>
    );
}

export default CategoryMenu;
