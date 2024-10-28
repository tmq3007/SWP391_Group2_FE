import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { getAllCategoriesAction } from "../State/Category/Action";
import { List, ListItem, ListSubheader } from "@mui/material";

const CategoryMenu = ({ setSelectedCategory, setSelectedPrice }) => {
    const [valueCategory, setValueCategory] = React.useState('all'); // Default value for category radio
    const [valuePrice, setValuePrice] = React.useState('all'); // Default value for price radio
    const dispatch = useDispatch();

    // Access categories from the Redux store
    const {categories} = useSelector((store) => store.categories || {}); // Ensure categories is an object

    //console.log("cate:", categories); // Check data from store

    useEffect(() => {
        dispatch(getAllCategoriesAction());
    }, []);

    const handleCategoryChange = (event) => {
        setValueCategory(event.target.value); // Update selected category
        setSelectedCategory(event.target.value); // Pass selected category to parent component
    };

    const handlePriceChange = (event) => {
        setValuePrice(event.target.value); // Update selected price range
        setSelectedPrice(event.target.value); // Pass selected price range to parent component
    };

    return (
        <FormControl component="fieldset">
            {/* Category Filter */}
            <List
                className="cursor-pointer w-[230px]"
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
                    {Array.isArray(categories.result) && categories.result.length > 0 ? (
                        categories.result.map((category) => (
                            <ListItem key={category.categoryId}>
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
                    ) : (
                        <ListItem>
                            <FormControlLabel
                                value="none"
                                control={<Radio disabled />}
                                label="No categories available"
                            />
                        </ListItem>
                    )}
                </RadioGroup>
            </List>

            {/* Price Filter */}
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
                            label="Under 50000VND"
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
                            label="Above 50000VND"
                        />
                    </ListItem>
                </RadioGroup>
            </List>
        </FormControl>
    );
}

export default CategoryMenu;
