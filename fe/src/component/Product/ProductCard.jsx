import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, TextField, IconButton, Box } from '@mui/material';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProductDetail from "./ProductDetail";
import CloseIcon from "@mui/icons-material/Close";

const ProductCard = ({ item, addToCart }) => {
    const originalPrice = item.unitSellPrice || 0;
    const discount = item.discount * 100 || 0;
    const discountPrice = originalPrice * (1 - discount / 100);
    const discountPercentage = Math.round(discount);

    const [isFavorite, setIsFavorite] = React.useState(false);
    const [isAddingToCart, setIsAddingToCart] = React.useState(false);
    const [quantity, setQuantity] = React.useState(1);
    const [open, setOpen] = React.useState(false);

    const handleFavoriteToggle = () => {
        setIsFavorite((prev) => !prev);
    };

    const handleAddToCartClick = () => {
        setIsAddingToCart(true);
    };

    const handleConfirmAddToCart = () => {
        if (quantity > 0) {
            // Pass the quantity to addToCart function
            addToCart(item.measurementUnit, quantity, item);
            setIsAddingToCart(false);
            setQuantity(1); // Reset quantity after adding to cart
        } else {
            setIsAddingToCart(false); // Close the modal if quantity is invalid
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
        const newQuantity = Math.max(0, e.target.value); // Ensure quantity cannot be negative
        setQuantity(newQuantity);
        if (newQuantity === 0) {
            setIsAddingToCart(false); // Optionally close add to cart modal if quantity is zero
            setQuantity(1);
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
                                inputProps={{ min: 0 }} // Prevent negative input
                            />
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button
                                    variant="contained"
                                    onClick={handleConfirmAddToCart}
                                    fullWidth
                                >
                                    Confirm
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={handleCancelAddToCart}
                                    fullWidth
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
                                    transition: 'background-color 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(1, 147, 118, 0.2)',
                                    }
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
                    <ProductDetail item={item} addToCart={addToCart} onClose={handleClose} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProductCard;
