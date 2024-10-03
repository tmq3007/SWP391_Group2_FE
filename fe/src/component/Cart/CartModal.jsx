import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';

const CartModal = ({ open, onClose, cartItems, totalPrice }) => {
    // Aggregate cart items by ID
    const aggregatedItems = cartItems.reduce((acc, item) => {
        const existingItem = acc.find(i => i.id === item.id);
        if (existingItem) {
            // If item with same ID exists, increment its quantity
            existingItem.quantity += item.quantity;
        } else {
            // Otherwise, push the item with its quantity
            acc.push({ ...item });
        }
        return acc;
    }, []);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            sx={{ '& .MuiDialog-paper': { margin: 0, position: 'fixed', right: 0, top: 0, bottom: 0, width: '400px' } }} // Modal on the right side
        >
            <DialogTitle>Shopping Cart</DialogTitle>
            <DialogContent>
                {aggregatedItems.length === 0 ? (
                    <Typography variant="body1">Your cart is empty.</Typography>
                ) : (
                    <List>
                        {aggregatedItems.map((item, index) => (
                            <div key={item.id}> {/* Use item.id as the key */}
                                <ListItem>
                                    <ListItemText
                                        primary={item.productName}
                                        secondary={`Price: $${item.discountPrice ? item.discountPrice.toFixed(2) : item.unitSellPrice.toFixed(2)} | Quantity: ${item.quantity}`}
                                    />
                                </ListItem>
                                <Divider />
                            </div>
                        ))}
                        <ListItem>
                            <Typography variant="h6">Total Price: ${totalPrice.toFixed(2)}</Typography>
                        </ListItem>
                    </List>
                )}
                <Button
                    variant="contained"
                    onClick={onClose}
                    sx={{ marginTop: 2, backgroundColor: '#019376' }}
                >
                    Close
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default CartModal;
