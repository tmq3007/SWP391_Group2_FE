import React, { useEffect, useState } from 'react';
import ProfileNav from './ProfileNav';
import ProfileInfo from './ProfileInfo';
import { AddressProfile } from "./AddressProfile";
import { Route, Routes } from "react-router-dom";
import StaticOrderList from "./Orders/OrderList";
import OrderView from "./Orders/OrderView";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { getUser } from "../../State/Authentication/Action";
import axios from 'axios';

export const MyOrder = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const [userId, setUserId] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null); // New state to track selected order


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
        const getOrderByUserId = async (userId) => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/orders/byUserId/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                const reversedOrders = Array.isArray(response.data.result) ? response.data.result.reverse() : [];
                setOrders(reversedOrders);

                // Automatically select the first order if none is selected
                if (!selectedOrder && reversedOrders.length > 0) {
                    setSelectedOrder(reversedOrders[0]);
                }
            } catch (error) {
                console.log('Error fetching orders:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            getOrderByUserId(userId);
        }
    }, [userId, jwt]);
    console.log(orders)
    if (loading) {
        return <p>Loading orders...</p>;
    }

    if (error) {
        return <p>Error fetching orders: {error.message}</p>;
    }

    const handleOrderClick = (order) => {
        setSelectedOrder(order); // Update selected order on click
    };
    //setSelectedOrder(orders[0])
    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-4">
                <Box className=" w-full pr-5 md:shrink-0 lg:pr-8">
                    <Box className="min-h-full flex h-full flex-col bg-white pb-5 border border-gray-200 rounded-lg">
                        <Typography variant="h4" className="py-5 px-5 text-heading font-semibold">
                            My Orders
                        </Typography>
                        <div className="w-full overflow-y-auto" style={{ height: 'calc(100% - 80px)' }}>
                            <Box className="px-5 space-y-4">
                                {orders.length > 0 ? (
                                    orders.map((order) => (
                                        <Box
                                            key={order.orderId}
                                            className="border p-4 rounded-lg bg-gray-50 shadow-md transition-transform transform hover:scale-105 hover:border-green-700 flex flex-col items-center"
                                            onClick={() => handleOrderClick(order)} // Add click handler
                                        >
                                            <Typography variant="h6" className="font-semibold text-center mb-4">
                                                Order #{order.orderId}
                                            </Typography>
                                            <Box className="flex justify-between w-full max-w-xs mt-2">
                                                <Typography className="font-medium">Date:</Typography>
                                                <Typography>{order.orderDate}</Typography>
                                            </Box>
                                            <Box className="flex justify-between w-full max-w-xs mt-2 font-semibold">
                                                <Typography className="font-semibold">Total:</Typography>
                                                <Typography variant="h6">${order.finalTotal}</Typography>
                                            </Box>
                                            <Box className="flex justify-between w-full max-w-xs mt-2">
                                                <Typography className="font-medium">Status:</Typography>
                                                <Typography
                                                    className={`p-2 rounded-full font-light ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                                    {order.isPaid ? 'Paid' : 'Not Paid'}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))
                                ) : (
                                    <Typography></Typography>
                                )}
                                {/* Load More Button */}

                            </Box>
                        </div>
                    </Box>
                </Box>
            </div>
            <div className="w-full md:w-2/3 p-4">
                {selectedOrder ? (
                    <OrderView order={selectedOrder}/> // Pass the selected order
                ) : (
                    <h3 className="items-center mt-60 ">No Order History </h3>

                    )}
            </div>
        </div>
    );
};
