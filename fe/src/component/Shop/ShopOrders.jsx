import React, { useState, useEffect } from 'react';
import "../../style/ShopProduct.css";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from "axios";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";

export const ShopOrders = () => {
    const token = localStorage.getItem('jwt');
    const userId = localStorage.getItem("userId");

    const [orders, setOrders] = useState([]); // Lưu trữ các OrderItems
    const [shopId, setShopId] = useState("");
    const [page, setPage] = useState(1);

    const ordersPerPage = 5;
    const totalPages = Math.ceil(orders.length / ordersPerPage);
    const indexOfLastOrder = page * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

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

    const handleIsPaid = async (orderItemsId) => {
        try {
            const response = await axios.patch(
                `http://localhost:8080/api/v1/orderItems/isPaidToTrue/${orderItemsId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            await getAllOrderItemsByShopIdAction(shopId);
            return response.data;

        } catch (error) {
            console.error("Error updating payment status:", error);
            throw error;
        }
    };


    return (
        <div className="w-full bg-white h-screen overflow-y-auto">
            <div className='h-screen p-6'>
                <div className="bg-white rounded-lg p-6 shadow-md mb-8">
                    <h2 className="text-xl mt-5 font-semibold text-gray-800">Orders</h2>
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
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Action</th>
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
                                <td className="px-6 py-4 text-sm text-gray-500 flex-col cursor-pointer">
                                    <DeleteIcon
                                        onClick={() => {
                                            if (window.confirm("Do you want to confirm status to paid?")) {
                                                handleIsPaid(order.orderItemsId);
                                            }
                                        }}
                                    />

                                </td>
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
