import { createTheme } from '@mui/material/styles';

const mainTheme = createTheme({
    palette: {
        primary: {
            main: '#009688',
            contrastText: 'white'
        },
        secondary: {
            main: '#f3e5f5',
            contrastText: '#9c27b0'
        },
        error: {
            light: '#feefef',
            main: '#c90000c0',
        },
        warning: { 
            main: '#d7d11af0'
        },
        info: {
            main: '#4fc3f7'
        },
        success: {
            main: '#388e3c'
        }
    },
});

export default mainTheme;