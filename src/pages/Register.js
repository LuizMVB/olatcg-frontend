import React from 'react';
import Logo from '../static/images/logo.png';
import {Stack} from "@mui/system";
import { Box, Paper, Typography } from "@mui/material";
import { getMessage } from "../services/MessageService";
import RegisterForm from '../components/RegisterForm';

const Register = () => {
    return <>
    <Stack>
        <Box 
        sx={{ display: 'flex',
              width: 550,
              height: 1030,
              borderRadius: 3,
              bgcolor: '#fff',
              '&:hover': {
                bgcolor: '#EBFAF4',
              },
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
            <Box sx={{alignSelf:'center'}}>
               <img height={50} width={50} src={Logo} alt="Logo olATCG" /> 
           </Box>
            
        </Box>
        
    </Stack>
    
    </>
}
export default Register;