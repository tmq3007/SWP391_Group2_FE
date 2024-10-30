import React, {useEffect, useState} from 'react';
import {Box, Button, Dialog, DialogContent, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import moment from "moment";

const CustomerPaymentList = ({ chosenAddress, chosenPhone, item, note }) => {
    const address = chosenAddress;
    const phone = chosenPhone;
    const items = item;
    const cnote = note;
    console.log(items,phone,address);
    const token = localStorage.getItem("jwt");
    const id = jwtDecode(token).userId;
    const [openPlaceOrder, setOpenPlaceOrder] = useState(false);
    const [openCancelOrder, setOpenCancelOrder] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const handleCloseWarning = () => {
        setOpenWarning(false);
    }
    const handleClosePlaceOrder = () => {
        setOpenPlaceOrder(false);
    }
    const navigate = useNavigate();
    const handleCloseCancelOrder = () => {
        setOpenCancelOrder(false);
    }
    const handleSubmitCancelPayment = () => {
        navigate('/');
    };
    const handleSubmitOrderPayment = async () => {
        if(address === undefined || address === null){
            setOpenWarning(true);
        }else {
            console.log("start");
            let orderId = -1;
            const orderNote = cnote;
            const date = new Date();
            const time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            const orderAddress = `${address.city} / ${address.district} / ${address.street} / ${address.subDistrict}`;
            const a = items.reduce((acc, cur) => acc + cur.product.unitSellPrice * cur.quantity, 0);
            const b = items.reduce((acc, cur) => acc + ((cur.product.unitSellPrice * cur.quantity) - ((cur.product.unitSellPrice * cur.quantity) * (cur.product.discount ))), 0);
            console.log(id);
            if (id !== null && id !== undefined) {
                const order = {
                    paymentId: -1,
                    paymentDate: null,
                    orderDate: time,
                    isPaid: false,
                    total: a,
                    finalTotal: b,
                    note: orderNote,
                    address: orderAddress,
                    phone: phone,
                    user: {
                        id: id
                    }
                };
                console.log(order);
                if(items && order){
                    console.log(items,order);
                navigate("/success-place-order",{
                        state: {
                            items: items, // Ensure correct key
                            order: order
                        }
                    });
                }
                else{
                    console.log("Nope -----------------");
                }
            }

        }
    };

// Gọi hàm
// handleSubmitOrderPayment();

    /*items.map((item) => {
        let orderItems = {
            productName: item.product.productName,
            productImage: item.product.pictureUrl,
            productSellPrice: item.product.productSellPrice,
            discount: item.product.discount,
            productQuantity: item.quantity,/ 100
            itemTotalPrice: (item.product.unitSellPrice * item.quantity).toFixed(2),
            finalPrice: ((item.product.unitSellPrice * item.quantity) - ((item.product.unitSellPrice * item.quantity) * (item.product.discount ))).toFixed(2),
            orders: {
                orderId: orderId,
            },
            shop: {
                shopId: item.product.shop.shopId
            }
        };
        console.log("Items",orderItems);
        addOrderItems(orderId,orderItems,token);
        console.log("Check db boy");
    });*/

        // DELETE CHOSEN ITEM FROM CART

        // DISPLAY INFORMATION TO SUCCESS

        /*navigate('/success-place-order');*/

    //////////////////////////////////////////////////////////

    const placeOrder = () => {
        setOpenPlaceOrder(true);
    }
    const cancelOrder = () => {
        setOpenCancelOrder(true);
    }
    const temp = [];
    return (
        <Box sx={{padding: 2}}>
            <Typography variant="h6" marginBottom={"10px"} color={"#019376"}>Items List</Typography>
            {(items.length > 0) && items.map((item, index) => (
                <Box key={index} sx={{display: 'row'}}>
                    <Box width={"100%"} sx={{
                        display: 'flex', justifyContent: 'space-between', padding: 1, marginBottom: 1.5,
                        borderRadius: 2, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white'
                    }}>
                        <div><Typography className="font-semibold" >{`${item.product.productName}`}</Typography>
                            <Typography><span className={"text-green-500"}>{`${item.quantity} `}</span> <span> x </span>
                                <span>{`${item.product.unitSellPrice}`}</span></Typography></div>
                        <div><Typography><span className={"text-green-500 font-semibold"}>{`Sale ${item.product.discount}%`}</span></Typography></div>
                    </Box>
                </Box>
            ))}
            <Box sx={{display: 'flex', flexDirection: 'column',  verticallypaddingTop: '8px', marginTop: 2, fontWeight: 'bold', borderTop: '2px solid black',}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%',fontWeight: 'bold',marginBottom:"10px", marginTop: "10px"}}>
                    <Typography>Total products: </Typography>
                    <Typography sx={{ marginRight:"10px"}}>{ (items.length > 0) ? (items.reduce((total,item) => { return total + item.quantity},0)) : 0}</Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%',widthpadding: 1,marginBottom:"10px"}}>
                    <Typography>Total: </Typography>
                    <Typography sx={{ marginRight:"10px"}} className={"line-through"}>{ (items.length > 0) ? (items.reduce((total,item) =>
                    { return total + (item.quantity * item.product.unitSellPrice)},0)).toFixed(2) : 0}$</Typography>
                </Box>

                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%',marginBottom:"10px"}}>
                    <Typography>Saved: </Typography>
                    <Typography sx={{ marginRight:"10px"}}>{ (items.length > 0) ? (items.reduce((total,item) =>
                    { return total + (item.quantity * item.product.unitSellPrice * (item.product.discount ))},0)).toFixed(2) : 0}$</Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%',fontWeight: 'bold',marginBottom:"10px"}}>
                    <Typography>Final Total: </Typography>
                    <Typography sx={{ marginRight:"10px"}}>
                        { (items.length > 0) ? (items.reduce((total,item) =>
                        { return total + ((item.quantity * item.product.unitSellPrice) - (item.quantity * item.product.unitSellPrice * (item.product.discount)))},0)).toFixed(2) : 0}$
                    </Typography>
                </Box>
            </Box>

            <Typography sx={{color: "#019376",marginTop: "0.75rem"}}>Cash on delivery</Typography>
            <div className='flex justify-center items-center gap-2'>
                <button
                    className='mt-5 border border-solid border-[#019376]
                bg-white text-[#019376] py-2 px-4 rounded
                hover:bg-[#019376] hover:text-white transition duration-300' onClick={placeOrder}>
                    Place order
                </button>
                <button
                    className='mt-5 border border-solid border-[#f00]
                bg-white text-[#f00] py-2 px-4 rounded
                hover:bg-[#f00] hover:text-white transition duration-2000' onClick={cancelOrder}>
                    Cancel
                </button>
            </div>

            <Dialog open={openPlaceOrder} onClose={handleClosePlaceOrder}>
                <DialogContent >
                    <Typography fontSize={"30px"} color={"#019376"} margin={"20px"}>Confirm</Typography>
                    <Button variant={"contained"} color={"primary"} sx={{marginTop:"20px"}} onClick={handleSubmitOrderPayment}>
                        Place order
                    </Button>
                    <Typography marginTop={"20px"} margin={"15px"}>( Click out from the message to close.)</Typography>
                </DialogContent>
            </Dialog>

            <Dialog open={openCancelOrder} onClose={handleCloseCancelOrder}>
                <DialogContent >
                    <Typography fontSize={"30px"} color={"#019376"} margin={"20px"}>Cancel place order</Typography>
                    <Button variant={"contained"} color={"primary"} sx={{marginTop:"20px", marginLeft: "18px"}} onClick={handleSubmitCancelPayment}>
                        Cancel and back to homepage
                    </Button>
                    <Typography marginTop={"20px"} margin={"15px"}>( Click out from the message to close.)</Typography>
                </DialogContent>
            </Dialog>

            <Dialog open={openWarning} onClose={handleCloseWarning}>
                <DialogContent >
                    <Typography fontSize={"30px"} color={"#019376"} margin={"20px"}>Please chose one address</Typography>
                    <Typography marginTop={"20px"} margin={"15px"}>We need the address to ship the goods to you.</Typography>
                    <Typography marginTop={"20px"} margin={"15px"}>( Click out from the message to close.)</Typography>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default CustomerPaymentList;
