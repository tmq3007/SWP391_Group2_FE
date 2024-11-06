import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Processing = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100 -mt-9">
            {/* Loader Animation */}
            <StyledWrapper>
                <div className="wheel-and-hamster" role="img" aria-label="Orange and tan hamster running in a metal wheel">
                    <div className="wheel" />
                    <div className="hamster">
                        <div className="hamster__body">
                            <div className="hamster__head">
                                <div className="hamster__ear" />
                                <div className="hamster__eye" />
                                <div className="hamster__nose" />
                            </div>
                            <div className="hamster__limb hamster__limb--fr" />
                            <div className="hamster__limb hamster__limb--fl" />
                            <div className="hamster__limb hamster__limb--br" />
                            <div className="hamster__limb hamster__limb--bl" />
                            <div className="hamster__tail" />
                        </div>
                    </div>
                    <div className="spoke" />
                </div>
            </StyledWrapper>
            {/* Processing Message */}
            <p className="mt-5 text-lg font-semibold text-gray-700">
                Your request is processing...
            </p>

            {/* Back Button */}
            <StyledWrapper className={"mt-3"} onClick={() => navigate("/auth/login")}>
            <button className="pushable">
                <span className="shadow" />
                <span className="edge" />
                <span className="front"> Back To Login Page </span>
            </button>
        </StyledWrapper>

        </div>
    );
};

