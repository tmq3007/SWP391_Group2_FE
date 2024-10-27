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
import { useDispatch } from "react-redux";
import { updateCartItem, removeCartItem, getAllCartItems } from '../State/Cart/Action';
import { getUser } from "../State/Authentication/Action";

const CartModal = ({ open, onClose, cartItems }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const [userId, setUserId] = useState(null);
    const [localCart, setLocalCart] = useState(cartItems || []);
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        if (userId) {
            setLoading(true);
            dispatch(getAllCartItems(userId, jwt)).finally(() => setLoading(false));
        }
    }, [userId, dispatch, jwt]);

    useEffect(() => {
        setLoading(true);
        dispatch(getUser(jwt))
            .then((data) => {
                setUserId(data.result.id);
                dispatch(getAllCartItems(data.result.id, jwt));
            })
            .catch((error) => console.error('Error getting user:', error))
            .finally(() => setLoading(false));
    }, [dispatch, jwt]);

    useEffect(() => {
        if (cartItems) setLocalCart(cartItems);
    }, [cartItems]);

    const handleQuantityChange = (item, change) => {
        const newQuantity = item.quantity + change;

        if (newQuantity <= 0) {
            handleRemoveItem(item);
        } else if (newQuantity <= item.product.stock) {
            dispatch(updateCartItem(userId, item.id, { quantity: newQuantity }, jwt))
                .then(() => {
                    setLocalCart(prevCart =>
                        prevCart.map(cartItem =>
                            cartItem.id === item.id
                                ? { ...cartItem, quantity: newQuantity }
                                : cartItem
                        )
                    );
                });
        }
    };

    const handleRemoveItem = (item) => {
        dispatch(removeCartItem(userId, item.id, jwt))
            .then(() => {
                setLocalCart(prevCart => prevCart.filter(cartItem => cartItem.id !== item.id));
            })
            .catch((error) => console.error('Error removing item:', error));
    };

    const newTotalPrice = localCart.reduce((total, item) => {
        if (item.deleted) return total;
        const originalPrice = item.product.unitSellPrice || 0;
        const discount = item.product.discount || 0;
        return total + (originalPrice * (1 - discount) * item.quantity);
    }, 0);

    const totalItems = new Set(
        localCart
            .filter(item => !item.deleted)
            .map(item => item.id)
    ).size;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px', color: '#019376' }}>
                {loading ? 'Loading...' : `${totalItems} Items`}
            </DialogTitle>
            <DialogContent>
                {loading ? (
                    <Typography>Loading cart items...</Typography>
                ) : (
                    <List>
                        {localCart.map((item) => (
                            !item.deleted && (
                                <div key={item.cartItemId || item.id}>
                                    <ListItem sx={{ display: 'flex', alignItems: 'center', padding: '16px 0', justifyContent: 'space-between' }}>
                                        {/* Quantity Control and Item Details */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '60px', justifyContent: 'space-between' }}>
                                            <IconButton onClick={() => handleQuantityChange(item, -1)} size="small">
                                                <RemoveIcon />
                                            </IconButton>
                                            <Typography>{item.quantity}</Typography>
                                            <IconButton onClick={() => handleQuantityChange(item, 1)} size="small" disabled={item.quantity >= item.product.stock}>
                                                <AddIcon />
                                            </IconButton>
                                        </Box>
                                        <Avatar alt={item.product.pictureUrl2} src={item.product.pictureUrl} sx={{ width: 48, height: 48, marginRight: 2 }} />
                                        <Box sx={{ flexGrow: 1, paddingLeft: '16px' }}>
                                            <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>{item.product.productName}</Typography>
                                            <Typography sx={{ color: '#019376', fontWeight: 'bold' }}>${((item.product.unitSellPrice * (1 - item.product.discount)).toFixed(2))}</Typography>
                                        </Box>
                                        <Typography sx={{ fontWeight: 'bold', marginRight: 2 }}>
                                            ${((item.product.unitSellPrice * (1 - item.product.discount)) * item.quantity).toFixed(2)}
                                        </Typography>
                                        <IconButton onClick={() => handleRemoveItem(item)} size="small">
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                    <Divider />
                                </div>
                            )
                        ))}
                        <ListItem>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '20px', color: '#333', textAlign: 'right', flexGrow: 1 }}>
                                Total: ${newTotalPrice.toFixed(2)}
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Button variant="contained" fullWidth sx={{ backgroundColor: '#019376', borderRadius: '24px', padding: '12px 0', fontWeight: 'bold', fontSize: '16px' }}>
                                Checkout
                                <Typography variant="body1" sx={{ color: '#fff', fontWeight: 'bold', marginLeft: '100px' }}>${newTotalPrice.toFixed(2)}</Typography>
                            </Button>
                        </ListItem>
                    </List>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CartModal;
