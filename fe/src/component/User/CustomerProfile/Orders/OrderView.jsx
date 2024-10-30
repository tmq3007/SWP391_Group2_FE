import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
const OrderView = (order) => {
    // Static order data for demonstration
    const staticOrder = {
        tracking_number: '12345ABC',
        created_at: '2024-10-01T10:00:00Z',
        paid_total: 150,
        payment_gateway: 'Credit Card',
        amount: 150,
        shipping_fee: 5,
        sales_tax: 10,
        discount: 5,
        customer_name: 'John Doe',
        products: [
            { name: "Hersheys Kisses", weight: "0.2lb", quantity: 1, price: 3.50, image: "https://th.bing.com/th/id/OIP._Gbmd5sS4pqCGTXdoZeO2wHaHa?rs=1&pid=ImgDetMain" },
            { name: "M & M Funsize", weight: "0.1lb", quantity: 1, price: 1.00, image: "https://th.bing.com/th/id/OIP._Gbmd5sS4pqCGTXdoZeO2wHaHa?rs=1&pid=ImgDetMain" },
            { name: "Dairy Milk Recloise", weight: "0.2lb", quantity: 1, price: 3.50, image: "https://th.bing.com/th/id/OIP._Gbmd5sS4pqCGTXdoZeO2wHaHa?rs=1&pid=ImgDetMain" },
        ],
        order_status: 'Completed',
        delivery_time: '2024-10-05',
    };
    if (!order) {
        return <Typography>Select an order to view details.</Typography>; // Show a message if no order is selected
    }

    // Calculate totals
    const total = `$${staticOrder.paid_total}`;
    const shippingCharge = `$${staticOrder.shipping_fee}`;
    const tax = `$${staticOrder.sales_tax}`;
    const discount = `$${staticOrder.discount}`;
    const subTotal = `$${staticOrder.amount}`;
    const totalAmount = `$${staticOrder.paid_total + staticOrder.shipping_fee}`;

    return (
        <div className=" border border-gray-200 rounded-lg">
            <div className="mx-auto w-full max-w-screen-lg ">
                <div className='px-5'>
                    <Typography variant="h5" className="py-5  text-heading font-semibold">
                        My Orders
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
                                        <strong className="w-5/12 text-sm font-semibold text-heading">Discount:</strong>
                                        <span className="w-7/12 text-sm pl-4">{discount}</span>
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
                                        <TableCell className="text-left font-semibold">Image</TableCell>
                                        <TableCell className="text-left font-semibold">Name</TableCell>

                                        <TableCell className="text-center font-semibold">Quantity</TableCell>
                                        <TableCell className="text-right font-semibold">Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.order.orderItemsList.map((item, index) => (
                                        <TableRow key={index} className="border-b">
                                            <TableCell className="flex flex-row items-center space-x-4 flex">
                                                <img src={item.productImage} alt={item.productName} className="w-12 h-12 object-cover" />

                                            </TableCell>
                                            <TableCell className="text-center">{item.productName}</TableCell>

                                            <TableCell className="text-center">{item.productQuantity}</TableCell>
                                            <TableCell className="text-right">${item.itemTotalPrice.toFixed(2)}</TableCell>
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
