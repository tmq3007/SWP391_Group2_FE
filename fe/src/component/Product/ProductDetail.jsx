import React from 'react';
import { Typography, Button, Box, Chip } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';

const ProductDetail = ({ item, addToCart }) => {
    const originalPrice = item.unitSellPrice || 0;  // Giá gốc
    const discount = item.discount * 100 || 0;      // Giảm giá (phần trăm)
    const discountPrice = originalPrice * (1 - discount / 100);  // Tính giá giảm
    const productDescription = item.description || "No description available.";  // Mô tả sản phẩm

    // Gán cứng dữ liệu cho category và shop
    const categories = [item.category.categoryName];
    const shop = item.shop.shopName;
    const piecesAvailable = item.stock;

    // Tính toán trung bình rating từ mảng review
    const reviews = item.reviews || [];
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(2) : '';

    return (
        <section className="flex flex-col md:flex-row p-8 space-y-6 md:space-y-0 md:space-x-6">
            {/* Phần bên trái: Hình ảnh sản phẩm */}
            <div className="md:w-2/5 bg-white p-6 flex flex-col items-start rounded-lg">
                <img
                    src={item.pictureUrl}
                    alt={item.productName}
                    className="max-w-full h-auto rounded-lg mb-4"
                />

                {/* Phần bên dưới: Danh mục và cửa hàng */}
                <Box className="w-full text-left">
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                        Categories:
                    </Typography>
                    <Box display="flex" gap={1} mt={1}>
                        {categories.map((category, index) => (
                            <Chip key={index} label={category} variant="outlined" />
                        ))}
                    </Box>

                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', marginTop: 2 }}>
                        Sellers:
                    </Typography>
                    <Box display="flex" gap={1} mt={1}>
                        <Chip label={shop} variant="outlined" />
                    </Box>
                </Box>
            </div>

            {/* Phần bên phải: Thông tin chi tiết sản phẩm */}
            <div className="md:w-3/5 bg-white p-8 rounded-lg flex flex-col justify-start space-y-6">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                        {item.productName}
                    </Typography>

                    {/* Phần hiển thị sao đánh giá */}
                    <Box display="flex" alignItems="center">
                        <StarIcon sx={{ color: '#FFD700', fontSize: 30 }} />
                        <Typography variant="h6" component="div" sx={{ marginLeft: 1, fontWeight: 'small' }}>
                            {averageRating}
                        </Typography>
                    </Box>
                </Box>

                <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.6 }}>
                    {productDescription}
                </Typography>

                {discount > 0 && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textDecoration: 'line-through', fontSize: '1rem' }}
                    >
                        Original Price: ${originalPrice.toFixed(2)}
                    </Typography>
                )}

                <Typography variant="h4" sx={{ color: "#019376", fontWeight: 'bold' }}>
                    ${discountPrice.toFixed(2)}
                </Typography>

                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#019376",
                            borderRadius: '30px',
                            padding: '12px 30px',
                            fontSize: '1.1rem',
                            '&:hover': {
                                backgroundColor: "#017c65",
                            }
                        }}
                        onClick={() => addToCart(item)}  // Thêm sản phẩm vào giỏ hàng
                    >
                        <AddShoppingCartIcon sx={{ marginRight: 1 }} />
                        Add to Cart
                    </Button>

                    <Typography variant="body2" sx={{ color: '#888' }}>
                        {piecesAvailable} pieces available
                    </Typography>
                </Box>
            </div>
        </section>
    );
};

export default ProductDetail;
