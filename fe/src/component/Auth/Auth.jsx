import React, { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Function to check if a token exists
    const hasToken = () => {
        return !!localStorage.getItem('jwt'); // Adjust based on where you store the token
    };

    useEffect(() => {
        // If token exists, redirect to homepage
        if (hasToken() && location.pathname === '/auth/login') {
            navigate('/');
        }
    }, [navigate]);

    const handleOnClose = () => {
        navigate('/');
    };

    return (
        <>
            <Modal
                onClose={handleOnClose}
                open={location.pathname === '/auth/login' || location.pathname === '/auth/register'}>
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    outline: "none",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}>
                    {location.pathname === '/auth/register' ? <RegisterForm /> : <LoginForm />}
                </Box>
            </Modal>
        </>
    );
};

export default Auth;
