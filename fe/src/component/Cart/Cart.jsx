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
    Box,
    Checkbox
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { updateCartItem, removeCartItem, getAllCartItems, findCart } from '../State/Cart/Action';
import { getUser } from "../State/Authentication/Action";
import { NavbarHomePage } from "../Navbar/NavbarHomePage";

const Cart = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const [cart, setCart] = useState(null);
    const [userId, setUserId] = useState(null);
    const [localCart, setLocalCart] = useState([]);
    const [selectedItems, setSelectedItems] = useState({}); // To track selected items

    useEffect(() => {
        if (cart && cart.result) {
            setLocalCart(cart.result.cartItems || []);
        }
    }, [cart]);

    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt)).then((data) => {
                setUserId(data.result.id);
            }).catch((error) => {
                console.error('Error getting user:', error);
            });
        }
    }, [dispatch, jwt]);

    useEffect(() => {
        if (userId && jwt) {
            dispatch(findCart(userId, jwt))
                .then((data) => {
                    setCart(data);
                })
                .catch((error) => {
                    console.error('Error fetching cart:', error);
                });
        }
    }, [dispatch, userId, jwt]);

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
                // Remove from selectedItems as well
                const newSelectedItems = { ...selectedItems };
                delete newSelectedItems[item.id];
                setSelectedItems(newSelectedItems);
            })
            .catch((error) => console.error('Error removing item:', error));
    };

    const handleToggleSelect = (itemId) => {
        setSelectedItems(prev => ({
            ...prev,
            [itemId]: !prev[itemId] // Toggle selection state
        }));
    };

    const newTotalPrice = localCart.reduce((total, item) => {
        if (item.deleted) return total;
        const originalPrice = item.product.unitSellPrice || 0;
        const discount = item.product.discount || 0;
        return total + (originalPrice * (1 - discount) * item.quantity);
    }, 0);

    const selectedTotalPrice = localCart.reduce((total, item) => {
        if (item.deleted || !selectedItems[item.id]) return total; // Only count selected items
        const originalPrice = item.product.unitSellPrice || 0;
        const discount = item.product.discount || 0;
        return total + (originalPrice * (1 - discount) * item.quantity);
    }, 0);

    return (
        <div>
            <NavbarHomePage />
            <Typography variant="h4" sx={{ textAlign: 'center', margin: '20px 0', color: '#333', marginTop: "100px" }}>
                Your Shopping Cart
            </Typography>
            <List sx={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: 2 }}>
                {localCart.map((item) => (
                    !item.deleted && (
                        <div key={item.cartItemId || item.id}>
                            <ListItem sx={{ display: 'flex', alignItems: 'center', padding: '16px 20px' }}>
                                <Checkbox
                                    checked={!!selectedItems[item.id]}
                                    onChange={() => handleToggleSelect(item.id)}
                                    sx={{
                                        color: '#019376', // Màu mặc định của checkbox
                                        '&.Mui-checked': {
                                            color: '#019376', // Màu khi checkbox được chọn
                                        },
                                    }}
                                />
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '60px', justifyContent: 'space-between' }}>
                                    <IconButton onClick={() => handleQuantityChange(item, -1)} size="small">
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography>{item.quantity}</Typography>
                                    <IconButton onClick={() => handleQuantityChange(item, 1)} size="small" disabled={item.quantity >= item.product.stock}>
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                                <Avatar alt={item.product.pictureUrl2} src={item.product.pictureUrl} sx={{ width: 48, height: 48, marginRight: 2, marginLeft: 4 }} />
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
                            <Divider sx={{ marginY: '8px' }} />
                        </div>
                    )
                ))}
                <ListItem sx={{ padding: '16px 20px' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '20px', color: '#333', textAlign: 'right', flexGrow: 1 }}>
                        Total: ${newTotalPrice.toFixed(2)}
                    </Typography>
                </ListItem>
                <ListItem sx={{ padding: '16px 20px' }}>
                    <Button variant="contained" fullWidth sx={{ backgroundColor: '#019376', borderRadius: '24px', padding: '12px 0', fontWeight: 'bold', fontSize: '16px' }}>
                        Checkout
                        <Typography variant="body1" sx={{ color: '#fff', fontWeight: 'bold', marginLeft: '100px' }}>${selectedTotalPrice.toFixed(2)}</Typography>
                    </Button>
                </ListItem>
            </List>
        </div>
    );
};

export default Cart;