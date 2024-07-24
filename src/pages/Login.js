import React from 'react';
import { Container, CssBaseline, Typography, Box } from '@mui/material';
import LoginForm from '../components/LoginForm';

const Login = () => {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '90vh',
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <LoginForm />
            </Box>
        </Container>
    );
}

export default Login;