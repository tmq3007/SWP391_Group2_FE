import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavbarHomePage } from "../Navbar/NavbarHomePage";

// Popup component for showing success message
const Popup = ({ message }) => (
    <div style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "40px",              // Increased padding
        backgroundColor: "#ffffff",
        borderRadius: "15px",          // Slightly larger border radius
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.3)",  // Deeper shadow for emphasis
        zIndex: 1000,
        textAlign: "center",
        width: "300px",                // Width adjustment for larger popup
    }}>
        <p style={{ fontSize: "22px", color: "#00796b", fontWeight: "bold" }}>{message}</p>  {/* Larger font size */}
    </div>
);


const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Access `amount`, `accountInfo`, and `orderId` from location.state
    const { amount = 5000, accountInfo = "okok", orderId } = location.state || {};

    const MY_BANK = {
        BANK_ID: "MBBank",
        ACCOUNT_ID: "99999300799999"
    };

    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [showPopup, setShowPopup] = useState(false);  // State to show popup
    const description = accountInfo;
    const vietQrContent = `https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${MY_BANK.ACCOUNT_ID}-qr_only.png?amount=${amount}&addInfo=${description}&accountName=${accountInfo}`;

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/payment-time-out');
        }, 120000);

        return () => clearTimeout(timer);
    }, [navigate]);

    useEffect(() => {
        // Check payment status every second
        const interval = setInterval(() => {
            if (!paymentSuccess) {
                checkPaid(amount, description);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [amount, description, paymentSuccess]);

    async function checkPaid(price, content) {
        try {
            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbxpG2eiN-BiWieYCoGF5IIp_2FbwYA4vrBqzLQtv43oI53zH5n8AqyzL8DcG6s_Hw4g/exec"
            );
            const data = await response.json();
            const lastPaid = data.data[data.data.length - 1];
            const lastPrice = lastPaid["Giá trị"];
            const lastContent = lastPaid["Mô tả"];

            if (price >= lastPrice && lastContent.includes(content)) {
                setPaymentSuccess(true); // Update the payment success state
                setShowPopup(true);      // Show the popup

                //set True o day
            } else {
                console.log("Không thành công");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // If payment is successful, show popup and navigate to home after 1 second
        if (paymentSuccess) {
            const timer = setTimeout(() => {
                setShowPopup(false);  // Hide popup after 1 second
                navigate('/');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [paymentSuccess, navigate]);

    return (
        <div style={{ fontFamily: "Roboto, sans-serif", padding: "40px", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <NavbarHomePage />

            <div style={{ maxWidth: "800px", width: "100%", marginTop: "50px", padding: "30px", borderRadius: "20px", boxShadow: "0 8px 20px rgba(0, 128, 128, 0.15)", backgroundColor: "#ffffff", display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ flex: "1", textAlign: "left", padding: "20px" }}>
                    <h2 style={{ color: "#00796b", fontWeight: "bold", fontSize: "26px", marginBottom: "20px" }}>Thông tin thanh toán</h2>

                    <p style={{fontSize: "18px", margin: "15px 0", color: "#004d40"}}>
                        Số tiền: <strong style={{color: "#d32f2f"}}>{amount.toLocaleString('vi-VN')} VND</strong>
                    </p>


                    <p style={{fontSize: "18px", margin: "15px 0", color: "#004d40"}}>
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
