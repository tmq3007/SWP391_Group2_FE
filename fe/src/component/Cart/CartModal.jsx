import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Button,
    List,
    ListItem,
    Divider,
    Avatar,
    IconButton,
    Box
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from "react-redux";
import { updateCartItem, removeCartItem, getAllCartItems } from '../State/Cart/Action';
import { getUser } from "../State/Authentication/Action";

const CartModal = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    // Get cartItems from the Redux store
    const cartItems = useSelector(store => store.carts.cartItems) || []; // Default to empty array

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Fetch user details and then load the cart items
        dispatch(getUser(jwt))
            .then((data) => {
                setUserId(data.result.id);
                dispatch(getAllCartItems(data.result.id, jwt)); // Fetch cart items after getting user ID
            })
            .catch((error) => {
                console.error('Error getting user:', error);
            });
    }, [dispatch, jwt]);

    console.log("user:", userId);
    console.log("cart:", cartItems); // Ensure cartItems is logged

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => {
        const originalPrice = item.unitSellPrice || 0;
        const discount = item.discount || 0;
        const discountPrice = originalPrice * (1 - discount);
        return total + (discountPrice * item.quantity);
    }, 0); // Default to 0 if cartItems is empty

    // Decrease product quantity in the cart
    const handleDecreaseQuantity = (item) => {
        if (item.quantity > 1) {
            dispatch(updateCartItem(item.userId, item.cartItemId, { ...item, quantity: item.quantity - 1 }, jwt));
        } else {
            handleRemoveItem(item);
        }
    };

    // Increase product quantity in the cart
    const handleIncreaseQuantity = (item) => {
        dispatch(updateCartItem(item.userId, item.cartItemId, { ...item, quantity: item.quantity + 1 }, jwt));
    };

    // Remove product from cart
    const handleRemoveItem = (item) => {
        dispatch(removeCartItem(item.userId, item.cartItemId, jwt));
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: { borderRadius: '16px' } // Design rounded corners
            }}
        >
            <DialogTitle>{`${cartItems.length} Items`}</DialogTitle>
            <DialogContent>
                <List>
                    {cartItems.map((item) => {
                        const originalPrice = item.unitSellPrice || 0;
                        const discount = item.discount || 0;
                        const discountPrice = originalPrice * (1 - discount);

                        return (
                            <div key={item.cartItemId}> {/* Ensure you have a unique key */}
                                <ListItem sx={{ display: 'flex', alignItems: 'center', padding: '16px 0' }}>
                                    {/* Decrease/Increase quantity button and product image */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', width: '60px', justifyContent: 'space-between' }}>
                                        <IconButton onClick={() => handleDecreaseQuantity(item)} size="small">
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography>{item.quantity}</Typography>
                                        <IconButton onClick={() => handleIncreaseQuantity(item)} size="small">
                                            <AddIcon />
                                        </IconButton>
                                    </Box>

                                    <Avatar alt={item.productName} src={item.pictureUrl} sx={{ width: 56, height: 56, marginRight: 2 }} />

                                    {/* Product details */}
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography>{item.productName}</Typography>
                                        <Typography sx={{ color: '#019376', fontWeight: 'bold' }}>${discountPrice.toFixed(2)}</Typography>
                                        <Typography variant="body2">{`${item.quantity} X ${originalPrice.toFixed(2)}`}</Typography>
                                    </Box>

                                    {/* Price and remove button */}
                                    <Typography sx={{ fontWeight: 'bold' }}>${(discountPrice * item.quantity).toFixed(2)}</Typography>
                                    <IconButton onClick={() => handleRemoveItem(item)} size="small">
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItem>
                                <Divider />
                            </div>
                        );
                    })}

                    {/* Total price and checkout button */}
                    <ListItem>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                                Total: ${totalPrice.toFixed(2)}
                            </Typography>
                        </Box>
                    </ListItem>
                    <ListItem>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: '#019376',
                                borderRadius: '24px',
                                padding: '10px 0',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            Checkout
                            <Typography variant="body1" sx={{ color: '#fff' }}>${totalPrice.toFixed(2)}</Typography>
                        </Button>
                    </ListItem>
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default CartModal;
