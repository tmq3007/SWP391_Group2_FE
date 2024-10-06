import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    IconButton,
    Dialog,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProductDetail from './ProductDetail';
import '../../style/ProductCard.css';

const ProductCard = ({ item, addToCart }) => {
    const originalPrice = item.unitSellPrice || 0;
    const discount = item.discount * 100 || 0;
    const discountPrice = originalPrice * (1 - discount / 100);
    const discountPercentage = Math.round(discount);

    const [isFavorite, setIsFavorite] = React.useState(false);
    const [isAddedToCart, setIsAddedToCart] = React.useState(false);
    const [quantity, setQuantity] = React.useState(1);
    const [open, setOpen] = React.useState(false);

    const handleFavoriteToggle = () => {
        setIsFavorite((prev) => !prev);
    };

    const handleAddToCartClick = () => {
        addToCart({ ...item, quantity }); // Gọi hàm addToCart với sản phẩm và số lượng
        setIsAddedToCart(true);
    };

    const handleQuantityChange = (type) => {
        if (type === 'increase') {
            setQuantity((prev) => prev + 1);
        } else if (type === 'decrease') {
            if (quantity > 1) {
                setQuantity((prev) => prev - 1);
            } else {
                // Nếu số lượng về 0, reset về trạng thái ban đầu
                setQuantity(1);
                setIsAddedToCart(false);
            }
        }
        // Cập nhật lại giỏ hàng mỗi khi số lượng thay đổi
        addToCart({ ...item, quantity: type === 'decrease' ? Math.max(quantity - 1, 1) : quantity });
    };

    const handleProductClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                        {discount > 0 && (
                            <span className="discount-badge">Sale {discountPercentage}%</span>
                        )}
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
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: '#019376', fontWeight: 'bold', marginBottom: 2, marginLeft: 0.5 }}
                        >
                            ${discountPrice.toFixed(2)}
                        </Typography>

                        <Button
                            variant="contained"
                            onClick={handleFavoriteToggle}
                            className={`favorite-button ${isFavorite ? 'active' : ''}`}
                        >
                            {isFavorite ? (
                                <FavoriteIcon sx={{ color: '#019376' }} />
                            ) : (
                                <FavoriteBorderIcon />
                            )}
                        </Button>

                        {!isAddedToCart ? (
                            <Button
                                variant="contained"
                                onClick={handleAddToCartClick}
                                className="cart-button"
                            >
                                <AddShoppingCartIcon sx={{ color: '#019376' }} />
                            </Button>
                        ) : (
                            <div className="quantity-selector" style={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton onClick={() => handleQuantityChange('decrease')} size="small">
                                    <RemoveIcon />
                                </IconButton>
                                <Typography variant="h6" sx={{ margin: '0 10px' }}>
                                    {quantity}
                                </Typography>
                                <IconButton onClick={() => handleQuantityChange('increase')} size="small">
                                    <AddIcon />
                                </IconButton>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Product Details</DialogTitle>
                <DialogContent>
                    <ProductDetail item={item} addToCart={addToCart} onClose={handleClose} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProductCard;
