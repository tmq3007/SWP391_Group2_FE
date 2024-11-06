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
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const [cart, setCart] = useState(null);
    const [userId, setUserId] = useState(null);
    const [localCart, setLocalCart] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const [openWarning, setOpenWarning] = useState(false);
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false); // New state for delete confirmation dialog
    const [itemToDelete, setItemToDelete] = useState(null); // Item to be deleted
    const navigate = useNavigate();

    const handleCloseWarning = () => {
        setOpenWarning(false);
    };

    const handleCloseConfirmDelete = () => {
        setOpenConfirmDelete(false);
    };

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
            handleDeleteConfirmation(item);
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

    const handleDeleteConfirmation = (item) => {
        setItemToDelete(item); // Set the item to delete
        setOpenConfirmDelete(true); // Open the confirmation dialog
    };

    const confirmDeleteItem = () => {
        dispatch(removeCartItem(userId, itemToDelete.id, jwt))
            .then(() => {
                setLocalCart(prevCart => prevCart.filter(cartItem => cartItem.id !== itemToDelete.id));
                const newSelectedItems = { ...selectedItems };
                delete newSelectedItems[itemToDelete.id];
                setSelectedItems(newSelectedItems);
                setOpenConfirmDelete(false); // Close the dialog after deletion
            })
            .catch((error) => console.error('Error removing item:', error));
    };

    const handleToggleSelect = (itemId) => {
        setSelectedItems(prev => ({
            ...prev,
            [itemId]: !prev[itemId]
        }));
    };

    const getSelectedItems = () => {
        return localCart.filter(item => selectedItems[item.id]);
    };

    const handleCheckout = () => {
        const selectedItemsList = getSelectedItems();
        if (selectedItemsList.length === 0) {
            setOpenWarning(true);
        } else {
            navigate('/my-payment', { state: { selectedItems: selectedItemsList } });
        }
    };

    const newTotalPrice = localCart.reduce((total, item) => {
        if (item.deleted) return total;
        const originalPrice = item.product.unitSellPrice || 0;
        const discount = item.product.discount || 0;
        return total + (originalPrice * (1 - discount) * item.quantity);
    }, 0);

    const selectedTotalPrice = localCart.reduce((total, item) => {
        if (item.deleted || !selectedItems[item.id]) return total;
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
            <Box sx={{ display: 'flex', maxWidth: '1000px', margin: '0 auto' }}>
                <List sx={{ flex: 1, marginRight: 2, border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: 2, maxHeight: '350px', overflowY: 'auto', }}>
                    {localCart.map((item) => (
                        !item.deleted && (
                            <div key={item.cartItemId || item.id}>
                                <ListItem sx={{ display: 'flex', alignItems: 'center', padding: '16px 20px' }}>
                                    <Checkbox
                                        checked={!!selectedItems[item.id]}
                                        onChange={() => handleToggleSelect(item.id)}
                                        sx={{
                                            color: '#019376',
                                            '&.Mui-checked': {
                                                color: '#019376',
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
                                    <IconButton onClick={() => handleDeleteConfirmation(item)} size="small">
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItem>
                                <Divider sx={{ marginY: '8px' }} />
                            </div>
                        )
                    ))}
                </List>

                <Box sx={{ width: '300px', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '20px', color: '#333', marginBottom: 2 }}>
                        Order Summary
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        Total Items: {localCart.length}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        Total Price: ${newTotalPrice.toFixed(2)}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        Selected Total Price: ${selectedTotalPrice.toFixed(2)}
                    </Typography>
                    <Button onClick={handleCheckout} variant="contained" fullWidth sx={{ backgroundColor: '#019376', borderRadius: '24px', padding: '12px 0', fontWeight: 'bold', fontSize: '16px', marginBottom: 2 }}>
                        Checkout
                    </Button>
                    <Button
                        onClick={() => navigate("/")}
                        variant="outlined"
                        fullWidth
                        sx={{ borderColor: '#019376', color: '#019376', borderRadius: '24px', padding: '12px 0', fontWeight: 'bold', fontSize: '16px' }}
                    >
                        Continue Shopping
                    </Button>
                </Box>
            </Box>

            <Dialog open={openWarning} onClose={handleCloseWarning}>
                <DialogTitle>Warning</DialogTitle>
                <DialogContent>
                    <Typography>Please select at least one item to proceed with checkout.</Typography>
                </DialogContent>
                <Button onClick={handleCloseWarning} color="primary">
                    Close
                </Button>
            </Dialog>

            {/* Confirmation Dialog for Delete */}
            <Dialog open={openConfirmDelete} onClose={handleCloseConfirmDelete}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this item from your cart?</Typography>
                </DialogContent>
                <Button onClick={confirmDeleteItem} color="error">
                    Yes, Delete
                </Button>
                <Button onClick={handleCloseConfirmDelete} color="primary">
                    Cancel
                </Button>
            </Dialog>
        </div>
    );
};

export default Cart;
