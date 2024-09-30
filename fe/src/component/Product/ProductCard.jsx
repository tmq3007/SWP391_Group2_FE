import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Badge } from '@mui/material';

const ProductCard = () => {
    const originalPrice = 2.00;
    const discountPrice = 1.60;
    const discountPercentage = Math.round(((originalPrice - discountPrice) / originalPrice) * 100);

    return (
        <Card sx={{ maxWidth: 275, borderRadius: 2, boxShadow: 3, position: 'relative' }}>
            <Badge
                badgeContent={`${discountPercentage}%`}
                color="primary"
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{ position: 'absolute', top: 10, right: 10 }}
            />
            <CardMedia
                component="img"
                height="140"
                image="https://pickbazar-react-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F1%2FApples.jpg&w=1920&q=75" // Replace with the URL to your apple image
                alt="Apples"
            />
            <CardContent>
                <Typography variant="h6" component="div">
                    Apples
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    1 lb
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                    ${originalPrice.toFixed(2)}
                </Typography>
                <Typography variant="h6" component="div">
                    ${discountPrice.toFixed(2)}
                </Typography>
            </CardContent>
            <Button variant="contained" color="success" sx={{ margin: 2 }}>
                Cart
            </Button>
        </Card>
    );
};

export default ProductCard;
