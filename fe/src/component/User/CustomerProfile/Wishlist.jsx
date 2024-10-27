import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {getUser} from "../../State/Authentication/Action";
import {getAllWishlist} from "../../State/Wishlist/Action";

const WishlistItem = ({ item }) => {
    return (
        <div className="mx-10">
            <div className="flex justify-between items-center p-4  my-3">
                <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 border shadow-md"/>
                    <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-500">{item.store}</p>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{item.rating}★</span>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <p className="text-xl font-semibold">${item.price}</p>
                    {item.originalPrice && (
                        <span className="line-through text-gray-400">${item.originalPrice}</span>
                    )}
                    <div className="flex space-x-4 mt-2">
                        <button className="text-green-500">Add to Cart</button>
                        <div className="border-l border-gray-300 h-5"></div>
                        <button className="text-red-500">Remove</button>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-300 h-5 mx-5"></div>
        </div>
    );
};

export const Wishlist = () => {
    const [userId, setUserId] = useState(null);
    const dispatch = useDispatch();
    const [wishlist, setWishlist] = useState([]);
    const jwt = localStorage.getItem("jwt");

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
                    const products = data.result.products || [];  // Safely access products array
                    const formattedWishlist = products.map(product => ({
                        name: product.productName || 'Unnamed Product',  // Fallback for missing product name
                        price: product.unitSellPrice || 0,  // Fallback for missing price
                        originalPrice: product.originalPrice || null,  // Handle original price
                        store: product.shop?.shopName || 'Unknown Store',  // Fallback for missing shop
                        rating: product.review?.rating || 'No Rating',  // Fallback for missing rating
                        image: product.pictureUrl1 || 'default-image-url',  // Fallback for missing image
                    }));
                    setWishlist(formattedWishlist);
                    console.log("Wishlist data:", data);
                    console.log("Wishlist Products", products);
                })
                .catch((error) => {
                    console.error('Error fetching wishlist:', error);
                });
        }
    }, [dispatch, userId, jwt]);


    return (
        <div className="mx-auto rounded-lg mx-10">
            <h2 className="text-2xl font-semibold text-center p-4">My Wishlists</h2>
            {wishlist.length > 0 ? (
                wishlist.map((item, index) => (
                    <WishlistItem key={index} item={item} />
                ))
            ) : (
                <p className="text-center">Your wishlist is empty.</p>
            )}
        </div>
    );
};

export default Wishlist;
