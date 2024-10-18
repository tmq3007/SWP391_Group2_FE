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

const CartModal = ({ open, onClose, cart }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        if (userId) {
            dispatch(getAllCartItems(userId, jwt));
        }
    }, [userId, dispatch, jwt]);

    useEffect(() => {
        dispatch(getUser(jwt))
            .then((data) => {
                setUserId(data.result.id);
                dispatch(getAllCartItems(data.result.id, jwt));
            })
            .catch((error) => console.error('Error getting user:', error));
    }, [dispatch, jwt]);

    const handleQuantityChange = (item, change) => {
        if (change < 0 && item.quantity === 1) {
            handleRemoveItem(item);
        } else {
            dispatch(updateCartItem(item.measurementUnit, change, item, jwt));
        }
    };

    const handleRemoveItem = (item) => {
        dispatch(removeCartItem(userId, item.id, jwt))
            .then(() => {
                // Cập nhật lại giỏ hàng sau khi xóa
                dispatch(getAllCartItems(userId, jwt));
            })
            .catch((error) => console.error('Error removing item:', error));
    };


    const newTotalPrice = cart.reduce((total, item) => {
        const originalPrice = item.product.unitSellPrice || 0;
        const discount = item.product.discount || 0;
        return total + (originalPrice * (1 - discount) * item.quantity);
    }, 0);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: { borderRadius: '16px', padding: '24px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }
            }}
        >
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px', color: '#019376' }}>
                {`${cart.length} Items`}
            </DialogTitle>
            <DialogContent>
                <List>
                    {cart.map((item) => (
                        <div key={item.cartItemId}>
                            <ListItem sx={{ display: 'flex', alignItems: 'center', padding: '16px 0', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '60px', justifyContent: 'space-between' }}>
                                    <IconButton
                                        onClick={() => handleQuantityChange(item.product, -1)}
                                        size="small"
                                        sx={{ '&:hover': { backgroundColor: '#01937620' } }}
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography>{item.quantity}</Typography>
                                    <IconButton
                                        onClick={() => handleQuantityChange(item, 1)}
                                        size="small"
                                        sx={{ '&:hover': { backgroundColor: '#01937620' } }}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Box>

                                <Avatar
                                    alt={item.product.pictureUrl2}
                                    src={item.product.pictureUrl}
                                    sx={{ width: 48, height: 48, marginRight: 2, marginLeft: 4, border: '1px solid #f0f0f0' }}
                                />

                                <Box sx={{ flexGrow: 1, paddingLeft: '16px' }}>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>{item.productName}</Typography>
                                    <Typography sx={{ color: '#019376', fontWeight: 'bold' }}>${(item.product.unitSellPrice * (1 - item.product.discount)).toFixed(2)}</Typography>
                                    <Typography variant="body2" color="textSecondary">{`${item.quantity} x ${(item.product.unitSellPrice * (1 - item.product.discount)).toFixed(2)}`}</Typography>
                                </Box>

                                <Typography sx={{ fontWeight: 'bold', marginRight: 2 }}>${((item.product.unitSellPrice * (1 - item.product.discount)) * item.quantity).toFixed(2)}</Typography>
                                <IconButton
                                    onClick={() => handleRemoveItem(item)}
                                    size="small"
                                    sx={{ '&:hover': { color: '#ff1744' }, marginLeft: 'auto' }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                            <Divider />
                        </div>
                    ))}

                    <ListItem>
                        <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '20px', color: '#333' }}>
                                Total: ${newTotalPrice.toFixed(2)}
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
                                padding: '12px 0',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                '&:hover': {
                                    backgroundColor: '#017f63',
                                },
                                alignItems:"center"
                            }}
                        >
                            Checkout
                            <Typography variant="body1" sx={{ color: '#fff', fontWeight: 'bold', marginLeft: '100px' }}>${newTotalPrice.toFixed(2)}</Typography>
                        </Button>
                    </ListItem>
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default CartModal;
