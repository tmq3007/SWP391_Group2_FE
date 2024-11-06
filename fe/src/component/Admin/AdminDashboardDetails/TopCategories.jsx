import React, { useEffect, useState } from 'react';
import '../../../style/AdminDashboard.css';
import {getTop10CategoriesByMostProducts} from "../../State/Admin/Action";


const TopCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getTop10CategoriesByMostProducts();
                const mappedCategories = response.result.map((category) => ({
                    id: `ID: ${category.categoryId}`,
                    name: category.categoryName,
                }));
                setCategories(mappedCategories);
            } catch (error) {
                console.error("Error fetching top categories:", error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="card">
            <div className="summary-header">
                <h2 className="text-2xl font-semibold">Top 10 Categories with Most Products</h2>
            </div>
            <table>
                <thead>
                <tr>
                    <th id="non-center">Category ID</th>
                    <th id="non-center">Category Name</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category, index) => (
                    <tr key={index}>
                        <td id="td-non-center">{category.id}</td>
                        <td id="td-non-center">{category.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TopCategories;