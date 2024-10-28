import React from "react";
import styled from "styled-components";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";

const PaymentTimeOut = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            <p className="mt-5 text-lg font-semibold text-gray-700">
                Time Out
            </p>
            <StyledWrapper className={"mt-3"} onClick={() => navigate("/payment")}>
                <button className="button">
                    <svg className="svgIcon" viewBox="0 0 448 512">
                        <path
                            d="M257.5 445.1c12.5 12.5 12.5 32.75 0 45.25c-12.5 12.5-32.75 12.5-45.25 0l-192-192C6.344 290.3 0 277.5 0 264s6.344-26.34 20.25-36.31l192-192c12.5-12.5 32.75-12.5 45.25 0c12.5 12.5 12.5 32.75 0 45.25L97.25 232H416c17.67 0 32 14.33 32 32s-14.33 32-32 32H97.25L257.5 445.1z"/>
                    </svg>
                </button>
            </StyledWrapper>
        </div>
    );
};

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
    content: "Back to Orders";
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

export default PaymentTimeOut;
