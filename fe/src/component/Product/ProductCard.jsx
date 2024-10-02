import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Badge, Dialog, DialogContent, DialogTitle } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProductDetail from './ProductDetail'; // Import component ProductDetail
import '../../style/ProductCard.css';

const ProductCard = () => {
    const originalPrice = 2.00;
    const discountPrice = 1.60;
    const discountPercentage = Math.round(((originalPrice - discountPrice) / originalPrice) * 100);

    const [isFavorite, setIsFavorite] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleFavoriteToggle = () => {
        setIsFavorite((prev) => !prev);
    };

    const handleProductClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card className="product-card">

            <CardMedia
                component="img"
                height="140"
                image="https://pickbazar-react-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F1%2FApples.jpg&w=1920&q=75"
                alt="Apples"
                onClick={handleProductClick}
                className="product-image"
            />
            <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    Apples
                    <span className="discount-badge">{discountPercentage}%</span>
                />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    1 lb
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                    ${originalPrice.toFixed(2)}
                </Typography>
                <div className="product-price">
                    <Typography variant="h6" component="div" sx={{ color: "#019376", fontWeight: 'semibold' }}>
                        ${discountPrice.toFixed(2)}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleFavoriteToggle}
                        className="favorite-button"
                    >
                        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </Button>
                    <Button
                        variant="contained"
                        className="cart-button"
                    >
                        <AddShoppingCartIcon />
                    </Button>
                </div>
            </CardContent>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Product Details</DialogTitle>
                <DialogContent>
                    <ProductDetail />
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default ProductCard;
