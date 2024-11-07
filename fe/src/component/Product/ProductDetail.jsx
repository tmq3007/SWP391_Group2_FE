import React, { useEffect, useState } from 'react';
import { Typography, Button, Box, Chip, Divider, Snackbar, Alert } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProductsAction } from '../State/Product/Action';
import ProductCardInDetail from "./ProductCardInDetail";
import ProductCard from "./ProductCard";
import { getUser } from "../State/Authentication/Action";
import { findCart } from "../State/Cart/Action";

const ProductDetail = ({ cart, item, addToCart }) => {
    const dispatch = useDispatch();
    const { products } = useSelector(store => store.products);  // Access products from the store

    const originalPrice = item?.unitSellPrice || 0;
    const discount = item?.discount || 0;
    const discountPrice = originalPrice * (1 - discount);
    const productDescription = item?.description || "No description available.";
    const stock = item.stock - (cart.find(cartItem => cartItem.productId === item.productId)?.quantity || 0);

    const relatedProducts = Array.isArray(products)
        ? products.filter((product) =>
            (product.category?.categoryName === item.category?.categoryName ||
                product.shop?.shopName === item.shop?.shopName) &&
            product.productId !== item.productId
        ).slice(0, 8)
        : [];

    useEffect(() => {
        dispatch(getAllProductsAction());
    }, [dispatch]);

    const averageRating = item?.averageRating > 0 ? item?.averageRating : 'No reviews';
    const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar open state
    const [snackbarMessage, setSnackbarMessage] = useState(""); // Message for the Snackbar
    const currentCartItem = cart.find(cartItem => cartItem.product.productId === item.productId);
    const currentQuantityInCart = currentCartItem ? currentCartItem.quantity : 0;
    const availableStock = item.stock - currentQuantityInCart;

    const handleAddToCart = () => {
        if (availableStock <= 0) {
            // If stock is 0 or less, show error message in Snackbar
            setSnackbarMessage("Cannot add to cart, no product available.");
            setOpenSnackbar(true);
        } else {
            // Add product to cart
            addToCart(item.measurementUnit, 1, item);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setSnackbarMessage(""); // Clear the message when closing
    };

    const [userId, setUserId] = useState(null);
    const jwt = localStorage.getItem("jwt");
    const [cart0, setCart] = useState(null);

    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt)).then((data) => {
                setUserId(data.result.id);
            }).catch((error) => {
                console.error('Error getting user:', error);
            });
        }
    }, [dispatch, jwt]);

    useEffect(() => {
        if (userId && jwt) {
            dispatch(findCart(userId, jwt))
                .then((data) => {
                    setCart(data);  // Properly set the cart data after fetching
                    console.log("Cart data:", data);  // Debugging the cart data
                })
                .catch((error) => {
                    console.error('Error fetching cart:', error);
                });
        }
    }, [dispatch, userId, jwt]);

    return (
        <div>
            {/* Product detail section */}
            <section className="flex flex-col md:flex-row p-8 space-y-6 md:space-y-0 md:space-x-6">
                {/* Left side: Product image */}
                <div className="md:w-2/5 bg-white p-6 flex flex-col items-start">
                    <img
                        src={item?.pictureUrl || '/path/to/default-image.jpg'}
                        alt={item?.productName || 'Product Image'}
                        className="max-w-full h-auto rounded-lg mb-4"
                    />
                    {/* Category and Shop details */}
                    <Box className="w-full text-left">
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                            Categories:
                        </Typography>
                        <Box display="flex" gap={1} mt={1}>
                            <Chip label={item?.category?.categoryName || 'Unknown Category'} variant="outlined" />
                        </Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', marginTop: 2 }}>
                            Sellers:
                        </Typography>
                        <Box display="flex" gap={1} mt={1}>
                            <Chip label={item?.shop?.shopName || 'Unknown Shop'} variant="outlined" />
                        </Box>
                    </Box>
                </div>

                {/* Right side: Product information */}
                <div className="md:w-3/5 bg-white p-8 flex flex-col justify-start space-y-6">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                            {item?.productName || 'Product Name'}
                        </Typography>
                        {/* Display average rating */}
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
                            Original Price: {originalPrice.toFixed(2)}VND
                        </Typography>
                    )}

                    <Typography variant="h4" sx={{ color: "#019376", fontWeight: 'bold' }}>
                        {discountPrice.toFixed(2)}VND
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
                            onClick={handleAddToCart}  // Use the new function
                        >
                            <AddShoppingCartIcon sx={{ marginRight: 1 }} />
                            Add to Cart
                        </Button>

                        <Typography variant="body2" sx={{ color: '#888' }}>
                            {availableStock || 0}  available
                        </Typography>
                    </Box>
                </div>
            </section>
            <Divider />

            {/* Snackbar for error messages */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000} // Duration before automatically hiding
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ProductDetail;
