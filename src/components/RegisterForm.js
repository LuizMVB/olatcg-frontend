import {React, useState, sx} from 'react';
import { Box, Typography, Button, TextField, InputLabel, Icon } from "@mui/material";
import { getMessage } from "../services/MessageService";
import { BorderAll } from '@mui/icons-material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelIcon from '@mui/icons-material/Cancel';


function RegisterForm() {
  //Envio das informações do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log( name, institution, userEmail, password );
  }

// Código de validação de e-mail (linhas 16-40)

const [userEmail, setUserEmail] = useState()
const isEmail = () => /^[A-Z0-9._+-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i.test(userEmail);
const [messageEmail, setMessageEmail] = useState("")
const [messagePassword, setMessagePassword] = useState("")

const validaEmail = () => {
        
        //Verifica se o e-mail existe 
        if(userEmail === "") {
            setMessageEmail(getMessage('register.label.email.empty.message'));
          } else{
            setMessageEmail("");
          }

          //Verifica o formato do e=mail
        if(isEmail(userEmail) && !/[._+-]/.test(userEmail[0])) {
                setMessageEmail("");
        } 
        else {
            setMessageEmail(getMessage('register.label.email.error.message'));
         }
   
    }

  //Código de validação de senha (linhas 42-112)
  const validaSenha = () => {
    if(password === "") {
            setMessagePassword(getMessage('register.label.password.error'));
        } else{
            setMessagePassword("");}
  }
  const [type, setType] = useState("password")

  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);
  const [likeOthersValidated, setLikeOthersValidated] = useState(false);
  const [confirmValidated, setConfirmValidated] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  
//"Mapeia" o que é digitado, através da função RegExp e o qua é determinado nela 
  const handleChange=(password, confirmPassword) => {
  const lower = RegExp('(?=.*[a-z])');
  const upper = RegExp('(?=.*[A-Z])');
  const number = RegExp('(?=.*[0-9])');
  const special = RegExp('(?=.*[!@#$%¨&*()\/<>:;~^|-])');
  const length = RegExp('.{8,}');

  //validando lowercase
  if(lower.test(password)){
    setLowerValidated(true);
  }
  else{
    setLowerValidated(false);
  }
  //validando uppercase
    if(upper.test(password)){
    setUpperValidated(true);
  }
  else{
    setUpperValidated(false);
  }
  // validando número
   if(number.test(password)){
    setNumberValidated(true);
  }
  else{
    setNumberValidated(false);
  }
  // validando caractere especial
    if(special.test(password)){
    setSpecialValidated(true);
  }
  else{
    setSpecialValidated(false);
  }
  //validando tamanho da senha
   if(length.test(password)){
    setLengthValidated(true);
  }
  else{
    setLengthValidated(false);
  }

//checando se a senha é igual ao nome ou ao e-mail
if (
    password.toLowerCase() === name?.toLowerCase() ||
    password.toLowerCase() === email?.toLowerCase()
  ) {
    setLikeOthersValidated(false);
  } else {
    setLikeOthersValidated(true);
  } 

//confirmação de senha
  setConfirmValidated(confirmPassword === password);
};

  //declaração das informações do formulário, para posteriormente enviar
  const [name, setName] = useState("")
  const [institution, setInstitution] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
