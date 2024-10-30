import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavbarHomePage } from "../Navbar/NavbarHomePage";
import axios from "axios";

// Popup component for showing success message
const Popup = ({ message }) => (
    <div style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        textAlign: "center",
    }}>
        <p style={{ fontSize: "18px", color: "#00796b" }}>{message}</p>
    </div>
);

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const token = localStorage.getItem("jwt");
    const order = location.state?.order || {};
    const { items, token } = location.state || {};
    // Access `amount`, `accountInfo`, and `orderId` from location.state
    //const { order } = location.state || {};
    const randomInt = Math.floor(Math.random() * 10000) + 1;

    console.log("order",order)
    const MY_BANK = {
        BANK_ID: "MBBank",
        ACCOUNT_ID: "99999300799999"
    };

    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
   // const [hasCheckedPayment, setHasCheckedPayment] = useState(false);

    const  amount = order.finalTotal;
    //const  amount = 8400;
    const accountInfo ="SHOPII"
    const description = accountInfo + randomInt ;
    //const description = "SHOPII1165"
    const vietQrContent = `https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${MY_BANK.ACCOUNT_ID}-qr_only.png?amount=${amount}&addInfo=${description}&accountName=${accountInfo}`;

    /////////
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
                    ((item.product.unitSellPrice * item.quantity) * (item.product.discount  ))
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

            // Delete amount of product in each item, which have been order
            await deleteAmountProducts(items, token);
            // Delete cart items after processing all order items
            await deleteCartItems(items, items[0].userId, token); // Ensure items[0].userId exists
            console.log("Cart items deleted after processing orders.");

        } catch (error) {
            console.error("Error processing order items:", error);
        }
    }
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

    /////////
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/payment-time-out');
        }, 50000);

        return () => clearTimeout(timer);
    }, [navigate]);



    useEffect(() => {
        // Check payment status only once if not already checked
        if (!paymentSuccess  ) {
            const interval = setInterval(() => {
                checkPaid(amount, description);
            }, 2000);

            return () => {
                clearInterval(interval);

            };
        }
    }, [amount, description, paymentSuccess ]);

    useEffect(() => {
        // If payment is successful, show popup and navigate to home after 1 second
        if (paymentSuccess) {
            const timer = setTimeout(() => {
                setShowPopup(false);  // Hide popup after 1 second
                navigate('/');
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [paymentSuccess, navigate]);

    async function checkPaid(price, content) {
        if(paymentSuccess){
            return;
        }else{
            try {
                const response = await fetch(
                    "https://script.google.com/macros/s/AKfycbxpG2eiN-BiWieYCoGF5IIp_2FbwYA4vrBqzLQtv43oI53zH5n8AqyzL8DcG6s_Hw4g/exec"
                );
                const data = await response.json();
                const lastPaid = data.data[data.data.length - 1];
                const lastPrice = lastPaid["Giá trị"];
                const lastContent = lastPaid["Mô tả"];

                if (price >= lastPrice && lastContent.includes(content)) {
                    setPaymentSuccess(true);
                    const response = await addOrder(order, token);
                    const orderId = response.orderId;
                    order.isPaid=true;
                    await processOrderItems(items, orderId, token);
                    setShowPopup(true);
                } else {
                    console.log("Không thành công");
                }
            } catch (error) {
                console.log(error);
            }
        }

    }



    return (
        <div style={{ fontFamily: "Roboto, sans-serif", padding: "40px", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <NavbarHomePage />

            <div style={{ maxWidth: "800px", width: "100%", marginTop: "50px", padding: "30px", borderRadius: "20px", boxShadow: "0 8px 20px rgba(0, 128, 128, 0.15)", backgroundColor: "#ffffff", display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ flex: "1", textAlign: "left", padding: "20px" }}>
                    <h2 style={{ color: "#00796b", fontWeight: "bold", fontSize: "26px", marginBottom: "20px" }}>Thông tin thanh toán</h2>

                    <p style={{ fontSize: "18px", margin: "15px 0", color: "#004d40" }}>
                        Số tiền: <strong style={{ color: "#d32f2f" }}>{amount.toLocaleString()} VND</strong>
                    </p>

                    <p style={{ fontSize: "18px", margin: "15px 0", color: "#004d40" }}>
                        Tài khoản: <strong>{MY_BANK.ACCOUNT_ID}</strong>
                    </p>

                    <p style={{ fontSize: "18px", margin: "15px 0", color: "#004d40" }}>
                        Ngân hàng: <strong>{MY_BANK.BANK_ID}</strong>
                    </p>

                    <p style={{ fontSize: "18px", margin: "15px 0", color: "#004d40" }}>
                        Mô tả: <strong>{description}</strong>
                    </p>
                </div>

                <div style={{ flex: "1", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img src={vietQrContent} alt="VietQR Code" style={{ width: "220px", height: "220px", borderRadius: "15px", border: "3px solid #00796b", boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)" }} />
                </div>
            </div>

            {/* Show Popup if paymentSuccess is true */}
            {showPopup && <Popup message="Thanh toán thành công!" />}
        </div>
    );
};

export default Payment;