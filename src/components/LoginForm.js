import { Button, Stack, Box } from "@mui/material";
import { getMessage } from "../services/MessageService";
import {TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const [error, setError] = useState('');
    const navigate = useNavigate();
    let url =  'http://localhost:8000/v3/olatcg-backend/auth/login';

    const handleSubmit = async (e) => {
        e.preventDefault();
                try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: userEmail,
                        password: password
                    })
                });

                if (!response.ok) {
                    throw new Error('Error!');
                }

                const data = await response.json();

                const token = data.token;

             
                const expiresAt = new Date().getTime() + (1800* 1000); 
                sessionStorage.setItem('auth', JSON.stringify({
                    token: token,
                    expiresAt: expiresAt
                }));

                console.log('Success!');
            } catch (error) {
                console.error('Error in login:', error);
            }

        }
       
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword]  = useState("");
    const [messageEmail, setMessageEmail] = useState("");
    const [messagePassword, setMessagePassword] = useState("");


    //function that receives the form data and exibits them in the console
    /*const handleLogin = (event) => {
        //prevents the page from reload
        event.preventDefault();

        console.log(userEmail);
        console.log(password);
    }*/

    //defines what is considered an valid email address
    const isEmail = () => /^[A-Z0-9._+-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i.test(userEmail);

    //function to check if the user filled in the email input and the if the email address is valid
    const validateEmail = () => {

        //checks if the user filled in the email input
        if(userEmail === "") {
            setMessageEmail(getMessage('login.email.empty'));

        } else{
            setMessageEmail("");
            //checks if the email address is valid
            if(isEmail(userEmail) && !/[._+-]/.test(userEmail[0])) {
                setMessageEmail("");
            } else {
                setMessageEmail(getMessage('login.email.error.message'));
            }
        }
    }

    //function to check if the user filled in the password input
    const validatePassword = () => {
        if(password === "") {
            setMessagePassword(getMessage('login.password.empty'));
        }
        else {
            setMessagePassword("");
        }
    }

    return(
        <Stack sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}>
            
            {/*form*/}            
            <Box method="post" component="form" autoComplete="off" sx={{
                    display: 'inherit',
                    flexDirection: 'inherit',
                    alignItems: 'flex-start',
                    justifyContent: 'justify',
                    textAlign: 'justify',
                }} onSubmit={handleSubmit}>
                    <Box sx={{display: 'inherit', flexDirection: 'inherit', mb: 3}}>
                        <TextField
                        label={getMessage('login.label.email')}
                        id="email" 
                        name="email"  
                        type="text" 
                        onChange={(e) => setUserEmail(e.target.value)} 
                        onBlur={validateEmail}
                        helperText={messageEmail}
                        error={messageEmail !== ""}
                        required />
                    </Box>
                    
                    <Box sx={{display: 'inherit', flexDirection: 'inherit', mb: 3}}>
                        <TextField
                        label={getMessage('login.label.password')}
                        id="password" 
                        name="password"  
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        onBlur={validatePassword}
                        helperText={messagePassword}
                        error={messagePassword !== ""}
                        required />
                    </Box>
                    <Button type="submit" variant="contained" sx={{
                        backgroundColor: 'primary.main',
                        '&:hover':{
                            cursor: 'pointer',
                            backgroundColor: 'primary.light',
                        },
                        alignSelf: 'center'
                    }}
                    disabled={messageEmail!=="" || messagePassword!==""}>{getMessage('login.button.content')}</Button>
            </Box>
        </Stack>        
    );
}

export default LoginForm;