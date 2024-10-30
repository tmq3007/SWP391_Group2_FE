import React, { useState } from 'react';
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import { Button } from "@mui/material";
import axios from "axios";

const RejectedShopCreation = () => {
    const { unverifiedShopId } = useParams(); // Retrieve unverifiedShopId from URL
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt');
    const [userId, setUserId] = useState(null);

    // Delete rejected request
    const handleNewCreationRequest = () => {
        if (unverifiedShopId) {
            axios.delete(`http://localhost:8080/api/v1/delete-rejected-request/${unverifiedShopId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log("Rejected shop request deleted successfully");
                })
                .catch(error => {
                    console.error("Error deleting rejected request:", error);
                });
        }
        navigate("/create-shop");

    };

    return (
        <Container>
            <Title>Oops! Your Store Creation was Rejected</Title>
            <Message>Please double-check your information and try again.</Message>
            <Message>Detail in your Email</Message>
            <div className={"flex"}>
                <StyledWrapper className={"mt-3"} onClick={() => navigate("/auth/login")}>
                    <button className="button">
                        <svg className="svgIcon" viewBox="0 0 448 512">
                            <path
                                d="M257.5 445.1c12.5 12.5 12.5 32.75 0 45.25c-12.5 12.5-32.75 12.5-45.25 0l-192-192C6.344 290.3 0 277.5 0 264s6.344-26.34 20.25-36.31l192-192c12.5-12.5 32.75-12.5 45.25 0c12.5 12.5 12.5 32.75 0 45.25L97.25 232H416c17.67 0 32 14.33 32 32s-14.33 32-32 32H97.25L257.5 445.1z"/>
                        </svg>
                    </button>
                </StyledWrapper>

                <Button
                    onClick={handleNewCreationRequest}
                    sx={{
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
                    }}
                >
                    Create New Shop
                </Button>

            </div>
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

const StyledWrapper = styled.div`
    .button {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgb(20, 20, 20);
        border: none;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 0px 0px 4px rgba(180, 160, 255, 0.253);
        cursor: pointer;
        transition-duration: 0.3s;
        overflow: hidden;
        position: relative;
    }
    .svgIcon {
        width: 12px;
        transition-duration: 0.3s;
    }

    .svgIcon path {
        fill: white;
    }

    .button:hover {
        width: 140px;
        border-radius: 50px;
        transition-duration: 0.3s;
        background-color: rgb(181, 160, 255);
        align-items: center;
    }

    .button:hover .svgIcon {
        transition-duration: 0.3s;
        transform: translateY(-200%);
    }

    .button::before {
        position: absolute;
        bottom: -20px;
        content: "Back to Home Page";
        color: white;
        font-size: 0px;
    }

    .button:hover::before {
        font-size: 13px;
        opacity: 1;
        bottom: unset;
        transition-duration: 0.3s;
    }
`;

export default RejectedShopCreation;