// Styled Wrapper
const StyledWrapper = styled.div`
    .wheel-and-hamster {
        --dur: 1s;
        position: relative;
        width: 12em;
        height: 12em;
        font-size: 14px;
    }

    .wheel,
    .hamster,
    .hamster div,
    .spoke {
        position: absolute;
    }

    .wheel,
    .spoke {
        border-radius: 50%;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .wheel {
        background: radial-gradient(
                100% 100% at center,
                hsla(0, 0%, 60%, 0) 47.8%,
                hsl(0, 0%, 60%) 48%
        );
        z-index: 2;
    }

    .hamster {
        animation: hamster var(--dur) ease-in-out infinite;
        top: 50%;
        left: calc(50% - 3.5em);
        width: 7em;
        height: 3.75em;
        transform: rotate(4deg) translate(-0.8em, 1.85em);
        transform-origin: 50% 0;
        z-index: 1;
    }

    .hamster__head {
        animation: hamsterHead var(--dur) ease-in-out infinite;
        background: hsl(30, 90%, 55%);
        border-radius: 70% 30% 0 100% / 40% 25% 25% 60%;
        box-shadow: 0 -0.25em 0 hsl(30, 90%, 80%) inset,
        0.75em -1.55em 0 hsl(30, 90%, 90%) inset;
        top: 0;
        left: -2em;
        width: 2.75em;
        height: 2.5em;
        transform-origin: 100% 50%;
    }

    .hamster__ear {
        animation: hamsterEar var(--dur) ease-in-out infinite;
        background: hsl(0, 90%, 85%);
        border-radius: 50%;
        box-shadow: -0.25em 0 hsl(30, 90%, 55%) inset;
        top: -0.25em;
        right: -0.25em;
        width: 0.75em;
        height: 0.75em;
        transform-origin: 50% 75%;
    }

    .hamster__eye {
        animation: hamsterEye var(--dur) linear infinite;
        background-color: hsl(0, 0%, 0%);
        border-radius: 50%;
        top: 0.375em;
        left: 1.25em;
        width: 0.5em;
        height: 0.5em;
    }

    .hamster__nose {
        background: hsl(0, 90%, 75%);
        border-radius: 35% 65% 85% 15% / 70% 50% 50% 30%;
        top: 0.75em;
        left: 0;
        width: 0.2em;
        height: 0.25em;
    }

    .hamster__body {
        animation: hamsterBody var(--dur) ease-in-out infinite;
        background: hsl(30, 90%, 90%);
        border-radius: 50% 30% 50% 30% / 15% 60% 40% 40%;
        box-shadow: 0.1em 0.75em 0 hsl(30, 90%, 55%) inset,
        0.15em -0.5em 0 hsl(30, 90%, 80%) inset;
        top: 0.25em;
        left: 2em;
        width: 4.5em;
        height: 3em;
        transform-origin: 17% 50%;
        transform-style: preserve-3d;
    }

    .hamster__limb--fr,
    .hamster__limb--fl {
        clip-path: polygon(0 0, 100% 0, 70% 80%, 60% 100%, 0% 100%, 40% 80%);
        top: 2em;
        left: 0.5em;
        width: 1em;
        height: 1.5em;
        transform-origin: 50% 0;
    }

    .hamster__limb--fr {
        animation: hamsterFRLimb var(--dur) linear infinite;
        background: linear-gradient(hsl(30, 90%, 80%) 80%, hsl(0, 90%, 75%) 80%);
        transform: rotate(15deg) translateZ(-1px);
    }

    .hamster__limb--fl {
        animation: hamsterFLLimb var(--dur) linear infinite;
        background: linear-gradient(hsl(30, 90%, 90%) 80%, hsl(0, 90%, 85%) 80%);
        transform: rotate(15deg);
    }

    .hamster__limb--br,
    .hamster__limb--bl {
        border-radius: 0.75em 0.75em 0 0;
        clip-path: polygon(
                0 0,
                100% 0,
                100% 30%,
                70% 90%,
                70% 100%,
                30% 100%,
                40% 90%,
                0% 30%
        );
        top: 1em;
        left: 2.8em;
        width: 1.5em;
        height: 2.5em;
        transform-origin: 50% 30%;
    }

    .hamster__limb--br {
        animation: hamsterBRLimb var(--dur) linear infinite;
        background: linear-gradient(hsl(30, 90%, 80%) 90%, hsl(0, 90%, 75%) 90%);
        transform: rotate(-25deg) translateZ(-1px);
    }

    .hamster__limb--bl {
        animation: hamsterBLLimb var(--dur) linear infinite;
        background: linear-gradient(hsl(30, 90%, 90%) 90%, hsl(0, 90%, 85%) 90%);
        transform: rotate(-25deg);
    }

    .hamster__tail {
        animation: hamsterTail var(--dur) linear infinite;
        background: hsl(0, 90%, 85%);
        border-radius: 0.25em 50% 50% 0.25em;
        box-shadow: 0 -0.2em 0 hsl(0, 90%, 75%) inset;
        top: 1.5em;
        right: -0.5em;
        width: 1em;
        height: 0.5em;
        transform: rotate(30deg) translateZ(-1px);
        transform-origin: 0.25em 0.25em;
    }

    .spoke {
        animation: spoke var(--dur) linear infinite;
        background: radial-gradient(
                100% 100% at center,
                hsl(0, 0%, 60%) 4.8%,
                hsla(0, 0%, 60%, 0) 5%
        ),
        linear-gradient(
                hsla(0, 0%, 55%, 0) 46.9%,
                hsl(0, 0%, 65%) 47% 52.9%,
                hsla(0, 0%, 65%, 0) 53%
        ) 50% 50% / 99% 99% no-repeat;
    }

    /* Animations */
    @keyframes hamster {
        from,
        to {
            transform: rotate(4deg) translate(-0.8em, 1.85em);
        }

        50% {
            transform: rotate(0) translate(-0.8em, 1.85em);
        }
    }

    @keyframes hamsterHead {
        from,
        25%,
        50%,
        75%,
        to {
            transform: rotate(0);
        }

        12.5%,
        37.5%,
        62.5%,
        87.5% {
            transform: rotate(8deg);
        }
    }

    @keyframes hamsterEye {
        from,
        90%,
        to {
            transform: scaleY(1);
        }

        95% {
            transform: scaleY(0);
        }
    }

    @keyframes hamsterEar {
        from,
        25%,
        50%,
        75%,
        to {
            transform: rotate(0);
        }

        12.5%,
        37.5%,
        62.5%,
        87.5% {
            transform: rotate(12deg);
        }
    }

    @keyframes hamsterBody {
        from,
        25%,
        50%,
        75%,
        to {
            transform: rotate(0);
        }

        12.5%,
        37.5%,
        62.5%,
        87.5% {
            transform: rotate(-2deg);
        }
    }

    @keyframes hamsterFRLimb {
        from,
        25%,
        50%,
        75%,
        to {
            transform: rotate(50deg) translateZ(-1px);
        }

        12.5%,
        37.5%,
        62.5%,
        87.5% {
            transform: rotate(-30deg) translateZ(-1px);
        }
    }

    @keyframes hamsterFLLimb {
        from,
        25%,
        50%,
        75%,
        to {
            transform: rotate(-30deg);
        }

        12.5%,
        37.5%,
        62.5%,
        87.5% {
            transform: rotate(50deg);
        }
    }

    @keyframes hamsterBRLimb {
        from,
        25%,
        50%,
        75%,
        to {
            transform: rotate(-60deg) translateZ(-1px);
        }

        12.5%,
        37.5%,
        62.5%,
        87.5% {
            transform: rotate(20deg) translateZ(-1px);
        }
    }

    @keyframes hamsterBLLimb {
        from,
        25%,
        50%,
        75%,
        to {
            transform: rotate(20deg);
        }

        12.5%,
        37.5%,
        62.5%,
        87.5% {
            transform: rotate(-60deg);
        }
    }

    @keyframes hamsterTail {
        from,
        25%,
        50%,
        75%,
        to {
            transform: rotate(30deg) translateZ(-1px);
        }

        12.5%,
        37.5%,
        62.5%,
        87.5% {
            transform: rotate(10deg) translateZ(-1px);
        }
    }

    @keyframes spoke {
        from {
            transform: rotate(0);
        }

        to {
            transform: rotate(-1turn);
        }
    }

    .pushable {
        position: relative;
        background: transparent;
        padding: 0px;
        border: none;
        cursor: pointer;
        outline-offset: 4px;
        outline-color: deeppink;
        transition: filter 250ms;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    .shadow {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: hsl(226, 25%, 69%);
        border-radius: 8px;
        filter: blur(2px);
        will-change: transform;
        transform: translateY(2px);
        transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
    }

    .edge {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border-radius: 8px;
        background: linear-gradient(
                to right,
                hsl(248, 39%, 39%) 0%,
                hsl(248, 39%, 49%) 8%,
                hsl(248, 39%, 39%) 92%,
                hsl(248, 39%, 29%) 100%
        );
    }

    .front {
        display: block;
        position: relative;
        border-radius: 8px;
        background: hsl(248, 53%, 58%);
        padding: 16px 32px;
        color: white;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        font-size: 1rem;
        transform: translateY(-4px);
        transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
    }

    .pushable:hover {
        filter: brightness(110%);
    }

    .pushable:hover .front {
        transform: translateY(-6px);
        transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
    }

    .pushable:active .front {
        transform: translateY(-2px);
        transition: transform 34ms;
    }

    .pushable:hover .shadow {
        transform: translateY(4px);
        transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
    }

    .pushable:active .shadow {
        transform: translateY(1px);
        transition: transform 34ms;
    }

    .pushable:focus:not(:focus-visible) {
        outline: none;
    }

    @keyframes dashArray {
        0% { stroke-dasharray: 0 1 359 0; }
        50% { stroke-dasharray: 0 359 1 0; }
        100% { stroke-dasharray: 359 1 0 0; }
    }

    @keyframes spinDashArray {
        0%, 100% { stroke-dasharray: 270 90; }
        50% { stroke-dasharray: 0 360; }
    }

    @keyframes dashOffset {
        0% { stroke-dashoffset: 365; }
        100% { stroke-dashoffset: 5; }
    }

    @keyframes spin {
        0%, 12.5%, 100% { transform: rotate(0deg); }
        25%, 37.5% { transform: rotate(270deg); }
        50%, 62.5% { transform: rotate(540deg); }
        75%, 87.5% { transform: rotate(810deg); }
    }
`;

export default Processing;
