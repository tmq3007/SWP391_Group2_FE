import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, TextField, IconButton, Box } from '@mui/material';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProductDetail from "./ProductDetail";
import CloseIcon from "@mui/icons-material/Close";

const ProductCard = ({ cart, item, addToCart }) => {
    const originalPrice = item.unitSellPrice || 0;
    const discount = item.discount * 100 || 0;
    const discountPrice = originalPrice * (1 - discount / 100);
    const discountPercentage = Math.round(discount);

    const [isFavorite, setIsFavorite] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const stock = item && item.productId
        ? item.stock - (cart.find(cartItem => cartItem.product.productId === item.productId)?.quantity || 0)
        : 0;
    const handleFavoriteToggle = () => {
        setIsFavorite((prev) => !prev);
    };

    const handleAddToCartClick = () => {
        setIsAddingToCart(true);
    };

    const handleConfirmAddToCart = () => {
        if (quantity > 0 && quantity <= stock) {
            addToCart(item.measurementUnit, quantity, item);
            setIsAddingToCart(false);
            setQuantity(1); // Reset quantity after adding to cart

            // Optionally, show a success message or toast notification
            //alert(`${item.productName} has been added to your cart!`);
        } else {
            alert('Please enter a valid quantity.'); // Show alert for invalid quantity
        }
    };

    const handleProductClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancelAddToCart = () => {
        setIsAddingToCart(false);
        setQuantity(1); // Reset quantity when canceling
    };

    const handleQuantityChange = (e) => {
        const newQuantity = e.target.value; // Lấy giá trị nhập vào từ input
        setQuantity(newQuantity); // Cập nhật state quantity với giá trị mới

        // Kiểm tra và hiển thị thông báo lỗi nếu cần
        if (newQuantity === '' || isNaN(newQuantity) || Number(newQuantity) < 1) {
            // Nếu không nhập gì, hoặc không phải là số, hoặc nhỏ hơn 1
            // Không cần phải làm gì, quantity sẽ vẫn là giá trị nhập vào
        } else if (Number(newQuantity) > stock) {
            // Nếu số lượng nhập vào lớn hơn số lượng trong kho
            //setQuantity(stock); // Cập nhật về giới hạn stock
        }
    };

    return (
        <>
            <Card sx={{
                maxWidth: 300,
                margin: 2,
                borderRadius: 2,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                position: 'relative',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
                }
            }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={item.pictureUrl}
                    alt={item.productName}
                    onClick={handleProductClick}
                    sx={{ borderRadius: '15px 15px 0 0', objectFit: 'cover', cursor: "pointer" }}
                />
                {discount > 0 && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            backgroundColor: '#ff4d4f',
                            color: 'white',
                            padding: '3px 8px',
                            borderRadius: 1,
                            fontSize: 12,
                        }}
                    >
                        Sale {discountPercentage}%
                    </Box>
                )}
                <CardContent>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
                        {item.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {item.measurementUnit} kg
                    </Typography>
                    {discount > 0 && (
                        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                            ${originalPrice.toFixed(2)}
                        </Typography>
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="h6" component="div" sx={{ color: "#019376", fontWeight: 'bold', mb: 2 }}>
                            ${discountPrice.toFixed(2)}
                        </Typography>
                    </Box>

                    {isAddingToCart ? (
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                label="Quantity"
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                fullWidth
                                margin="normal"
                                inputProps={{ min: 1, max: stock }} // Prevent negative input and limit to stock
                            />
                            {quantity < 1 && (
                                <Typography color="error" variant="body2">Quantity must be at least 1.</Typography>
                            )}
                            {quantity > stock && (
                                <Typography color="error" variant="body2">Quantity cannot exceed {stock}.</Typography>
                            )}
                            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                <Button
                                    variant="contained"
                                    onClick={handleConfirmAddToCart}
                                    fullWidth
                                    sx={{
                                        backgroundColor: '#019376', // Màu nền
                                        '&:hover': {
                                            backgroundColor: '#01755b', // Màu khi hover
                                        },
                                        borderRadius: 2, // Bo tròn
                                        fontWeight: 'bold', // Đậm chữ
                                        transition: 'background-color 0.3s ease',
                                    }}
                                >
                                    Confirm
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={handleCancelAddToCart}
                                    fullWidth
                                    sx={{
                                        borderColor: '#019376', // Màu viền
                                        color: '#019376', // Màu chữ
                                        '&:hover': {
                                            borderColor: '#01755b', // Màu viền khi hover
                                            color: '#01755b', // Màu chữ khi hover
                                        },
                                        borderRadius: 2, // Bo tròn
                                        fontWeight: 'bold', // Đậm chữ
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Box>

                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2, textAlign: "center" }}>
                            <Button
                                variant="contained"
                                onClick={handleAddToCartClick}
                                sx={{
                                    flexGrow: 1,
                                    mr: 1,
                                    backgroundColor: '#019376', // Customize background color
                                    color: 'white', // Customize text color
                                    padding: '10px 15px', // Add padding
                                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', // Add shadow
                                    '&:hover': {
                                        backgroundColor: '#01755b', // Customize hover background color
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Adjust shadow on hover
                                    },
                                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                                    borderRadius: 2,
                                }}
                            >
                                <AddShoppingCartIcon sx={{ mr: 1 }} />
                                Add to Cart
                            </Button>
                            <IconButton onClick={handleFavoriteToggle} sx={{
                                backgroundColor: isFavorite ? 'rgba(1, 147, 118, 0.1)' : 'transparent',
                                transition: 'background-color 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(1, 147, 118, 0.2)',
                                }
                            }}>
                                {isFavorite ? <FavoriteIcon sx={{ color: '#019376' }} /> : <FavoriteBorderIcon />}
                            </IconButton>
                        </Box>
                    )}
                </CardContent>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                disableScrollLock={true}
            >
                <DialogTitle>
                    <span>Product Details</span>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <ProductDetail cart={cart} item={item} addToCart={addToCart} onClose={handleClose} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProductCard;
