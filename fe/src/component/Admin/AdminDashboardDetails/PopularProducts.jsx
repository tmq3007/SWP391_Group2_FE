import React from 'react';
import '../../../style/AdminDashboard.css';

const PopularProducts = () => {
    const products = [
        { name: 'Brussels Sprout', category: 'Grocery', price: 3.00 },
        { name: 'Apples', category: 'Grocery', price: 1.60 },
        { name: 'Blueberries', category: 'Grocery', price: 3.00 },
        { name: 'Celery Stick', category: 'Grocery', price: 5.00 },
        { name: 'The Bedtime Stories Part One', category: 'Books', price: 100.00 },
        { name: 'NutriBlend Pro-Stage Baby Formula', category: 'Medicine', price: 32.00 },
        { name: 'NutriBlend Pro-Stage Baby Formula', category: 'Medicine', price: 32.00 },
        { name: 'NutriBlend Pro-Stage Baby Formula', category: 'Medicine', price: 32.00 },
        { name: 'NutriBlend Pro-Stage Baby Formula', category: 'Medicine', price: 32.00 },
        { name: 'NutriBlend Pro-Stage Baby Formula', category: 'Medicine', price: 32.00 },
        { name: 'NutriBlend Pro-Stage Baby Formula', category: 'Medicine', price: 32.00 },
        { name: 'NutriBlend Pro-Stage Baby Formula', category: 'Medicine', price: 32.00 },
        { name: 'NutriBlend Pro-Stage Baby Formula', category: 'Medicine', price: 32.00 },
        { name: 'NutriBlend Pro-Stage Baby Formula', category: 'Medicine', price: 32.00 },
    ];

    return (
        <div className="popular-products">
            <div className='popular-products-header'>
                <h2 className='text-2xl font-semibold'>Popular Products</h2>
            </div>
            <ul className="product-list">
                {products.map((product, index) => (
                    <li key={index} className="product-item">
                        <div className="product-details">
                            <img
                                src={`https://pickbazar-react-admin-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F20%2FVeggiePlatter.jpg&w=1920&q=75`} // Placeholder image; you can replace it with product images
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