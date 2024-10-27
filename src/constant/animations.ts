import { keyframes } from 'styled-components';

export const allTouchTopDown = keyframes`
    0% {
        transform: rotateX(0deg) translateY(0px);
    }
    50% {
        transform: rotateX(0deg) translateY(-20px);
    }
    100% {
        transform: rotateX(0deg) translateY(0px);
    }
`;

export const fadeInDown = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const rotate4 = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;

export const dash4 = keyframes`
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 90, 200;
        stroke-dashoffset: -35px;
    }

    100% {
        stroke-dashoffset: -125px;
    }
`;
