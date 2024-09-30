import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ShopMenu = () => {
    const [category, setCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel
                    id="demo-simple-select-label"
                    className="logo font-semibold text-2xl" style={{ color: "#019376" }}
                >
                    Shop
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    className="logo font-semibold text-2xl" style={{ color: "#019376" }}
                    onChange={handleChange}
                >
                    <MenuItem style={{ color: "#019376" }} value={0}>ALL</MenuItem>
                    <MenuItem style={{ color: "#019376" }} value={10}>Shop 1</MenuItem>
                    <MenuItem style={{ color: "#019376" }} value={20}>Shop 2</MenuItem>
                    <MenuItem style={{ color: "#019376" }} value={30}>Shop 3</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default ShopMenu;
