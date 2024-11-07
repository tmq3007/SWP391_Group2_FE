import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {getUser} from "../../State/Authentication/Action";
import {getAllWishlist} from "../../State/Wishlist/Action";
import {removeItemFromWishlist} from "../../State/Wishlist/Action";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {useNavigate} from "react-router-dom";
import {addItemToCart, findCart} from "../../State/Cart/Action";
import {Alert, Snackbar} from "@mui/material";


const WishlistItem = ({ item, userId, jwt, onRemove,addToCart }) => {
    const dispatch = useDispatch();
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    console.log("dsa",item)
    const handleRemove = () => {
        dispatch(removeItemFromWishlist(userId, item.productId, jwt))
            .then(() => {
                onRemove(item.productId);  // Call onRemove to update local state
            })
            .catch((error) => {
                console.error("Error removing item from wishlist:", error);
            });
    };
    const handleAddToCart = () =>{
        addToCart(item.measurementUnit, 1, item);
        handleRemove()
        setSnackbarMessage('Item added to cart successfully!');
        setOpenSnackbar(true);
    }
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    return (
        <div className="mx-10">
            <div className="flex justify-between items-center p-4 my-3">
                <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 border shadow-md" />
                    <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-500">{item.store}</p>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{item.rating}★</span>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <p className="text-xl font-semibold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</p>
                    {item.originalPrice && (

                        <span className="line-through text-gray-400">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.origanalPrice)}</span>
                    )}
                    <div className="flex space-x-4 mt-2">
                        <button onClick={handleAddToCart} className="text-green-500">Add to Cart</button>
                        <div className="border-l border-gray-300 h-5"></div>
                        <button onClick={handleRemove} className="text-red-500">Remove</button>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-300 h-5 mx-5"></div>
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

export const Wishlist = () => {
    const [userId, setUserId] = useState(null);
    const dispatch = useDispatch();
    const [wishlist, setWishlist] = useState([]);
    const jwt = localStorage.getItem("jwt");
    const navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    //add to cart
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
                        setCart(data);  // Set cart with latest data from server
                    })
                    .catch((error) => {
                        console.error('Error fetching updated cart:', error);
                    });
            })
            .catch((error) => {
                console.error('Error adding item to cart:', error);
            });
    };
    // findCart
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
            dispatch(getAllWishlist(userId, jwt))
                .then((data) => {
                    console.log("data",data)
                    const products = data.result.products || [];
                    const formattedWishlist = products.map(product => ({
                        productId: product.productId, // Ensure productId is included
                        name: product.productName || 'Unnamed Product',
                        price: product.unitSellPrice *(1-product.discount) || 0,
                        originalPrice: product.originalPrice || null,
                        store: product.shop?.shopName || 'Unknown Store',
                        rating: product.averageRating ,
                        image: product.pictureUrl ,
                    }));
                    setWishlist(formattedWishlist);
                })
                .catch((error) => {
                    console.error('Error fetching wishlist:', error);
                });
        }
    }, [dispatch, userId, jwt]);
    console.log(wishlist)
    // Function to handle removal in local state
    const handleRemoveFromWishlist = (productId) => {
        setWishlist((prevWishlist) => prevWishlist.filter(item => item.productId !== productId));
    };
    const handleOpenCart = () => {
        navigate("/cart")
    };
    return (
        <div className="mx-auto rounded-lg mx-10">
            <h2 className="text-2xl font-semibold text-center p-4">My Wishlists</h2>
            {wishlist.length > 0 ? (
                wishlist.map((item, index) => (
                    <WishlistItem key={index} item={item} userId={userId} jwt={jwt}
                                  cart={cart?.result?.cartItems || []}
                                  addToCart={(buyUnit, quantity) => addToCart(buyUnit, quantity, item)}


                                  onRemove={handleRemoveFromWishlist}/>
                ))
            ) : (
                <p className="text-center">Your wishlist is empty.</p>
            )}
            <div className="fixed bottom-10 right-10 cart-modal">
                <button className="text-white p-3 rounded-lg shadow-lg" onClick={handleOpenCart}>
                    <AddShoppingCartIcon/> View Cart
                    ({cart?.result?.cartItems?.length > 0 ? cart.result.cartItems.length : 0})
                </button>
            </div>

        </div>

    );
};

export default Wishlist;