return (
    //Caixa que envolve todos os campos de formulário
    <Box
      component="form"
      autoComplete='off'
      onSubmit ={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >

      {/*Preenchimento de nome. Não é possível confirmar o formulário sem preenchê-lo */}
        <Box>
          {/*Label: Nome */}
         <InputLabel htmlFor="name" sx={{
            marginRight: 33}}>
            {getMessage('register.label.name')}
         </InputLabel>
         {/*Campo de input - com a biblioteca MUI */}
         <TextField
          sx={{
          width: 320,
          borderRadius: 3,
          alignSelf: 'center',
          marginBottom: 3
          }}
            type="text"
            placeholder="Digite seu nome"
            onChange={(e) => setName(e.target.value)}
          required
          />
        </Box>

         {/*Preenchimento de instituição. Não é possível confirmar o formulário sem preenchê-la */}
        <Box>
          {/*Label: Instituição */}
         <InputLabel htmlFor="institution" sx={{
            marginRight: 30}}>
            {getMessage('register.label.institution')}
         </InputLabel>
         {/*Campo de input - com a biblioteca MUI */}
         <TextField
          sx={{
          width: 320,
          borderRadius: 3,
          alignSelf: 'center',
          marginBottom: 3
          }}
            type="text"
            placeholder="Digite sua instituição"
            onChange={(e) => setInstitution(e.target.value)}
          required
          />
        </Box>

      {/*Preenchimento do email. Caso ele esteja vazio, aparecerá uma mensagem de erro. Também aparecerá se ele não estiver de acordo com um email (sem @ e .) */}
        <Box> 
          {/*Label: Email */}
        <InputLabel htmlFor = "userEmail" sx={{
            marginRight: 33}}>
            {getMessage('register.label.email')}
        </InputLabel>
        {/*Campo de input - com a biblioteca MUI */}
          <TextField
          sx={{
          width: 320,
          borderRadius: 3,
          alignSelf: 'center',
          
          }}
            name = "email"
            type="text"
            placeholder="nome@email.com"
            onChange={(e) => setUserEmail(e.target.value)}
            onBlur={validaEmail}
            required
            helperText = {messageEmail}
            error = {messageEmail !== ""}
          />
          
        </Box>

        {/*Preenchimento de senha. Não é possível confirmar o formulário sem preenchê-la. Ela possui um sistema de validação */}
        <Box>
          {/*Label: Senha */}
          <InputLabel sx={{
            marginRight: 33}}>
            {getMessage('register.label.password')}
          </InputLabel>
          {/*Campo de input - com a biblioteca MUI */}
          <TextField
          sx={{
          width: 320,
          borderRadius: 3,
          alignSelf: 'center',
          marginBottom: 3
          }}
            name = "password"
            type={type}
            placeholder="Digite sua senha"
            onChange={(e) => [setPassword(e.target.value), handleChange(e.target.value) ]}
            onBlur={validaSenha}
            required
            helperText = {messagePassword}
            error = {messagePassword !== ""}
            />
            
          </Box>
          <Box>

          {/*Campo de verificação de senha */}

        <Box marginLeft={15} marginBottom={4}  textAlign={'justify'}>
          {/*Irá validar se a senha possui 8 ou mais caracteres */}
          <Typography variant='body2' sx={{color:lengthValidated ? 'green' : 'red'}}>
            {getMessage('register.validation.one')}
                  {lengthValidated ? (
                    <TaskAltIcon fontSize="x-small" />
                  ) : (
                    <CancelIcon fontSize="x-x-small" />
                  )}
          </Typography>
          {/*Irá validar se a senha possui 3 dos 4 requisitos pedidos */}
          <Typography variant='body2'>
            {getMessage('register.validation.two')}
            <Box>
              {/*Senha precisa de ao menos uma letra maiúscula */}
              <Typography sx={{color: upperValidated ? 'green' : 'red'}} fontSize={13}>
                {getMessage('register.validation.uppercase')}
                  {upperValidated ? (
                    <TaskAltIcon fontSize="x-small" />
                  ) : (
                    <CancelIcon fontSize="x-small" />
                  )}
              </Typography>
              {/*Senha precisa de ao menos uma letra minúscula */}
              <Typography sx={{color:lowerValidated ? 'green' : 'red'}} fontSize={13} >
                {getMessage('register.validation.lowercase')}
                {lowerValidated ? (
                    <TaskAltIcon fontSize="x-small" />
                  ) : (
                    <CancelIcon fontSize="x-small" />
                  )}
              </Typography>
              {/*Senha precisa de ao menos um número */}
              <Typography sx={{color:numberValidated ? 'green' : 'red'}} fontSize={13}>
                {getMessage('register.validation.number')}
                {numberValidated ? (
                    <TaskAltIcon fontSize="x-small" />
                  ) : (
                    <CancelIcon fontSize="x-small" />
                  )}
              </Typography>
              {/*Senha precisa de ao menos um caracter especial */}
              <Typography sx={{color:specialValidated ? 'green' : 'red'}} fontSize={13} >
                {getMessage('register.validation.specialcarac')}
                {specialValidated ? (
                    <TaskAltIcon fontSize="x-small" />
                  ) : (
                    <CancelIcon fontSize="x-small" />
                  )}
              </Typography>
              {/*Senha precisa ser diferente do nome ou email */}
              <Typography sx={{color:likeOthersValidated ? 'green' : 'red'}} fontSize={13} >
                {getMessage('register.validation.three')}
                {likeOthersValidated ? (
                    <TaskAltIcon fontSize="x-small" />
                  ) : (
                    <CancelIcon fontSize="x-small" />
                  )}
              </Typography>
 
          </Box>
            {/*Confirmação de senha */}
          <Box>
            <InputLabel sx={{
              marginRight: 30, marginTop: 3}}>
              {getMessage('register.label.password.confirm')}
            </InputLabel>
            {/*Input */}
            <TextField
              sx={{
              width: 320,
              borderRadius: 3,
              alignSelf: 'center',
              marginBottom: 3
              }}
                type="password"
                value={confirmPassword}
                placeholder="Confirme sua senha"
                onChange={(e) => {setConfirmPassword(e.target.value); handleChange(password,e.target.value);}}/>
                {confirmValidated ? (
                  <TaskAltIcon color='green' fontSize="x-small" />
                ) : (
                  <CancelIcon color='red' fontSize="x-small" />
                )}

          </Box>
          </Typography>
          

        </Box>
          
        </Box>
        <Button
        disabled={
            !(
              (lowerValidated || upperValidated) && (numberValidated || specialValidated) && (lowerValidated || numberValidated)
               && lengthValidated && likeOthersValidated && confirmValidated
            )
          } 
          sx={{width: 310, 
          height: 40, 
          alignSelf: 'center', 
          borderRadius: 2, 
          marginBottom: 5,
          bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.light',
              }}} 
          variant = "contained"
          type = "submit" >
          {getMessage('register.button')}
      </Button>
 </Box>
 
)
}



export default RegisterForm;