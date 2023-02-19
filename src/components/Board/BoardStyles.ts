import { Paper, styled } from "@mui/material";
import x_image from '../../assets/images/x.png';
import o_image from '../../assets/images/o.png';

export const BoardContainer = styled(Paper)`
    width: 50%;
    position: relative;

    &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }
`;

export const AbsoluteBoard = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: absolute;
    width: calc(100% - 24px);
    height: calc(100% - 24px);
    padding: 12px;
`;

export const Row = styled("div")`
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    gap: 4px;
`;

export const Cell = styled("div")`
    flex-grow: 1;
    border: 1px solid grey;
    border-radius: 4px;
    background-size: contain;
    background-position: center;

    &.x-cell {
        background-image: url(${x_image});
    }

    &.o-cell {
        background-image: url(${o_image});
    }

    &.win {
        animation: flip-cell 0.7s linear infinite;
    }

    [data-is-active="true"][data-turn="x"][data-player-type="x"]
     &:not(.x-cell):not(.o-cell):hover {
        background-image: url(${x_image});
        opacity: 0.6;
    }

    [data-is-active="true"][data-turn="o"][data-player-type="o"]
     &:not(.x-cell):not(.o-cell):hover {
        background-image: url(${o_image});
        opacity: 0.6;
    }

    @keyframes flip-cell {
        0% {
          transform: rotate3d(0, 1, 0, 0deg);
        }
        50% {
          transform: rotate3d(0, 1, 0, -90deg);
        }
        100% {
          transform: rotate3d(0, 1, 0, 0deg);
        }
    }
`;
