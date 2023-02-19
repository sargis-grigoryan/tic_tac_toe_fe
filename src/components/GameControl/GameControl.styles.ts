import { Button as _Button, FormControl as _FormControl, Paper as _Paper, styled, Typography } from '@mui/material';

export const Paper = styled(_Paper)`
    display: flex;
    justify-content: center;
    padding: 24px;
    min-height: 320px;
`;

export const Button = styled(_Button)`
    margin-top: 24px;
`;

export const FormControl = styled(_FormControl)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

export const PlayerTurn = styled(Typography)`
    margin-top: 50px;
    font-size: 1.2rem;
`;

export const ClipboardRow = styled(Typography)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const YouWin = styled(Typography)`
    margin-top: 60px;
    font-size: 2rem;
    font-weight: bold;
    color: green;
`;

export const GameOver = styled(Typography)`
    margin-top: 60px;
    font-size: 2rem;
    font-weight: bold;
    color: red;
`;
