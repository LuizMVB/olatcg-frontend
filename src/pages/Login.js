import Logo from '../static/images/logo.png';
import {Box, Stack, Typography, Button} from '@mui/material';
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
            <Button onClick={() => {navigateTo('/register')}}  variant="text" size="small" 
            sx={{
                cursor: 'pointer', 
                m: 5, 
                '&:hover': {
                    cursor: 'pointer',
                    color: 'primary.light'
            }}}>
                <Typography variant='h6' component='div'>
                    {getMessage('login.user.not.registered')}
                </Typography>
            </Button>
            <Box sx={{mb: 5}}>
                 <img src={Logo} alt="olATCG's logo" width={90} height={90} />
            </Box>    
        </Box>
    </Stack>
    );    
}

export default Login; 