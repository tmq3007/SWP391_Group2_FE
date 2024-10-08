import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProductDetail from './ProductDetail';
import '../../style/ProductCard.css';

const ProductCard = ({ item, addToCart, addToWishlist }) => {
    const originalPrice = item.unitSellPrice || 0;
    const discount = item.discount * 100 || 0; // Get discount value from item
    const discountPrice = originalPrice * (1 - discount / 100); // Calculate discounted price
    const discountPercentage = Math.round(discount); // Discount percentage

    const [isFavorite, setIsFavorite] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleFavoriteToggle = () => {
        setIsFavorite((prev) => !prev);
    };

    const handleProductClick = () => {
        setOpen(true);  // Open the product detail dialog
    };

    const handleClose = () => {
        setOpen(false);  // Close the product detail dialog
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
                            {isFavorite ? <FavoriteIcon sx={{ color: '#019376' }}/> : <FavoriteBorderIcon />}
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => addToCart(item)}  // Add to cart functionality
                            className="cart-button"
                        >
                            <AddShoppingCartIcon sx={{ color: '#019376' }}/>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Product Detail Dialog */}
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Product Details</DialogTitle>
                <DialogContent>
                    <ProductDetail item={item} addToCart={addToCart} onClose={handleClose} /> {/* Pass item and addToCart to ProductDetail */}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProductCard;