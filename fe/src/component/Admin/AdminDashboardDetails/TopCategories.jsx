import React from 'react';
import '../../../style/AdminDashboard.css';

const categories = [
    { id: "ID: 7", name: "Snacks", shop: "Grocery Shop", count: 73 },
    { id: "ID: 125", name: "Bakery", shop: "Grocery Shop", count: 60 },
    { id: "ID: 122", name: "Fruits", shop: "Grocery Shop", count: 60 },
    { id: "ID: 118", name: "Snacks", shop: "Grocery Shop", count: 54 },
    // Add more category objects here
];

const TopCategories = () => {
    return (
        <div className="card">
            <div className='summary-header'>
                <h2 className='text-2xl font-semibold'>Top 10 Category with most products</h2>
            </div>
            <table>
                <thead>
                <tr>
                    <th id='non-center'>Category ID</th>
                    <th id='non-center'>Category Name</th>
                    <th id='non-center'>Shop</th>
                    <th id='center'>Product Count</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category, index) => (
                    <tr key={index}>
                        <td id='td-non-center'>{category.id}</td>
                        <td id='td-non-center'>{category.name}</td>
                        <td id='td-non-center'>{category.shop}</td>
                        <td >{category.count}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TopCategories;
