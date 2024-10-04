import React from 'react';
import { Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductDetail = ({ item, addToCart, onClose }) => {
    const originalPrice = item.unitSellPrice || 0;  // Get original price from item
    const discount = item.discount * 100 || 0;      // Get discount from item
    const discountPrice = originalPrice * (1 - discount / 100);  // Calculate discounted price
    const productDescription = item.description || "No description available.";  // Product description

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 5, borderRadius: 1, boxShadow: 2 }}>
            <CardMedia
                component="img"
                height="300"
                image={item.pictureUrl}  // Use image from item
                alt={item.productName}
            />
            <CardContent>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                    {item.productName}
                </Typography>
                {discount > 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                        Original Price: ${originalPrice.toFixed(2)}
                    </Typography>
                )}
                <Typography variant="h5" component="div" sx={{ color: "#019376", fontWeight: 'bold', marginBottom: 2 }}>
                    Discount Price: ${discountPrice.toFixed(2)}
                </Typography>
                <Typography variant="body1" component="div" sx={{ marginBottom: 2 }}>
                    {productDescription}
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#019376",
                        borderRadius: '20px',
                        padding: '10px 20px',
                    }}
                    onClick={() => {
                        addToCart(item);  // Logic to add to cart
                        // Do not close the modal here
                    }}
                >
                    <AddShoppingCartIcon sx={{ marginRight: 1 }} />
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductDetail;
