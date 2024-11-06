import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Review from "./Review";

const OrderView = (order) => {
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    // Open Review popup with productId
    const handleOpenReview = (productId) => {
        setSelectedProductId(productId);
        setIsReviewOpen(true);
    };

    // Close Review popup
    const handleCloseReview = () => {
        setIsReviewOpen(false);
        setSelectedProductId(null);
    };


    if (!order) {
        return <Typography>Select an order to view details.</Typography>; // Show a message if no order is selected
    }


    return (
        <div className=" border border-gray-200 rounded-lg">
            <div className="mx-auto w-full max-w-screen-lg ">
                <div className='px-5'>
                    <Typography variant="h5" className="py-5  text-heading font-semibold">
                        Order Details
                    </Typography>
                </div>
                <div className="relative overflow-hidden ">
                    <div className=" p-6 sm:p-8 lg:p-12">
                        <div className="mb-6 grid gap-4 sm:grid-cols-2 md:mb-12 lg:grid-cols-4">
                            <div className="rounded border border-gray-200 px-5 py-4 shadow-sm">
                                <h3 className="mb-2 text-sm font-semibold text-heading">Order Number</h3>
                                <p className="text-sm text-body-dark">{order.order.orderId}</p>
                            </div>
                            <div className="rounded border border-gray-200 px-5 py-4 shadow-sm">
                                <h3 className="mb-2 text-sm font-semibold text-heading">Date</h3>
                                <p className="text-sm text-body-dark">{order.order.orderDate}</p>
                            </div>
                            <div className="rounded border border-gray-200 px-5 py-4 shadow-sm">
                                <h3 className="mb-2 text-sm font-semibold text-heading">Total</h3>
                                <p className="text-sm text-body-dark">${order.order.finalTotal}</p>
                            </div>
                            <div className="rounded border border-gray-200 px-5 py-4 shadow-sm">
                                <h3 className="mb-2 text-sm font-semibold text-heading">Payment Method</h3>
                                <p className="text-sm text-body-dark">
                                    {order.order.paymentId === 1 ? 'COD' : 'QR Code'}
                                </p>
                            </div>
                        </div>

                        {/* Order Status */}
                        <div className="mb-8 flex w-full items-center justify-center md:mb-12">
                            <Typography
                                variant="h6"
                                className={`font-semibold rounded-full text-center p-2 rounded ${order.order.isPaid ? 'bg-green-100' : 'bg-red-100'}`}
                            >
                                Order Status: {order.order.isPaid ? 'Paid' : 'Not Paid'}
                            </Typography>
                        </div>

                        <div className="flex flex-col lg:flex-row">
                            <div className="mb-12 w-full lg:mb-0 lg:w-1/2 lg:pr-3">
                                <h2 className="mb-6 text-xl font-bold text-heading">Total Amount</h2>
                                <div>
                                    <p className="mt-5 flex text-body-dark">
                                        <strong className="w-5/12 text-sm font-semibold text-heading">Sub Total:</strong>
                                        <span className="w-7/12 text-sm pl-4">{order.order.total}</span>
                                    </p>


                                    <p className="mt-5 flex text-body-dark">
                                        <strong className="w-5/12 text-sm font-semibold text-heading">Total:</strong>
                                        <span className="w-7/12 text-sm pl-4">${order.order.finalTotal}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/2 lg:pl-3">
                                <h2 className="mb-6 text-xl font-bold text-heading">Order Details</h2>
                                <div>
                                    <p className="mt-5 flex text-body-dark">
                                        <strong className="w-4/12 text-sm font-semibold text-heading">Name:</strong>
                                        <span className="w-8/12 text-sm pl-4">{order.order.user.firstName +' ' + order.order.user.lastName}</span>
                                    </p>
                                    <p className="mt-5 flex text-body-dark">
                                        <strong className="w-4/12 text-sm font-semibold text-heading">Total Items:</strong>
                                        <span className="w-8/12 text-sm pl-4">{order.order.orderItemsList.length}</span>
                                    </p>
                                    <p className="mt-5 flex text-body-dark">
                                        <strong className="w-4/12 text-sm font-semibold text-heading">Payment Time:</strong>
                                        <span className="w-8/12 text-sm pl-4">{order.order.paymentDate}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <TableContainer component={Paper} className="mt-4">
                            <Table>
                                <TableHead className="bg-gray-100">
                                    <TableRow>
                                        <TableCell className="text-left font-semibold">Item</TableCell>
                                        <TableCell className="text-center font-semibold">Quantity</TableCell>
                                        <TableCell className="text-right font-semibold">Price</TableCell>
                                        <TableCell className="text-right font-semibold"></TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.order.orderItemsList.map((item, index) => (
                                        <TableRow key={index} className="border-b">
                                            <TableCell className="flex flex-row items-center space-x-4 flex">
                                                <div className="flex text-center items-center gap-2">
                                                    <img src={item.productImage} alt={item.productName} className="w-12 h-12 object-cover" />
                                                    {item.productName}
                                                </div>

                                            </TableCell>


                                            <TableCell className="text-center">{item.productQuantity}</TableCell>
                                            <TableCell className="text-right">
                                                {order.order.isPaid ? (
                                                    <button className="bg-green-900" onClick={() => handleOpenReview(order.productId)}>Review</button>
                                                ) : null}
                                            </TableCell>
                                            <Review
                                                open={isReviewOpen}
                                                onClose={handleCloseReview}
                                                productId={selectedProductId}
                                                userId={order.order.user.id} // Pass userId if needed
                                            />

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default OrderView;
