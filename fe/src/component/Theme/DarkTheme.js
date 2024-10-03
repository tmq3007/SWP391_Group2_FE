import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: "#F3F4F6",
        },
        secondary: {
            main: '#5A20CB',
        },
        black: {
            main: '#242B2E',
        },
        background: {
            main: '#242B2E',
            default: '#242B2E',
            paper: '#242B2E',
        },
        textColor: {
            main: '#ffffff',
        },
    },
});

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: "#ffffff",
        },
        secondary: {
            main: '#5A20CB',
        },
        background: {
            main: '#ffffff',
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        textColor: {
            main: '#111111',
        },
        green: {
            main: '#039375',
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
});
