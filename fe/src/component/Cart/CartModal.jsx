import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
    Avatar,
    IconButton
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router-dom";


const CartModal = ({ open, onClose, cartItems, updateCart }) => {
    // Calculate total price and unique item count
    const totalPrice = cartItems.reduce((total, item) => {
        const originalPrice = item.unitSellPrice || 0;
        const discount = item.discount || 0;
        const discountPrice = originalPrice * (1 - discount);
        return total + (discountPrice * item.quantity);
    }, 0);

    const uniqueItemCount = cartItems.length;

    // Handler to decrease item quantity
    const handleDecreaseQuantity = (item) => {
        if (item.quantity > 1) {
            updateCart(item, item.quantity - 1);
        } else {
            handleRemoveItem(item);
        }
    };

    // Handler to remove item
    const handleRemoveItem = (item) => {
        updateCart(item, 0);
    };

    const navigate = useNavigate();
    const handleCreatePayment = () => {
        navigate("/my-place-order/*");
        return null;
    }
    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Shopping Cart ({uniqueItemCount} item{uniqueItemCount !== 1 ? 's' : ''})</DialogTitle>
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
                                        <IconButton
                                            onClick={() => handleDecreaseQuantity(item)}
                                            size="small"
                                            aria-label={`Decrease quantity of ${item.productName}`}
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleRemoveItem(item)}
                                            size="small"
                                            aria-label={`Remove ${item.productName} from cart`}
                                        >
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
                <div className='flex gap-2'>
                <Button
                    variant="contained"
                    onClick={onClose}
                    sx={{ marginTop: 2, backgroundColor: '#019376' }}
                >
                    Close
                </Button>
                <Button//move to payment
                    variant="contained"
                    onClick={handleCreatePayment}//current onclose
                    sx={{ marginTop: 2, backgroundColor: '#019376' }}
                >
                    Create payment
                </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CartModal;
