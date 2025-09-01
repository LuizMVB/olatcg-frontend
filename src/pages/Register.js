import React from 'react';
import {Stack} from "@mui/system";
import { Box, Paper, Typography } from "@mui/material";
import { getMessage } from "../services/MessageService";
import RegisterForm from '../components/RegisterForm';

const Register = () => {
    return <>
    <Stack>
        <Box 
        sx={{ display: 'flex',
              width: 900,
              height: 750,
              borderRadius: 3,
              bgcolor: '#fff',
              marginTop: 10,
              marginBottom: 10,
              paddingTop: 10,
              alignSelf: 'center',
              textAlign:'center',
              boxShadow: 3,
              flexDirection: 'column'
            }}>
            <Typography variant='h4' color="#1A7A69" marginBottom={5}>
               {getMessage('register.title')} 
            </Typography>
            <RegisterForm />
        </Box>
        
    </Stack>
    </>
}

export default Register;