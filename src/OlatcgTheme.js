import { createTheme } from '@mui/material/styles';
import { purple, teal } from '@mui/material/colors';

const mainTheme = createTheme({
    palette: {
        primary: {
            main: teal[500],
            light: teal[100],
            contrastText: 'white'
        },
        secondary: {
            main: purple[100],
            light: purple[50],
            contrastText: '#1d2b29c9'
        },
        error: {
            light: '#feefef',
            main: '#c90000',
        },
        warning: { 
            main: '#d7d11a',
            light: '#f7f5be',
        },
        info: {
            main: '#4fc3f7'
        },
        success: {
            main: '#388e3c',
            light: '#acdeae',
        }
    },
});

export default mainTheme;