import {React, useState, sx} from 'react';
import { Box, Typography, Button, TextField, InputLabel, InputAdornment, Alert} from "@mui/material";
import {API_ROUTES} from '../routes/Routes';
import { getMessage } from "../services/MessageService";

const ExperimentForm = () => {

    let url = "http://localhost:8000/v3/olatcg-backend/experiment/" ;
    const maxDescriptionLength = 100
    const maxTitleLength = 20

    const [experimentTitle, setExperimentTitle] = useState('');
    const [experimentDescription, setExperimentDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    
    const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    {/*Autorização com o token */}
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token 983b98f522c9faad02555820fe24108e0b101985",
        },
        body: JSON.stringify({
          title: experimentTitle,
          description: experimentDescription,
        }),
      });

      {/*Mensagens de sucesso ou erro */}
      if (response.ok) {
        setSuccessMessage(getMessage('experiment.success.message'));
      } else {
        const errorData = await response.json();
        setErrorMessage(
          `Erro ao criar experimento: ${errorData.message || response.statusText}`
        );
      }
    } catch (error) {
      setErrorMessage(getMessage('experiment.error.message'));
    }
  };
   {/*Formulário de criação de experimento */}
    return <>
    <form onSubmit={handleSubmit}>
    {/*Título do experimento */}
        <Box
    sx={{
        justifyContent: "center",
        flexDirection: "column",
        marginBottom: 4,
        textAlign: 'center'
    }}>
        <Typography>{getMessage('experiment.title')}</Typography>
        <TextField
        sx={{width: 500}}  
        placeholder='Digite o título do experimento'
        value={experimentTitle}
        InputProps={{
                     endAdornment:(<InputAdornment position='end'>
                        {maxTitleLength - experimentTitle.length}
                        </InputAdornment>)}}
        required
        focused
        onChange={(event) => setExperimentTitle(event.target.value)}>
        </TextField>
    </Box>
    {/*Descrição do experimento */}
    <Box
    sx={{
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center"}}>
        <Typography>{getMessage('experiment.description')}</Typography>
        <TextField 
        sx={{width: 500
        }} 
        placeholder='Digite a descrição do experimento'
        value={experimentDescription}
        rows={5}
        InputProps={{
                     endAdornment:(<InputAdornment position='end'
                       sx={{marginTop: 'auto'}}>
                        {maxDescriptionLength - experimentDescription.length}
                        </InputAdornment>)}}
        multiline
        required
        focused
        onChange={(event) => setExperimentDescription(event.target.value)}>

        </TextField>
        
    </Box>
     {/*  Mensagem de sucesso (aparição na tela)*/}
      {successMessage && (
        <Box marginTop={1}>
          <Alert  variant="outlined" severity="success">{successMessage}</Alert>
        </Box>
      )}

      {/* Mensagem de erro (aparição na tela)*/}
      {errorMessage && (
        <Box marginTop={1}>
          <Alert variant="outlined" severity="error">{errorMessage}</Alert>
        </Box>
      )}

    <Box display={'flex'} justifyContent={'center'}>
        <Button
         sx={{width: 150, 
                  height: 45, 
                  borderRadius: 1, 
                  marginTop: 3,
                  bgcolor: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.light', 
                      },}}
                   
                  variant = "contained"
                  type = "submit" >
            {getMessage('experiment.button')}
        </Button>
    </Box>
    
    </form>
    
    </>
    
}

export default ExperimentForm;