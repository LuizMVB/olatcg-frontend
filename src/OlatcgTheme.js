import { createTheme } from '@mui/material/styles';

const mainTheme = createTheme({
    palette: {
        primary: {
            light: '#da9eb2',
            main: '#793882',
            contrastText: 'white'
        },
        secondary: {
            main: '#faf7ff',
            contrastText: 'white'
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