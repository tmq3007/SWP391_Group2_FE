import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, Typography, Button, List, ListItem, ListItemText, Divider, Avatar, IconButton
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const CartModal = ({ open, onClose, cartItems, updateCart }) => {
    const totalPrice = cartItems.reduce((total, item) => {
        const originalPrice = item.unitSellPrice || 0;
        const discount = item.discount || 0;
        const discountPrice = originalPrice * (1 - discount);
        return total + (discountPrice * item.quantity);
    }, 0);

    const uniqueItemCount = cartItems.length;

    const handleDecreaseQuantity = (item) => {
        updateCart(item, item.quantity - 1);
    };

    const handleRemoveItem = (item) => {
        updateCart(item, 0);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Shopping Cart ({uniqueItemCount} items)</DialogTitle>
            <DialogContent>
                {cartItems.length === 0 ? (
                    <Typography variant="body1">Your cart is empty.</Typography>
                ) : (
                    <List>
                        {cartItems.map((item) => {
                            const originalPrice = item.unitSellPrice || 0;
                            const discount = item.discount || 0;
                            const discountPrice = originalPrice * (1 - discount);

                            return (
                                <div key={item.id}>
                                    <ListItem>
                                        <Avatar alt={item.productName} src={item.pictureUrl} sx={{ marginRight: 2 }} />
                                        <ListItemText
                                            primary={item.productName}
                                            secondary={`Price: $${discountPrice.toFixed(2)} | Quantity: ${item.quantity}`}
                                        />
                                        <IconButton onClick={() => handleDecreaseQuantity(item)} size="small">
                                            <RemoveIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleRemoveItem(item)} size="small">
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                    <Divider />
                                </div>
                            );
                        })}
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
