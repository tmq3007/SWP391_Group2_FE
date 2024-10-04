// Wishlist.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

const WishlistItem = ({ item }) => {
    return (
        <Card className="flex justify-between items-center p-4 mb-4 shadow-lg">
            <Box className="flex items-center">
                <CardMedia
                    component="img"
                    className="w-16 h-16 "
                    image={item.image}
                    alt={item.name}
                />
                <CardContent className="ml-4 w-full">
                    <Typography className="font-semibold">{item.name}</Typography>
                    <Typography className="text-gray-500">{item.store}</Typography>
                    <Typography className="text-green-800 text-xs bg-green-100 px-2 py-1 mt-1">
                        {item.rating} ★
                    </Typography>

                </CardContent>
            </Box>
            <Box className="text-right">
                <Typography className="font-semibold text-xl">${item.price}</Typography>
                {item.originalPrice && (
                    <Typography className="line-through text-gray-400">${item.originalPrice}</Typography>
                )}
                <Box className="flex space-x-4 mt-2">
                    <Button variant="contained" color="primary" size="small">Add to Cart</Button>
                    <Button variant="outlined" color="error" size="small">Remove</Button>
                </Box>
            </Box>
        </Card>
    );
};

export const Wishlist = () => {
    const items = [
        { name: 'Baby Spinach', store: 'Grocery Shop', rating: 3.33, price: 0.60, image: 'https://static01.nyt.com/newsgraphics/2014/06/16/bittman-eat-cherry/ed5c4f4c098cd142650d7c00014e71abf85d2f86/eatopener_cherry.jpg' },
        { name: 'Blueberries', store: 'Grocery Shop', rating: 4.67, price: 3.00, image: 'https://static01.nyt.com/newsgraphics/2014/06/16/bittman-eat-cherry/ed5c4f4c098cd142650d7c00014e71abf85d2f86/eatopener_cherry.jpg' },
        { name: 'Brussels Sprout', store: 'Grocery Shop', rating: 5, price: 3.00, originalPrice: 5.00, image: 'https://static01.nyt.com/newsgraphics/2014/06/16/bittman-eat-cherry/ed5c4f4c098cd142650d7c00014e71abf85d2f86/eatopener_cherry.jpg' },
    ];

    return (
        <div className=" mx-10 bg-white p-6 rounded-lg shadow-md">
            <Typography variant="h4" className="text-center mb-4 font-semibold">My Wishlists</Typography>
            {items.map((item, index) => (
                <WishlistItem key={index} item={item} />
            ))}
        </div>
    );
};

export default Wishlist;
