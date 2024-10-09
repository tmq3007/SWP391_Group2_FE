import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProductDetail from './ProductDetail';
import { useNavigate } from 'react-router-dom';
import '../../style/ProductCard.css';

const ProductCard = ({ item, addToCart, addToWishlist }) => {
    const originalPrice = item.unitSellPrice || 0;
    const discount = item.discount * 100 || 0;
    const discountPrice = originalPrice * (1 - discount / 100);
    const discountPercentage = Math.round(discount);

    const [isFavorite, setIsFavorite] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [quantity, setQuantity] = React.useState(1);

    const navigate = useNavigate();

    const handleFavoriteToggle = () => {
        setIsFavorite((prev) => !prev);
    };

    const handleProductClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        // Optionally navigate if needed; comment out if not desired
        // navigate('/');
    };

    const handleAddToCart = () => {
        if (quantity > 0) {
            const buyUnit = item.measurementUnit; // Get measurement unit from item
            addToCart(buyUnit, quantity,item ); // Pass the item, quantity, and measurement unit to addToCart
            setQuantity(1); // Reset quantity to 1 after adding to cart
        }
    };

    return (
        <>
            <Card className="product-card">
                <CardMedia
                    component="img"
                    height="140"
                    image={item.pictureUrl}
                    alt={item.productName}
                    onClick={handleProductClick}
                    className="product-image"
                />
                <CardContent>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                        {item.productName}
                        {discount > 0 && <span className="discount-badge">Sale {discountPercentage}%</span>}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {item.measurementUnit} kg
                    </Typography>
                    {discount > 0 && (
                        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                            ${originalPrice.toFixed(2)}
                        </Typography>
                    )}
                    <div className="product-price">
                        <Typography variant="h6" component="div" sx={{ color: "#019376", fontWeight: 'bold', marginBottom: 2, marginLeft: 0.5 }}>
                            ${discountPrice.toFixed(2)}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleFavoriteToggle}
                            className={`favorite-button ${isFavorite ? 'active' : ''}`}
                        >
                            {isFavorite ? <FavoriteIcon sx={{ color: '#019376' }} /> : <FavoriteBorderIcon />}
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleAddToCart} // Call handleAddToCart when clicked
                            className="cart-button"
                        >
                            <AddShoppingCartIcon sx={{ color: '#019376' }} />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Product Detail Dialog */}
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
