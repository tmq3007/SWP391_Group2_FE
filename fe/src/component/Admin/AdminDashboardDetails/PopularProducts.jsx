import React, { useState, useEffect } from 'react';
import '../../../style/AdminDashboard.css';
import {getTop10ProductsByMostSold} from "../../State/Admin/Action";


const PopularProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getTop10ProductsByMostSold();
                const mappedProducts = response.result.map((product) => ({
                    name: product.productName,
                    category: product.category.categoryName,
                    price: product.unitSellPrice,
                    image: product.pictureUrl || 'https://placehold.co/100', // Use placeholder if image is missing
                }));
                setProducts(mappedProducts);
            } catch (error) {
                console.error("Error fetching top products:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="popular-products">
            <div className="popular-products-header">
                <h2 className="text-2xl font-semibold">Popular Products</h2>
            </div>
            <ul className="product-list">
                {products.map((product, index) => (
                    <li key={index} className="product-item">
                        <div className="product-details">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="rounded-lg border border-gray-200 w-16 h-16"
                            />
                            <div className="product-info">
                                <div className="product-name">{product.name}</div>
                                <div className="product-category">{product.category}</div>
                            </div>
                        </div>
                        <div className="product-price">${product.price.toFixed(2)}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PopularProducts;
