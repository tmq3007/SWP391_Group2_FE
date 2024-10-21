import React from 'react';
import { Box, Typography } from "@mui/material";
import {useNavigate} from "react-router-dom";

const CustomerPaymentList = ({ items }/*an array of order item pass from customer payment - from cart*/) => {

    // Calculate total amount
    const totalAmount = items.reduce((total, item) => total + item.amount * item.price, 0);
    const navigate = useNavigate();
    const handleCancelPayment = () => {
        navigate('/');
        return null;
    };

    return (
        <Box sx={{padding: 2}}>
            <Typography variant="h6">Items List</Typography>
            {items.map((item, index) => (
                <Box key={index} sx={{display: 'flex', justifyContent: 'space-between', padding: 1, marginBottom: 1.5}}>
                    <Typography>{`${item.amount} x ${item.name}`}</Typography>
                    <Typography>{`$${item.price.toFixed(2)}`}</Typography>
                </Box>
            ))}
            <Box sx={{
                paddingTop: "8px",
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 2,
                fontWeight: 'bold',
                borderTop: '2px solid black'
            }}>
                <Typography>Total Amount:</Typography>
                <Typography>{`$${totalAmount.toFixed(2)}`}</Typography>
            </Box>
            <Typography sx={{color: "#019376",marginTop: "0.75rem"}}>Cash on delivery</Typography>
            <div className='flex justify-center items-center gap-2'>
                <button
                    className='mt-5 border border-solid border-[#019376]
                bg-white text-[#019376] py-2 px-4 rounded
                hover:bg-[#019376] hover:text-white transition duration-300'>
                    Place order
                </button>
                <button
                    className='mt-5 border border-solid border-[#f00]
                bg-white text-[#f00] py-2 px-4 rounded
                hover:bg-[#f00] hover:text-white transition duration-2000' onClick={handleCancelPayment}>
                    Cancel
                </button>
            </div>
        </Box>
    );
};

export default CustomerPaymentList;
