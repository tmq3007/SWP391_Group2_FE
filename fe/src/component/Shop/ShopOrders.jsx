import React, { useState, useEffect } from 'react';
import "../../style/ShopProduct.css";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from "axios";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

export const ShopOrders = () => {
    const token = localStorage.getItem('jwt');
    const userId = localStorage.getItem("userId");

    const [orders, setOrders] = useState([]); // Store OrderItems
    const [shopId, setShopId] = useState("");
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const ordersPerPage = 5;

    // Filter orders based on search term
    const filteredOrders = orders.filter(order =>
        order.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const indexOfLastOrder = page * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const getAllOrderItemsByShopIdAction = async (shopId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/orderItems/getAllByShopId/${shopId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(response.data.result);
        } catch (error) {
            console.error("Error fetching order items:", error);
        }
    };

    useEffect(() => {
        const fetchShopId = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/shops/get-shopId/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const shopId = response.data.result;
                setShopId(shopId);
                if (shopId) getAllOrderItemsByShopIdAction(shopId);
            } catch (error) {
                console.error("Error fetching shopId:", error);
            }
        };
        fetchShopId();
    }, [userId, token]);

    const handlePageChange = (event, value) => setPage(value);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(1); // Reset to first page on new search
    };

    return (
        <div className="w-full bg-white h-screen overflow-y-auto">
            <div className='h-screen p-6'>
                <div className="flex space-x-80 bg-white rounded-lg p-6 shadow-md mb-8">
                    <h2 className="text-xl mt-5 font-semibold text-gray-800">Orders</h2>
                    <div className="relative w-full max-w-md hidden lg:flex items-center mt-3">
                        <SearchIcon className="-mt-4 absolute left-4 text-gray-400"/>
                        <input
                            type="text"
                            className="pl-12 pr-4 h-12 w-full rounded-full border border-gray-300 focus:ring focus:ring-[#019376] focus:border-[#019376] transition-shadow"
                            placeholder="Search by Product Name"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                <div className="rc-table-content">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Order ID</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Product Name</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Order Date</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Payment Date</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Payment Way</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Final Price</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {currentOrders.map(order => (
                            <tr key={order.orderItemsId} className="text-center">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.orderItemsId}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{order.productName}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{order.orderItemsDate}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{order.orderItemsPaymentDate}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {order.paymentId === 1 ? 'COD' : order.paymentId === 2 ? 'QR Code' : ''}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{order.finalPrice}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{order.isPaid ? 'Is Paid' : 'Not Paid'}</td>
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
