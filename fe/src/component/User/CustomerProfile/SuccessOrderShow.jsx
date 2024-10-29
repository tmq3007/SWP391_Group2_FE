import React, {useEffect, useState} from 'react'
import {NavbarHomePage} from "../../Navbar/NavbarHomePage";
import {useLocation, useNavigate} from "react-router-dom";
import {Container} from "@mui/joy";
import {Alert, Button, Dialog, DialogContent, Divider, Snackbar, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import EditIcon from '@mui/icons-material/Edit';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import {Discount, Money} from "@mui/icons-material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import StoreIcon from '@mui/icons-material/Store';
import PhoneIcon from '@mui/icons-material/Phone';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import PersonIcon from '@mui/icons-material/Person';
import PaidIcon from '@mui/icons-material/Paid';
import QrCodeIcon from '@mui/icons-material/QrCode';

const getUserName = async (id, jwt) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/users/getUsername/${id}`, {
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

/////////////////////////////////////////////////////////////////////////
//    FOR SET IS PAID   FOR SET IS PAID  FOR SET IS PAID  FOR SET IS PAID
//  FOR SET IS PAID   FOR SET IS PAID  FOR SET IS PAID  FOR SET IS PAID
/////////////////////////////////////////////////////////////////////////
const setIsPaid = async (id, jwt, choice) => {
    let url = "";
    switch (i){
        case 1:{ // set ISPAID to true
            url = `http://localhost:8080/api/v1/orders/isPaidToTrue/${id}`
            break;
        }
        case 2:{ // set ISPAID to false
            url = `http://localhost:8080/api/v1/orders/isPaidToFalse/${id}`
            break;
        }
    }
    if(url !== ""){
    try {
        const response = await axios.patch(url, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching user data:", error);
        throw error;
    }
    }else{
        console.log("Payment failed!");
    }
};

