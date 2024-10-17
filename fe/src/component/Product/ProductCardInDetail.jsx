import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close'; // Import Close icon
import ProductDetail from './ProductDetail';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../style/ProductCard.css';

const ProductCardInDetail = ({ item, addToCart, addToWishlist }) => {
    const originalPrice = item.unitSellPrice || 0;
    const discount = item.discount * 100 || 0; // Get discount value from item
    const discountPrice = originalPrice * (1 - discount / 100); // Calculate discounted price
    const discountPercentage = Math.round(discount); // Discount percentage

    const [isFavorite, setIsFavorite] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [backdropStyle, setBackdropStyle] = React.useState({
        backgroundColor: 'rgba(0, 0, 0, 0)',
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleFavoriteToggle = () => {
        setIsFavorite((prev) => !prev);
    };

    const handleProductClick = () => {
        setOpen(true);  // Open the product detail dialog
        handleBackground();
    };

    const handleClose = () => {
        setOpen(false);  // Close the product detail dialog
        navigate(''); // Navigate to home page
    };

    const handleBackground = () => {
        setBackdropStyle({
            backgroundColor: 'rgba(0, 0, 0, 0)',
        });
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
                        {/* Your buttons here if needed */}
                    </div>
                </CardContent>
            </Card>

            {/* Product Detail Dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                disableScrollLock={true} // Prevent background scroll
                BackdropProps={{
                    style: backdropStyle, // Use the state for backdrop style
                }}
            >
                <DialogTitle>
                    Product Details
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

export default ProductCardInDetail;
