import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const mainTheme = createTheme({
    palette: {
        primary: {
            main: '#009688',
            contrastText: 'white'
        },
        secondary: {
            main: purple[100],
            light: purple[50],
            contrastText: '#1d2b29c9'
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