const addOrder = async (order, jwt) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/orders`,order, {
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

const deleteCartItem = async (uid,oid, jwt) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/v1/cart/delete/user/${uid}/cartItem/${oid}`, {
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

async function deleteCartItems(items, userId, token) {
    const deletePromises = items.map((item) => deleteCartItem(userId, item.id, token)); // No need for async/await here

    try {
        await Promise.all(deletePromises);
        console.log('All items deleted successfully');
    } catch (error) {
        console.error('Error deleting items:', error);
    }
}
const addOrderItems = async (id,orderItems, jwt) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/orderItems/${id}`,orderItems, {
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

const deleteAmountProduct = async (id,amount,token) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/v1/products/deleteAmount/${id}/${amount}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching user data:", error);
        throw error;
    }
}
const deleteAmountProducts = async (items, jwt) => {
    const deleteAmountPromises = items.map((item) => deleteAmountProduct(item.product.productId, item.quantity, jwt));
    try {
        await Promise.all(deleteAmountPromises);
        console.log('All items deleted successfully');
    } catch (error) {
        console.error('Error deleting items:', error);
    }
};
async function processOrderItems(items, orderId, token) {
    const orderItemPromises = items.map(async (item) => {
        const orderItems = {
            productName: item.product.productName,
            productImage: item.product.pictureUrl,
            productSellPrice: item.product.unitSellPrice,
            discount: item.product.discount,
            productQuantity: item.quantity,
            itemTotalPrice: (item.product.unitSellPrice * item.quantity).toFixed(2),
            finalPrice: (
                (item.product.unitSellPrice * item.quantity) -
                ((item.product.unitSellPrice * item.quantity) * (item.product.discount / 100))
            ).toFixed(2),
            orders: {
                orderId: orderId,
            },
            shop: {
                shopId: item.product.shop.shopId,
            }
        };

        console.log("Order Item:", orderItems);

        // Call addOrderItems and wait for the result
        await addOrderItems(orderId, orderItems, token);
    });

    try {
        // Wait for all order item promises to complete
        await Promise.all(orderItemPromises);
        console.log("All order items processed successfully.");

        // Delete amount of product in each items, which have been order
        await deleteAmountProducts(items, token);
        // Delete cart items after processing all order items
        await deleteCartItems(items, items[0].userId, token); // Ensure items[0].userId exists
        console.log("Cart items deleted after processing orders.");

    } catch (error) {
        console.error("Error processing order items:", error);
    }
}
const SuccessOrderShow = () => {
    const token = localStorage.getItem("jwt");
    const navigate = useNavigate();
    const location = useLocation();
    const order = location.state?.order || {};
    const items = location.state?.items || [];
    const [name, setName] = useState('');
    const [openWarning, setOpenWarning] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const handleOpenSuccess = () => {
        navigate('/');
    }
    const handleOpenWarning = () => {
        setOpenWarning(false);
    }
    const openBackToHomePage = () => {
        setOpenWarning(true);
    }
    useEffect(() => {
        if (order !== undefined && order != null) {
            const fetchUserName = async () => {
            try {
                const userName = await getUserName(order.user.id, token);
                setName(userName.result);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchUserName();}
    }, [order,token]); // Runs only once when component mounts or id/token changes
    console.log(name);
    // update

    /*<Snackbar
        open={snackBarOpen}
        onClose={handleCloseSnackBar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
        <Alert
            onClose={handleCloseSnackBar}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
        >
            {snackBarMessage}
        </Alert>
    </Snackbar>*/

    //

    const backToHomePage = () => {
        navigate("/");
    };
    const payWhenRecieve = async () => {
        try {
            order.paymentId = 1;
            const response = await addOrder(order, token);
            const orderId = response.orderId;
            console.log(response);
            console.log(orderId);
            await processOrderItems(items, orderId, token);
            setOpenSuccess(true);
        } catch (error) {
            console.error("Error adding order:", error);
        }
    }
    const payByQr = async () => {
        try {
            order.paymentId = 2;
            const response = await addOrder(order, token);
            const orderId = response.orderId;
            console.log(response);
            console.log(orderId);
            await processOrderItems(items, orderId, token);
            //
            // NAVIGATE HERE AFTER SUCCESSFUL CREATE ORDER
            //
            setOpenSuccess(true);
        } catch (error) {
            console.error("Error adding order:", error);
        }
    }
    console.log(order, items);

    return (
        <div className="flex-row align-items-center">
            <div className="h-[8%]">
                <NavbarHomePage></NavbarHomePage>
            </div>
            <div className="h-[92%] mt-9 bg-white ml-5 mr-5 rounded-lg grid grid-cols-3 p-2 gap-3"
                 style={{ gridTemplateColumns: '58.3% 40%' }}>
                <div className="shadow-md rounded-lg p-2 h-[80vh]">
                    <header className="text-center font-semibold text-lg text-green-500">Order detail</header>
                    <Box className={"h-[73vh] p-2 rounded-lg overflow-scroll shadow-md "}>
                        {(items.length > 0) && items.map((item, index) => (
                            <Box key={index} className=" rounded-lg border-white" sx={{height: "fitHeight", display: 'grid', gridTemplateRows: '70% 30%', gap: 1,padding: 2,border: '1px solid #ccc', marginBottom: "5px",boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                                <Box sx={{display: 'grid',gridTemplateColumns: '40% 60%',}}>

                                    <div>
                                        <img className={"p-1 rounded-lg w-[18vw] h-[22vh]"} src={item.product.pictureUrl} alt={"Product iamge"}></img>
                                    </div>
                                    <div className="overflow-scroll mt-1">
                                        <div className={"items-center flex gap-2 mb-1 ml-1"}>
                                            <Typography sx={{fontSize: "19px"}}
                                                className={"font-semibold text-xs"}>{item.product.productName}</Typography>
                                        </div>
                                        <div className={"items-center flex gap-2 m-1"}>
                                            <EditIcon className={"text-green-500"} style={{ fontSize: '15px' }}/>
                                            <Typography
                                                className={"font-semibold text-xs"}>{item.product.description}</Typography>
                                        </div>
                                        <div className={"items-center flex gap-2 m-1"}>
                                            <Discount className={"text-green-500 text-xs"} style={{ fontSize: '15px' }}/>
                                            <Typography
                                                className={"font-semibold text-xs"}>Discount: {item.product.discount}%</Typography>
                                        </div>
                                        <div className={"items-center flex gap-2 m-1"}>
                                            <AttachMoneyIcon className={"text-green-500"} style={{ fontSize: '15px' }}/>
                                            <Typography
                                                className={"font-semibold text-1xl line-through"}>{`${item.product.unitSellPrice}$`} / {item.product.measurementUnit}</Typography>
                                        </div>
                                        <div className={"items-center flex gap-2 m-1"}>
                                            <PointOfSaleIcon className={"text-green-500"} style={{ fontSize: '15px' }}/>
                                            <Typography
                                                className={"font-semibold text-1xl text-green-500"}>{`${item.product.unitSellPrice - (item.product.unitSellPrice * (item.product.discount / 100))}$`} / {item.product.measurementUnit}</Typography>
                                        </div>
                                    </div>
                                </Box>
                                <Box className={"ml-2 flex mb-2 pb-4"} sx={{gridTemplateColumns: '65% 35%'}}>
                                    <div className={"row mr-[350px]"}>
                                        <div className={"flex mb-1"}>
                                            <StoreIcon className={"text-green-500"}></StoreIcon>
                                            <Typography>{item.product.shop.shopName}</Typography>
                                        </div>
                                        <div className={"flex mb-1"}>
                                            <PhoneIcon className={"text-green-500"}></PhoneIcon>
                                            <Typography>{item.product.shop.phone}</Typography>
                                        </div>
                                        <div className={"flex mb-1"}>
                                            <FmdGoodIcon className={"text-green-500"}></FmdGoodIcon>
                                            <Typography>{`${item.product.shop.country} - ${item.product.shop.city} - ${item.product.shop.address}`}</Typography>
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        <div className={"flex"}>
                                            <Typography className={"pr"}>{`Quantity: `} </Typography>
                                            <Typography
                                                className={""}> {" "+item.quantity} {item.product.measurementUnit}</Typography>
                                        </div>
                                        <div className={"flex"}>
                                            <Typography className={"pr"}>Total: </Typography>
                                            <Typography
                                                className={"line-through"}>{item.product.unitSellPrice * item.quantity}$</Typography>
                                        </div>
                                        <Typography
                                            className={"font-semibold text-green-500 "}>{item.product.unitSellPrice * item.quantity - (item.product.unitSellPrice * item.quantity * (item.product.discount / 100))}$</Typography>
                                    </div>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </div>
                <div className="shadow-md rounded-lg p-2 ">
                    <header className="text-center font-semibold text-lg text-green-500">Order information</header>
                    <Divider/>
                    <div className={'mt-1 read-only cursor-pointer'}>
                        <div className={"flex mt-2"}>
                            <div className={"flex mb-1 mr-2"}>
                                <PersonIcon className={"mr-2 text-green-500"}></PersonIcon>
                                <Typography>Reciever: </Typography>
                            </div>

                            <Typography>{(name !== '') ? "  " + name : ""}</Typography>
                        </div>

                        <div className={"flex mt-1"}>
                            <div className={"flex mb-1 mr-2"}>
                                <FmdGoodIcon className={"mr-2 text-green-500"}></FmdGoodIcon>
                                <Typography>Address: </Typography>
                            </div>

                            <Typography>{order.address}</Typography>
                        </div>

                        <div className={"flex mt-2"}>
                            <div className={"flex mb-1 mr-2"}>
                                <PhoneIcon className={"mr-2 text-green-500"}></PhoneIcon>
                                <Typography>Phone: </Typography>
                            </div>
                            <Typography>{order.phone}</Typography>
                        </div>
                        <div className={"flex mt-2"}>
                            <div className={"flex mb-1 mr-2"}>
                                <EditIcon className={"mr-2 text-green-500"}></EditIcon>
                                <Typography>Order note:</Typography>
                            </div>
                            <Typography>{(order.note === "") ? "No note for order" : order.note}</Typography>
                        </div>
                    </div>
                    <Divider/>
                    <div style={{maxHeight: "30vh", overflowY: "scroll"}} className={"mb-1"}>
                    <table className="w-[100%]">
                        <thead className="sticky top-0 bg-gray-100 z-10">
                        <tr style={{
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            padding: '10px',
                            backgroundColor: '#f5f5f5',
                            fontWeight: 'bold'
                        }}>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Total</th>
                        </tr>
                        </thead>
                        <tbody  className="w-[100%] overflow-scroll">
                        {items.length > 0 && items.map((item) => (
                            <tr key={item.id} className="mb-2 cursor-pointer" style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                                <td>
                                    <Typography>{item.product.productName}
                                    </Typography>
                                    <Typography className={"flex justify-end text-green-500"}>
                                        <Discount></Discount><span>{item.product.discount.toFixed(2)}%</span>
                                    </Typography>
                                </td>
                                <td>
                                    <Typography className={"line-through"}>{item.quantity} x {item.product.unitSellPrice}$</Typography>
                                    <Typography className={"text-green-500"}>{item.quantity} x {item.product.unitSellPrice - item.product.unitSellPrice * (item.product.discount / 100)}$</Typography>
                                </td>
                                <td>
                                    <Typography className={"line-through"}>{item.quantity * item.product.unitSellPrice}$</Typography>
                                    <Typography className={"text-green-500"}>{(item.quantity * item.product.unitSellPrice - (item.quantity * item.product.unitSellPrice * (item.product.discount / 100))).toFixed(2)}$</Typography>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                    <Divider/>
                    <div className={"grid grid-cols-2"}>
                        <div className={"row justify-center"}>
                            <Typography className={"flex justify-center"}>Total</Typography>
                            <Typography className={"flex justify-center text-green-500"}>Saved</Typography>
                            <Typography className={"flex justify-center text-green-500"}>Final total</Typography>
                        </div>
                        <div className={"row justify-center"}>
                            <Typography className={"flex justify-center line-through"}>{order.total.toFixed(2)}$</Typography>
                            <Typography className={"flex justify-center text-green-500"}>{(order.total - order.finalTotal).toFixed(2)}$</Typography>
                            <Typography className={"flex justify-center text-green-500"}>{order.finalTotal.toFixed(2)}$</Typography>
                        </div>
                    </div>
                    <Divider/>
                    <div className={"flex justify-between w-[100%] mt-3 cursor-pointer"} style={{gridTemplateColumns: "50% 50%"}}>
                        <div onClick={payWhenRecieve}
                            className="w-[50%] flex justify-center items-center group hover:bg-white p-2 rounded transition bg-green-500 border-2 hover:border-green-500">

                            <PaidIcon className="text-white mr-2 group-hover:text-green-500 transition"/>
                            <Typography className="font-semibold text-white group-hover:text-green-500 transition">
                                Pay when receive
                            </Typography>
                        </div>
                        <div onClick={payByQr}
                            className="w-[50%] flex justify-center items-center group hover:bg-white p-2 rounded transition bg-green-500 border-2 hover:border-green-500">
                            <QrCodeIcon className="text-white mr-2 group-hover:text-green-500 transition"/>
                            <Typography className="font-semibold text-white group-hover:text-green-500 transition">
                                QR Pay
                            </Typography>
                        </div>
                    </div>
                    <div className={"flex justify-end"}>
                        <Typography className={"underline hover:text-red-500 text-[1rem] cursor-pointer"} onClick={openBackToHomePage}>Back to home page</Typography>
                    </div>
                </div>
            </div>
            <Dialog open={openWarning} onClose={handleOpenWarning}>
                <DialogContent >
                    <Typography fontSize={"30px"} color={"#019376"} margin={"20px"}>Stop create order</Typography>
                    <Typography marginTop={"20px"} margin={"15px"}>See more items and comeback later.</Typography>
                    <Button onClick={backToHomePage} variant={"contained"} color={"primary"} className={"ml-[20px]"}>Back to home page.</Button>
                    <Typography marginTop={"20px"} margin={"15px"}>( Click out from the message to close.)</Typography>
                </DialogContent>
            </Dialog>

            <Dialog open={openSuccess} onClose={handleOpenSuccess}>
                <DialogContent >
                    <Typography fontSize={"30px"} color={"#019376"} margin={"20px"}>Create order success!</Typography>
                    <Typography marginTop={"20px"} margin={"15px"}>Back to homepage and see more item.</Typography>
                    <Button onClick={handleOpenSuccess} variant={"contained"} color={"primary"} className={"ml-[20px]"}>To home page</Button>
                    <Typography marginTop={"20px"} margin={"15px"}>( Click out from the message to back to homepage.)</Typography>
                </DialogContent>
            </Dialog>
        </div>

    )
}
export default SuccessOrderShow
