import { Button, Stack, Box } from "@mui/material";
import { getMessage } from "../services/MessageService";
import {TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext';

const LoginForm = () => {

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const login = useAuth();
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
                    throw new Error('Erro ao fazer login');
                }

                const data = await response.json();

                // Supondo que o backend retorna algo como { token: 'jwt_token_aqui' }
                const token = data.token;

                // Armazena token com timestamp no sessionStorage
                const expiresAt = new Date().getTime() + (1800* 1000); // 30 minutos
                sessionStorage.setItem('auth', JSON.stringify({
                    token: token,
                    expiresAt: expiresAt
                }));

                console.log('Login realizado com sucesso!');
            } catch (error) {
                console.error('Erro no login:', error);
            }


        /*
        setError(''); 

            //conection with the API
        try{
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {'Content-Type' :  'application/json',
                    },
                    body: JSON.stringify({ 
                        username : userEmail, 
                        password: password
                    })
                })

                //session used for storing the user JWT token

                if (!response.ok) {
                throw new Error('Login failed');
                } 

                const data = await response.json();


                //token's time expires in 30 minutes
                const token = data.jwt || data.token;
                if (!token) {
                throw new Error('Token not received');
                }
                
                sessionStorage.setItem("jwtToken", token);
                const expiresAt = Date.now() + (1800 * 1000);
                sessionStorage.setItem("expiresAt", expiresAt.toString());
                console.log('Token salvo no sessionStorage:', token);
                login(data.token, data.expiresAt)
                //after the login is completed, it goes to the home page (a test)
                navigate('/home');

        

            } catch(error){
                console.error(error);
                setError("Error!");
        };*/
    }
    //states used for storing and changing user login data and for defining error messages
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