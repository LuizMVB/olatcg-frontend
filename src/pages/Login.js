import {Box, Stack, Typography, Link} from '@mui/material';
import { getMessage } from '../services/MessageService';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigateTo = useNavigate();

    return (
    <Stack sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'justify',
    }}>
        <Box sx={{
            display: 'inherit',
            flexDirection: 'inherit',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'justify',
            borderColor: '#cfd1d1',
            borderRadius: '10px',
            backgroundColor: '#fcfcfc',
            minHeight: '500px',
            minWidth: '400px',
            mt: '40px',
            mb: '40px',
            boxShadow: 4,
            p: '5px',
        }}>
            {/* form title */}
            <Typography variant='h4' component='h4' sx={{
                color: 'primary.main',
                mt: 8,
                mb: 6,
                fontWeight: 'bold'
            }}>
                {getMessage('login.title')}
            </Typography>

            {/* form */}
            <LoginForm />

            {/* link to the ‘/register’ page */}
            <Link underline='hover' component='button' onClick={() => {navigateTo('/register')}}
            sx={{
                cursor: 'pointer', 
                m: 5, 
                fontWeight: 'bold',
                '&:hover': {
                    cursor: 'pointer',
            }}}>
                <Typography variant='p' component='p'>
                    {getMessage('login.user.not.registered')}
                </Typography>
            </Link>    
        </Box>
    </Stack>
    );    
}

export default Login; 