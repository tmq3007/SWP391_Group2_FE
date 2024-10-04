import React from 'react';
import {  Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
const OrderListWithMUIAndTailwind = () => {
    // Static list of orders
    const staticOrders = [
        {
            id: 1,
            orderNumber: '1001',
            date: '2024-09-20',
            total: '$120.00',
            status: 'Shipped',
        },
        {
            id: 2,
            orderNumber: '1002',
            date: '2024-09-18',
            total: '$80.00',
            status: 'Processing',
        },
        {
            id: 3,
            orderNumber: '1003',
            date: '2024-09-15',
            total: '$50.00',
            status: 'Delivered',
        },
    ];

    return (
        <Box className="h-[80vh]  w-full pr-5 md:shrink-0 lg:pr-8">
            <Box className="flex h-full flex-col bg-white pb-5 border border-gray-200 rounded-lg">
                <Typography variant="h5" className="py-5 px-5 text-heading font-semibold">
                    My Orders
                </Typography>
                <div className="w-full overflow-y-auto" style={{ height: 'calc(100% - 80px)' }}>
                    <Box className="px-5 space-y-4">
                        {staticOrders.map((order) => (
                            <Box
                                key={order.id}
                                className="border p-4 rounded-lg bg-gray-50 shadow-md transition-transform transform hover:scale-105 hover:border-green-700 flex flex-col items-center"
                            >
                                <Typography variant="h6" className="font-semibold text-center mb-4">
                                    Order #{order.orderNumber}
                                </Typography>

                                <Box className="flex justify-between w-full max-w-xs mt-2">
                                    <Typography className="font-medium">Date:</Typography>
                                    <Typography>{order.date}</Typography>
                                </Box>

                                <Box className="flex justify-between w-full max-w-xs mt-2 font-semibold">
                                    <Typography className=" font-semibold">Total:</Typography>
                                    <Typography variant="h6">{order.total}</Typography>
                                </Box>

                                <Box className="flex justify-between w-full max-w-xs mt-2 ">
                                    <Typography className="font-medium">Status:</Typography>
                                    <Typography className="p-2 bg-orange-100 rounded-full text-orange-700 font-light">{order.status}</Typography>
                                </Box>
                            </Box>

                        ))}

                        {/* Load More Button */}
                        <div className="mt-8 flex justify-center lg:mt-12">
                            <Button
                                variant="contained"
                                color="success"
                                fullWidth
                                className="bg-blue-500 hover:bg-blue-600 text-white"

                            >
                                Load More
                            </Button>

                        </div>
                    </Box>
                </div>
            </Box>
        </Box>
    );
};

export default OrderListWithMUIAndTailwind;
