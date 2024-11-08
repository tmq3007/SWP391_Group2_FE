import React, { useEffect, useState } from 'react';
import "../../style/Home.css";
import axios from 'axios';
import MultiItemCarousel from "./MultiItemCarousel";
import {Alert, Divider, PaginationItem, Snackbar} from "@mui/material";
import CategoryMenu from "../Category/CategoryMenu";
import ProductCard from "../Product/ProductCard";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAction } from "../State/Product/Action";
import CartModal from '../Cart/CartModal';
import { NavbarHomePage } from "../Navbar/NavbarHomePage";
import { findCart, addItemToCart } from '../State/Cart/Action';
import {getUser} from "../State/Authentication/Action";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useNavigate} from "react-router-dom";
import {addItemToWishlist, getAllWishlist,removeItemFromWishlist} from "../State/Wishlist/Action";

const Home = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(store => store);
    const jwt = localStorage.getItem("jwt");
    const {carts} = useSelector(store => store);
const navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const [wishlist, setWishlist] = useState(null);
    const [openCartModal, setOpenCartModal] = useState(false);
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedPrice, setSelectedPrice] = useState('all');
    const [userId, setUserId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const updateCart = (updatedCart) => {
        setCart(updatedCart); // Update the cart state in Home component
    };
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    localStorage.setItem('paymentPlaced', 'false');
    localStorage.setItem('orderPlaced', 'false');
    const orderPlaced = localStorage.getItem('orderPlaced');
    console.log('Order placed status:', orderPlaced); // Check this output

    const [localCart, setLocalCart] = useState(cart || []);
    useEffect(() => {
        // Ensure that cart prop is updated properly in the local state
        if (cart) setLocalCart(cart);
    }, [cart]);
    // Fetch products
    useEffect(() => {
        dispatch(getAllProductsAction());
    }, [dispatch]);

    // Fetch user details and then fetch the cart once the userId is set
    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt)).then((data) => {
                setUserId(data.result.id);
            }).catch((error) => {
                console.error('Error getting user:', error);
            });
        }
    }, [dispatch, jwt]);

    console.log("user id:", userId);
    console.log("product",products);

    //get all wishlist
    useEffect(() => {
        if (userId && jwt) {
            dispatch(getAllWishlist(userId, jwt))
                .then((data) => {
                    setWishlist(data);  // Properly set the cart data after fetching
                    console.log("Wishlist data:", data);  // Debugging the cart data
                })
                .catch((error) => {
                    console.error('Error fetching wishlist:', error);
                });
        }
    }, [dispatch, userId, jwt]);  // Include jwt and userId as dependencies
    console.log("wishlist",wishlist)

    //get all cart
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
    }, [dispatch, userId, jwt]);  // Include jwt and userId as dependencies


    console.log("cart new:" ,cart);


    //add to wishlist
    const addToWishlist = (productID) => {
        if (!userId) {
            console.error('User is not logged in');
            return;
        }
        const request = {userId: userId,productId : productID}
        if (!jwt) {
            console.error('jwt not have');
            return;
        }
        dispatch(addItemToWishlist(request,jwt))
            .then(()=>{
                dispatch(getAllWishlist(userId, jwt))
                    .then((data) => {
                        setWishlist(data);  // Properly set the cart data after fetching
                        console.log("Wishlist data:", data);  // Debugging the cart data
                    })
                    .catch((error) => {
                        console.error('Error fetching wishlist:', error);
                    });
            })
    }
    //remove from wishlist
    const removeFromWishlist = (productId) => {
        if (!userId) {
            console.error('User is not logged in');
            return;
        }

        if (!jwt) {
            console.error('JWT token is missing');
            return;
        }

        dispatch(removeItemFromWishlist(userId, productId, jwt))
            .then(()=>{
                dispatch(getAllWishlist(userId, jwt))
                    .then((data) => {
                        setWishlist(data);  // Properly set the cart data after fetching
                        console.log("Wishlist data:", data);  // Debugging the cart data
                    })
                    .catch((error) => {
                        console.error('Error fetching wishlist:', error);
                    });
            })
            .catch((error) => {
                console.error('Error removing item from wishlist:', error);
            });
    };



    const addToCart = (buyUnit, quantity, item) => {
        if (!userId) {
            console.error('User is not logged in');
            return;
        }

        const productDetails = {
            buyUnit,
            quantity,
            productId: item.productId,
        };



        //add to cart
        dispatch(addItemToCart(userId, productDetails, jwt))
            .then(() => {
                // Refetch the cart to get the latest data from the server
                dispatch(findCart(userId, jwt))
                    .then((data) => {
                        if(data) {
                            setSnackbarMessage('Item added to cart successfully!');
                            setOpenSnackbar(true);
                            setCart(data);
                        }// Set cart with latest data from server
                    })
                    .catch((error) => {
                        if (error.response && error.response.data?.message) {
                            setSnackbarMessage(error.response.data.message);
                            setOpenSnackbar(true);
                        } else if (!error.response) {
                            setSnackbarMessage("Unable to connect to the server. Please check your network connection.");
                            setOpenSnackbar(true);
                        } else {
                            setSnackbarMessage("An error occurred. Please try again later.");
                            setOpenSnackbar(true);
                        }
                    });
            })
            .catch((error) => {
                if (error.response && error.response.data?.message) {
                    setSnackbarMessage(error.response.data.message);
                    setOpenSnackbar(true);
                } else if (!error.response) {
                    setSnackbarMessage("Unable to connect to the server. Please check your network connection.");
                    setOpenSnackbar(true);
                } else {
                    setSnackbarMessage("An error occurred. Please try again later.");
                    setOpenSnackbar(true);
                }
            });
    };


    const filteredProducts = products?.products?.filter((product) => {
        const matchesCategory = selectedCategory === 'all' || product.category.categoryName === selectedCategory;
        const matchesPrice = (selectedPrice === 'low' && product.unitSellPrice* (1 - product.discount) <= 50000) || (selectedPrice === 'high' && product.unitSellPrice* (1 - product.discount) > 50000) || selectedPrice === 'all';
        const matchesSearch = product.productName.toLowerCase().includes(searchQuery);

        return matchesCategory && matchesPrice && matchesSearch;
    }) || [];

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleOpenCart = () => {
        navigate("/cart")
    };

    const handleCloseCart = () => {
        setOpenCartModal(false);
    };

    //Ensure carts is an array or empty array if it's not available
    const totalPrice = localCart?.result?.totalPrice || 0;


    return (
        <div>
            <NavbarHomePage setSearchQuery={setSearchQuery}/>
            <section className="banner -z-50 relative flex flex-col items-center">
                <div className="w-[50vw] z-10 text-center">
                    <p className="text-2xl lg:text-5xl font-bold z-10 py-5 mt-9" style={{ color: "#019376" }}>Grocery</p>
                    <p className="z-10 text-black-400 text-xl lg:text-2xl">Get your healthy foods & snacks delivered at your doorsteps all day every day</p>
                </div>
            </section>
            <Divider />
            <section className="p-10 lg:py-10 lg:px-20">
                <p className="text-2xl font-semibold text-black-400 py-3 pb-10" style={{ color: "#019376" }}>Top Product</p>
                <MultiItemCarousel />
            </section>

            <section className="pt-[2rem] lg:flex relative">
                <div className="space-y-10 w-[300px] filter" style={{ backgroundColor: '#ffffff', padding: '1rem' }}>
                    <div className="box spacey-8 items-center lg:sticky top-28">
                        <CategoryMenu setSelectedCategory={setSelectedCategory} setSelectedPrice={setSelectedPrice} />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mx-auto ml-8" style={{ width: '100%', maxWidth: '1600px' }}>
                    {currentProducts.map((item) => item &&　item.isActive&& (
                        <ProductCard
                            key={item.id}
                            cart={cart?.result?.cartItems || []}
                            item={item}
                            wishlist={wishlist?.result?.products || []}
                            addToCart={(buyUnit, quantity) => addToCart(buyUnit, quantity, item)}
                            addToWishlist={() => addToWishlist(item.productId)}
                            removeFromWishlist={() => removeFromWishlist(item.productId)}
                        />
                    ))}
                </div>
            </section>

            <Stack spacing={2} className="mt-setBackdropStyle5" alignItems="center" sx={{ marginBottom: "30px", marginTop: "15px" }}>
                <Pagination
                    count={Math.ceil(filteredProducts.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handleChange}
                    color="primary"
                    renderItem={(item) => <PaginationItem {...item} className="pagination-item-home-page" />}
                />
            </Stack>

            <div className="fixed bottom-10 right-10 cart-modal">
                <button className="text-white p-3 rounded-lg shadow-lg" onClick={handleOpenCart}>
                    <AddShoppingCartIcon /> View Cart ({cart?.result?.cartItems?.length > 0 ? cart.result.cartItems.length : 0})
                </button>
            </div>

            {/*<CartModal*/}
            {/*    open={openCartModal}*/}
            {/*    onClose={handleCloseCart}*/}
            {/*    cartItems={localCart?.result?.cartItems || []}  // Pass cart items or an empty array*/}
            {/*    addToCart={addToCart}*/}
            {/*    totalPrice={totalPrice}  // Pass total price*/}
            {/*/>*/}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="info">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Home;
