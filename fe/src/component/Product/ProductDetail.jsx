import React from 'react';
import { Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductDetail = () => {
    const originalPrice = 2.00;
    const discountPrice = 1.60;
    const productDescription = "Delicious apples freshly picked from the farm. Perfect for snacks or meals.";

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 5, borderRadius: 1, boxShadow: 2 }}>
            <CardMedia
                component="img"
                height="300"
                image="https://pickbazar-react-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F1%2FApples.jpg&w=1920&q=75"
                alt="Apples"
            />
            <CardContent>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                    Apples
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                    Original Price: ${originalPrice.toFixed(2)}
                </Typography>
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
                >
                    <AddShoppingCartIcon sx={{ marginRight: 1 }} />
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductDetail;
