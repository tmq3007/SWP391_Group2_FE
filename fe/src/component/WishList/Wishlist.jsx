// Wishlist.js
import React, { useEffect, useState } from 'react';
import { Button, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../State/Cart/Action'; // Adjust the import based on your action path

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    // Load wishlist from localStorage on initial render
    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist'));
        if (savedWishlist) {
            setWishlist(savedWishlist);
        }
    }, []);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    // Dispatch to add item to cart
    const dispatch = useDispatch();

    // Function to move item to cart
    const handleMoveToCart = (item) => {
        dispatch(addToCart(item)); // Assuming you have an addToCart action
        setWishlist(wishlist.filter(w => w.id !== item.id)); // Remove from wishlist
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Wishlist
            </Typography>
            {wishlist.length === 0 ? (
                <Typography variant="body1">Your wishlist is empty.</Typography>
            ) : (
                <List>
                    {wishlist.map((item) => (
                        <div key={item.id}>
                            <ListItem>
                                <ListItemText
                                    primary={item.productName}
                                    secondary={`Price: $${item.unitSellPrice.toFixed(2)}`}
                                />
                                <Button variant="contained" onClick={() => handleMoveToCart(item)}>
                                    Move to Cart
                                </Button>
                            </ListItem>
                            <Divider />
                        </div>
                    ))}
                </List>
            )}
        </div>
    );
};

export default Wishlist;
