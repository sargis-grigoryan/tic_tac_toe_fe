import { Paper, styled } from "@mui/material";

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
    gap: 8px;
    position: absolute;
    width: calc(100% - 24px);
    height: calc(100% - 24px);
    padding: 12px;
`;

export const Row = styled("div")`
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    gap: 8px;
`;

export const Cell = styled("div")`
    flex-grow: 1;
    border: 1px solid grey;
    border-radius: 4px;
`;
