import { Button as _Button, FormControl as _FormControl, Paper as _Paper, styled } from '@mui/material';

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
`;