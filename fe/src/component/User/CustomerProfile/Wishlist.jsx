// Wishlist.js
import React from 'react';

const WishlistItem = ({ item }) => {
    return (
        <div className="mx-10">
            <div className="flex justify-between items-center p-4  my-3">
                <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 border shadow-md"/>
                    <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-500">{item.store}</p>
                        <span
                            className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{item.rating}★</span>
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
    const items = [
        {
            name: 'Baby Spinach',
            store: 'Grocery Shop',
            rating: 3.33,
            price: 0.60,
            image: 'https://media.istockphoto.com/photos/cherry-isolated-on-white-background-picture-id1016023856?k=20&m=1016023856&s=612x612&w=0&h=zKsMxWJCu2awCmx2JJvuoGDA6nCd_Gn0Bjs-fHHm5Ww='
        },
        {
            name: 'Blueberries',
            store: 'Grocery Shop',
            rating: 4.67,
            price: 3.00,
            image: 'https://media.istockphoto.com/photos/cherry-isolated-on-white-background-picture-id1016023856?k=20&m=1016023856&s=612x612&w=0&h=zKsMxWJCu2awCmx2JJvuoGDA6nCd_Gn0Bjs-fHHm5Ww='
        },
        {
            name: 'Brussels Sprout',
            store: 'Grocery Shop',
            rating: 5,
            price: 3.00,
            originalPrice: 5.00,
            image: 'https://media.istockphoto.com/photos/cherry-isolated-on-white-background-picture-id1016023856?k=20&m=1016023856&s=612x612&w=0&h=zKsMxWJCu2awCmx2JJvuoGDA6nCd_Gn0Bjs-fHHm5Ww='
        },
    ];

    return (
        <div className=" mx-auto rounded-lg mx-10">
            <h2 className="text-2xl font-semibold text-center p-4">My Wishlists</h2>
            {items.map((item, index) => (
                <WishlistItem key={index} item={item}/>

            ))}

        </div>
    );
};

export default Wishlist;
