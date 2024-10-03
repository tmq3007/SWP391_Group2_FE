import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProductDetail from './ProductDetail';
import '../../style/ProductCard.css';

const ProductCard = ({ item }) => {
    const originalPrice = item.unitSellPrice || 0;
    const discount = item.discount || 0; // Nhận giá trị giảm giá từ item
    const discountPrice = originalPrice * (1 - discount / 100); // Tính giá sau khi giảm
    const discountPercentage = Math.round(discount); // Phần trăm giảm giá (nếu có)

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
                image={item.pictureUrl} // Thay thế bằng URL ảnh từ item
                alt={item.name}
                onClick={handleProductClick}
                className="product-image"
            />
            <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                    {item.name}
                    {discount > 0 && <span className="discount-badge">Sale {discountPercentage}%</span>} {/* Hiển thị badge giảm giá nếu có */}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {item.weight} lb
                </Typography>
                {discount > 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                        ${originalPrice.toFixed(2)}
                    </Typography>
                )}
                <div className="product-price">
                    <Typography variant="h6" component="div" sx={{ color: "#019376", fontWeight: 'bold', marginBottom: 2, marginLeft: 0.5 }}>
                        ${discountPrice.toFixed(2)} {/* Hiển thị giá sau giảm */}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleFavoriteToggle}
                        className={`favorite-button ${isFavorite ? 'active' : ''}`}
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
                    <ProductDetail item={item} /> {/* Truyền item vào ProductDetail */}
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default ProductCard;
