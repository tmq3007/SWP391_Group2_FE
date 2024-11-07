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
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const navigate = useNavigate();

    // Hàm xử lý chọn tất cả checkbox
    const handleSelectAll = () => {
        const newSelectedItems = {};
        localCart.forEach(item => {
            if (!item.deleted) {
                newSelectedItems[item.id] = true;
            }
        });
        setSelectedItems(newSelectedItems);
    };

    // Hàm xử lý bỏ chọn tất cả checkbox
    const handleDeselectAll = () => {
        setSelectedItems({});
    };
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
        setItemToDelete(item);
        setOpenConfirmDelete(true);
    };

    const confirmDeleteItem = () => {
        dispatch(removeCartItem(userId, itemToDelete.id, jwt))
            .then(() => {
                setLocalCart(prevCart => prevCart.filter(cartItem => cartItem.id !== itemToDelete.id));
                const newSelectedItems = { ...selectedItems };
                delete newSelectedItems[itemToDelete.id];
                setSelectedItems(newSelectedItems);
                setOpenConfirmDelete(false);
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

                <List sx={{ flex: 1, marginRight: 2, border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: 2, maxHeight: '450px', overflowY: 'auto', }}>
                    <Button
                        onClick={handleSelectAll}
                        variant="outlined"
                        sx={{
                            borderColor: '#019376',
                            color: '#019376',
                            borderRadius: '24px',

                            fontWeight: 'bold',
                            marginLeft:'30px',
                            fontSize: '12px',
                            '&:hover': {
                                backgroundColor: '#019376',
                                color: '#fff',
                                borderColor: '#019376'
                            },
                        }}
                    >
                        Select All
                    </Button>

                    {localCart.length === 0 ? (
                        <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '20px', color: '#999' }}>
                            Your cart is empty
                        </Typography>
                    ) : (
                        localCart.map((item) => (
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
                                            <Typography sx={{ color: '#019376', fontWeight: 'bold' }}>{((item.product.unitSellPrice * (1 - item.product.discount)).toFixed(0))} VND</Typography>
                                        </Box>
                                        <Typography sx={{ fontWeight: 'bold', marginRight: 2 }}>
                                            {((item.product.unitSellPrice * (1 - item.product.discount)) * item.quantity).toFixed(0)} VND
                                        </Typography>
                                        <IconButton onClick={() => handleDeleteConfirmation(item)} size="small">
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                    <Divider sx={{ marginY: '8px' }} />
                                </div>
                            )
                        ))
                    )}
                </List>

                <Box sx={{ width: '300px', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '20px', color: '#333', marginBottom: 2 }}>
                        Order Summary
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        Total Items: {localCart.length}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        Total Price: {newTotalPrice.toFixed(0)} VND
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        Selected Total Price: {selectedTotalPrice.toFixed(0)} VND
                    </Typography>
                    <Button onClick={handleCheckout} variant="outlined" fullWidth sx={{ borderColor: '#019376', color: '#019376', borderRadius: '24px', padding: '12px 0',
                        fontWeight: 'bold', fontSize: '16px',marginTop:'10px',
                        '&:hover': {
                            backgroundColor: '#019376',
                            color: '#fff',
                            borderColor: '#019376'
                        },
                    }}>
                        Checkout
                    </Button>
                    <Button
                        onClick={() => navigate("/")}
                        variant="outlined"
                        fullWidth

                        sx={{ borderColor: '#019376', color: '#019376', borderRadius: '24px', padding: '12px 0',
                            fontWeight: 'bold', fontSize: '16px',marginTop:'10px',
                            '&:hover': {
                                backgroundColor: '#019376',
                                color: '#fff',
                                borderColor: '#019376'
                            },
                        }}
                    >
                        Continue Shopping
                    </Button>
                </Box>
            </Box>

            <Dialog open={openWarning} onClose={handleCloseWarning} sx={{ "& .MuiDialog-paper": { borderRadius: "12px", padding: "20px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" } }}>
                <DialogTitle sx={{ fontSize: "18px", fontWeight: "bold", color: "#019376", textAlign: "center" }}>Warning</DialogTitle>
                <DialogContent sx={{ textAlign: "center", color: "#333" }}>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        Please select items before checking out.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <Button onClick={handleCloseWarning} color="primary" sx={{
                            backgroundColor: "#019376",
                            color: "#fff",
                            padding: "10px 20px",
                            borderRadius: "24px",
                            '&:hover': { backgroundColor: "#017c65" },
                        }}>
                            Close
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

            <Dialog open={openConfirmDelete} onClose={handleCloseConfirmDelete} sx={{ "& .MuiDialog-paper": { borderRadius: "12px", padding: "20px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" } }}>
                <DialogTitle sx={{ fontSize: "18px", fontWeight: "bold", color: "#e74c3c", textAlign: "center" }}>Confirm Deletion</DialogTitle>
                <DialogContent sx={{ textAlign: "center", color: "#333" }}>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        Are you sure you want to delete this item from the cart?
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <Button onClick={handleCloseConfirmDelete} color="primary" sx={{
                            backgroundColor: "#ccc",
                            color: "#333",
                            padding: "10px 20px",
                            borderRadius: "24px",
                            marginRight: "10px",
                            '&:hover': { backgroundColor: "#b0b0b0" },
                        }}>
                            Cancel
                        </Button>
                        <Button onClick={confirmDeleteItem} color="secondary" sx={{
                            backgroundColor: "#e74c3c",
                            color: "#fff",
                            padding: "10px 20px",
                            borderRadius: "24px",
                            '&:hover': { backgroundColor: "#c0392b" },
                        }}>
                            Delete
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default Cart;
