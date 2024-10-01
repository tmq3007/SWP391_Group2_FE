import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Badge } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ProductCard = () => {
    const originalPrice = 2.00;
    const discountPrice = 1.60;
    const discountPercentage = Math.round(((originalPrice - discountPrice) / originalPrice) * 100);

    // State để theo dõi trạng thái yêu thích
    const [isFavorite, setIsFavorite] = React.useState(false);

    // Hàm xử lý khi bấm vào nút yêu thích
    const handleFavoriteToggle = () => {
        setIsFavorite((prev) => !prev); // Đảo ngược trạng thái yêu thích
    };

    return (
        <Card sx={{ maxWidth: 320, borderRadius: 1, boxShadow: 1, position: 'relative' }}>
            <Badge
                badgeContent={`${discountPercentage}%`}
                color="success"
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{
                    position: 'absolute',
                    top: 20,
                    right: 40,
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold'
                }}
            />
            <CardMedia
                component="img"
                height="140"
                image="https://pickbazar-react-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F1%2FApples.jpg&w=1920&q=75"
                alt="Apples"
            />
            <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    Apples
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    1 lb
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                    ${originalPrice.toFixed(2)}
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                    <Typography variant="h6" component="div" sx={{ color: "#019376", fontWeight: 'semibold' }}>
                        ${discountPrice.toFixed(2)}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleFavoriteToggle} // Gọi hàm khi bấm vào button
                        sx={{
                            color: "#019376",
                            borderRadius: '50px',
                            height: '40px',
                            padding: '0 20px',
                            right: -30,
                        }}
                    >
                        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />} {/* Hiển thị icon tùy theo trạng thái */}
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            color: "#019376",
                            borderRadius: '50px',
                            height: '40px',
                            padding: '0 20px',
                        }}
                    >
                        <AddShoppingCartIcon />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
