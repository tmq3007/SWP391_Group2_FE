import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react'; // Uncomment if needed

const RejectedShopCreation = () => {
    const { unverifiedShopId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt');

    const handleNewCreationRequest = () => {
        if (unverifiedShopId) {
            axios.delete(`http://localhost:8080/api/v1/delete-rejected-request/${unverifiedShopId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(() => console.log("Rejected shop request deleted successfully"))
                .catch(error => console.error("Error deleting rejected request:", error));
        }
        navigate("/create-shop");
    };

    const buttonStyles = {
        padding: '10px 20px',
        fontSize: '1rem',
        fontWeight: 'bold',
        background: 'linear-gradient(90deg, #019376, #00b88d)',
        color: '#ffffff',
        borderRadius: '25px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
            background: 'linear-gradient(90deg, #00a37c, #00c9a3)',
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
            transform: 'scale(1.05)',
        },
    };

    return (
        <Container>
            <ImageContainer />
            <Title>Oops! Your Store Creation was Rejected</Title>
            <Message>Please double-check your information and try again.</Message>
            <Message>Details are in your Email</Message>

            <ButtonContainer>
                <Button onClick={() => navigate("/auth/login")} sx={buttonStyles}>
                    Back To Home Page
                </Button>
                <Button onClick={handleNewCreationRequest} sx={buttonStyles}>
                    Create New Shop
                </Button>
            </ButtonContainer>
        </Container>
    );
};

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-color: #f3f4f6;
    text-align: center;
    padding: 20px;
`;

const ImageContainer = styled.div`
    width: 1000px;
    height: 450px;
    background-image: url("https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif");
    background-size: cover;
    background-position: center;
    margin-bottom: 20px;
    transition: transform 0.5s;
    &:hover {
        transform: scale(1.05);
    }
`;

const Title = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 10px;
`;

const Message = styled.p`
    font-size: 1.25rem;
    font-weight: 500;
    color: #4b5563;
    margin: 0 0 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
`;

export default RejectedShopCreation;
