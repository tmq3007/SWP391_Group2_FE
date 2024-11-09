import React, { useState, useEffect } from 'react';
import "../../style/ShopProduct.css";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ShopFilter } from "./ShopFilter";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsByShopIdAction, updateProductById } from "../State/Product/Action";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopInventory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem('jwt');
    const userId = localStorage.getItem("userId");

    const { products } = useSelector(store => store.products);
    const [shopId, setShopId] = useState("");
    const [page, setPage] = useState(1);
    const [isFilterVisible, setFilterVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // New search term state

    const productsPerPage = 5;

    // Filter products based on search term
    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const indexOfLastProduct = page * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    useEffect(() => {
        const fetchShopId = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/shops/get-shopId/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const shopId = response.data.result;
                setShopId(shopId);
                if (shopId) dispatch(getAllProductsByShopIdAction(shopId));
            } catch (error) {
                console.error("Error fetching shopId:", error);
            }
        };

        fetchShopId();
    }, [dispatch, token, userId]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (event, value) => setPage(value);
    const toggleFilter = () => setFilterVisible(!isFilterVisible);

    return (
        <div className="w-full bg-white h-screen overflow-y-auto">
            <div className='h-screen p-6'>
                <div className="bg-white rounded-lg p-6 shadow-md mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <h2 className="text-xl mt-5 font-semibold text-gray-800">Inventory</h2>
                        <div className="flex items-center gap-4">
                            <div className="relative w-full max-w-md hidden lg:flex items-center mt-4">
                                <SearchIcon className="-mt-4 absolute left-4 text-gray-400"/>
                                <input
                                    type="text"
                                    className="pl-12 pr-4 h-12 w-full rounded-full border border-gray-300 focus:ring focus:ring-[#019376] focus:border-[#019376] transition-shadow"
                                    placeholder="Search by Name"
                                    aria-label="Search"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <button
                                className="flex items-center justify-center h-12 px-6 bg-[#019376] text-white font-medium rounded-full shadow hover:bg-[#01765c] transition-colors"
                                onClick={() => navigate("/shop-dashboard/shop-add-product")}
                            >
                                + Add Product
                            </button>
                            <button
                                onClick={toggleFilter}
                                className="flex items-center text-[#019376] font-semibold hover:text-[#01765c] transition-colors"
                            >
                                Filter
                                {isFilterVisible ? (
                                    <ArrowDownwardIcon className="ml-1"/>
                                ) : (
                                    <ArrowUpwardIcon className="ml-1"/>
                                )}
                            </button>
                        </div>
                    </div>
                    {isFilterVisible && (
                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <ShopFilter/>
                        </div>
                    )}
                </div>
                <div className="rc-table-content">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Product</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Category</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Rate</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Price/Unit</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Quantity</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {currentProducts.map((product) => (
                            <tr key={product.productId} className="text-center">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.productId}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{product.productName}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{product.category.categoryName}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{product.averageRating || 'N/A'}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{product.unitSellPrice}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{product.stock}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{product.isActive ? 'Active' : 'Inactive'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-end mt-5">
                    <Stack spacing={2}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Stack>
                </div>
            </div>
        </div>
    );
};
