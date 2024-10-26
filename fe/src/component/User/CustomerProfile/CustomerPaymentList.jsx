import React, {useEffect, useState} from 'react';
import {Box, Button, Dialog, DialogContent, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const getCartData = async (userId, jwt) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/cart/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching user data:", error);
        throw error;
    }
};

const CustomerPaymentList = () => {
    const token = localStorage.getItem("jwt");
    const id = jwtDecode(token).userId;
    const [cart, setCart] = useState(null);
    const [cartItem, setCartItem] = useState([]);
    const [openPlaceOrder, setOpenPlaceOrder] = useState(false);
    const [openCancelOrder, setOpenCancelOrder] = useState(false);
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
    const handleSubmitOrderPayment = () => {
        navigate('/success-place-order');
    };
    // get cart of user and it cart items
    useEffect(() => {
        const fetchData = async () => {
            try {
                const cartData = await getCartData(id, token);
                setCart(cartData.result);
                setCartItem(cartData.result.cartItems || []);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [id, token]);
    console.log("List",cartItem);
    //////////////////////////////////////////////////////////

    const a = (cartItem.length > 0) ? cartItem.reduce((sum, item) => sum + (item.product.unitSellPrice * item.quantity), 0) : 0;
    const b = (cartItem.length > 0) ? cartItem.reduce((sum, item) => sum + ((item.product.unitSellPrice * item.quantity) * (item.product.discount / 100)), 0) : 0;

    const placeOrder = () => {
        setOpenPlaceOrder(true);
    }
    const cancelOrder = () => {
        setOpenCancelOrder(true);
    }
    return (
        <Box sx={{padding: 2}}>
            <Typography variant="h6" marginBottom={"10px"} color={"#019376"}>Items List</Typography>
            {(cartItem.length > 0) && cartItem.map((item, index) => (
                <Box key={index} sx={{display: 'flex'}}>
                <Box width={"80%"} sx={{display: 'row', justifyContent: 'space-between', padding: 1, marginBottom: 1.5,
                    borderRadius: 2, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
                    <Typography>{`${item.product.productName}`}</Typography>
                    <Typography><span className={"text-green-500"}>{`${item.quantity} `}</span> <span> x </span> <span>{`${item.totalPrice}`}</span></Typography>
                </Box>
                    <Box width={"20%"} sx={{display: 'row', justifyContent: 'center', alignContent: "center", padding: 1, marginBottom: 1.5, marginLeft: 1,
                        borderRadius: 2, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
                        <Typography><span className={"text-green-500"}>{`${item.product.discount}%`}</span></Typography>
                    </Box>
                </Box>
            ))}
            <Box sx={{display: 'flex', flexDirection: 'column',  verticallypaddingTop: '8px', marginTop: 2, fontWeight: 'bold', borderTop: '2px solid black',}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%',fontWeight: 'bold',marginBottom:"10px", marginTop: "10px"}}>
                    <Typography>Total products: </Typography>
                    <Typography>{`${(cart !== null) ? cart.totalItem : 0} products`}</Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%',widthpadding: 1,marginBottom:"10px"}}>
                    <Typography>Total: </Typography>
                    <Typography>{a+"$"}</Typography>
                </Box>

                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%',marginBottom:"10px"}}>
                    <Typography>Saved: </Typography>
                    <Typography>{b+"$"}</Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%',fontWeight: 'bold',marginBottom:"10px"}}>
                    <Typography>Final Total: </Typography>
                    <Typography>{`${(cart !== null) ? (a-b) : 0}$`}</Typography>
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
        </Box>
    );
};

export default CustomerPaymentList;
