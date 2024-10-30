import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const PaymentTimeOut = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Title>Oops! Time Is Out</Title>
            <Message>Please make payment again.</Message>
            <StyledButton
                onClick={() => navigate("/")}
            >
                Back To Home Page
            </StyledButton>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f3f4f6; /* Light gray background */
    text-align: center;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    color: #1f2937; /* Dark gray */
    margin-bottom: 10px;
`;

const Message = styled.p`
    font-size: 1.25rem;
    font-weight: 500;
    color: #4b5563; /* Medium gray */
    margin: 0 0 20px;
`;

const StyledButton = styled(Button)`
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: bold;
    background: linear-gradient(90deg, #019376, #00b88d);
    color: #ffffff;
    border-radius: 25px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        background: linear-gradient(90deg, #00a37c, #00c9a3);
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
        transform: scale(1.05);
    }
`;

export default PaymentTimeOut;
