import { useState } from 'react';
import { Box, Typography, Button, TextField, InputLabel, Alert, IconButton, Collapse} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { getMessage } from "../services/MessageService";



function RegisterForm() {

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, institution, email, password);

    let url = 'http://localhost:8000/v3/olatcg-backend/auth/register/';

    try {
      const response = await fetch (url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Erro na requisição:", data);
        setErrorMessage(getMessage('register.error.message'));
      } else {
        console.log("Usuário criado com sucesso");
        setSuccessMessage(getMessage('register.success.message'));
      }
    } 
    catch (error) {
      console.error(error);
      setErrorMessage(getMessage('register.error.message'));
    }
  }

  const isEmail = () => /^[A-Z0-9._+-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i.test(email);
  const [messageEmail, setMessageEmail] = useState("")
  const [messagePassword, setMessagePassword] = useState("")
  const [messageConfirm, setMessageConfirm] = useState("")

  const validateEmail = () => {
        
    if(email === "") {
      setMessageEmail(getMessage('register.label.email.empty.message'));
      return;
    } 

    if( !(isEmail(email) && !/[._+-]/.test(email[0])) ) {
      setMessageEmail(getMessage('register.label.email.error.message'));
      return;
    }
    setMessageEmail("");
  }

  const validatePassword = () => {
    if(password === "") {
      setMessagePassword(getMessage('register.label.password.error'));
      return;
    }
    setMessagePassword("");
  }

  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);
  const [likeOthersValidated, setLikeOthersValidated] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  

  const handleChange = (password) => {
    const lower = RegExp('(?=.*[a-z])');
    const upper = RegExp('(?=.*[A-Z])');
    const number = RegExp('(?=.*[0-9])');
    const special = RegExp('(?=.*[!@#$%¨&*()\/<>:;~?´`^|-])');
    const length = RegExp('.{8,}');

    function existsLower() {
      if(!lower.test(password)){
        setLowerValidated(false);
        return;
      }
      setLowerValidated(true);
    }
    
    function existsUpper() {
      if(!upper.test(password)){
        setUpperValidated(false);
        return;
      }
      setUpperValidated(true);
    }

    function existsNumber() {
      if(!number.test(password)) {
        setNumberValidated(false);
        return;
      }
      setNumberValidated(true);
    }

    function existsSpecial() {
      if(!special.test(password)) {
        setSpecialValidated(false);
        return;
      }
      setSpecialValidated(true);
    }

    function passwordLength() {
      if ( !length.test(password)) {
        setLengthValidated(false);
        return;
      }
      setLengthValidated(true);
    }

    function passwordLikeOther() {
      if ( (password.toLowerCase() === name?.toLowerCase()) || (password.toLowerCase() === email?.toLowerCase()) ) {
        setLikeOthersValidated(false);
        return;
      } 
      setLikeOthersValidated(true);
    }

    existsLower();
    existsUpper();
    existsNumber();
    existsSpecial();
    passwordLength();
    passwordLikeOther();
  };


  const validateConfirmPassword = () => {
    if (confirmPassword!==password){
      setMessageConfirm(getMessage('register.label.password.confirm.error'));
      return;
    }
    setMessageConfirm("");
  }

  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [openSuccessAlert, setOpenSuccessAlert] = useState(true);
  const [openErrorAlert, setOpenErrorAlert] = useState(true);

  return (
    <>
    {successMessage && (
      <Box margin={1.5}>
        <Collapse in={openSuccessAlert}>
          <Alert severity="success" variant='filled' action={
            <IconButton aria-label='close' color='inherit' size='small' onClick={()=> {setOpenSuccessAlert(false)}}>
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }>
            {successMessage}
          </Alert>
        </Collapse>
      </Box>
    )}
        
    {errorMessage && (
      <Box margin={1.5}>
        <Collapse in={openErrorAlert}>
          <Alert severity="error" variant='filled' action={
            <IconButton aria-label='close' color='inherit' size='small' onClick={()=> {setOpenErrorAlert(false)}}>
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }>
            {errorMessage}
          </Alert>
        </Collapse>
      </Box>
    )}
    <Box
      component="form"
      autoComplete='off'
      onSubmit ={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Box  alignSelf={'center'} display={"flex"} gap={1} flexDirection={"row"}>
        <Box flexDirection={"row"}>
          <InputLabel htmlFor="name" sx={{ marginRight: 33}}>
            {getMessage('register.label.name')}
          </InputLabel>
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
            required />
        </Box>

        <Box flexDirection={"row"}>
          <InputLabel htmlFor="institution" sx={{ marginRight: 30}}>
              {getMessage('register.label.institution')}
          </InputLabel>
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
            required />
        </Box>

      </Box>

      <Box> 
        <InputLabel htmlFor = "email" sx={{ marginRight: 75}}>
          {getMessage('register.label.email')}
        </InputLabel>
        <TextField
          sx={{
            width: 320,
            borderRadius: 3,
            alignSelf: 'left',
            marginRight: 41,
            marginBottom: 3
          }}
          name = "email"
          type="text"
          placeholder="nome@email.com"
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateEmail}
          required
          helperText = {messageEmail}
          error = {messageEmail !== ""} />

      </Box>

      <Box alignSelf={'center'} display={"flex"} gap={1} flexDirection={"row"}>
        <Box flexDirection={'collumn'}>
          <Box>
            <InputLabel sx={{ marginRight: 33}}>
              {getMessage('register.label.password')}
            </InputLabel>
            <TextField
              sx={{
                width: 320,
                borderRadius: 3,
                alignSelf: 'left',
                marginBottom: 3
              }}
              name = "password"
              type="password"
              placeholder="Digite sua senha"
              onChange={(e) => [setPassword(e.target.value), handleChange(e.target.value) ]}
              onBlur={validatePassword}
              required
              helperText = {messagePassword}
              error = {messagePassword !== ""} />
                    
          </Box>

          <Box width={200} marginLeft={3} marginBottom={4}  textAlign={'left'}>
            <Typography variant='body2' sx={{color:lengthValidated ? 'green' : 'red'}}>
              {getMessage('register.validation.one')}     
            </Typography>

            <Box>
              <Typography sx={{color: upperValidated ? 'green' : 'red'}} fontSize={13}>
                {getMessage('register.validation.uppercase')}   
              </Typography>
      
              <Typography sx={{color:lowerValidated ? 'green' : 'red'}} fontSize={13} >
                {getMessage('register.validation.lowercase')} 
              </Typography>

              <Typography sx={{color:numberValidated ? 'green' : 'red'}} fontSize={13}>
                  {getMessage('register.validation.number')}  
              </Typography>

              <Typography sx={{color:specialValidated ? 'green' : 'red'}} fontSize={13} >
                {getMessage('register.validation.specialcarac')} 
              </Typography>

              <Typography sx={{color:likeOthersValidated ? 'green' : 'red'}} fontSize={13} >
                {getMessage('register.validation.three')} 
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Box>
          <Box flexDirection={"row"}>
            <Box>
              <InputLabel sx={{ marginRight: 21}}>
                {getMessage('register.label.password.confirm')}
              </InputLabel>
              <TextField
                sx={{
                  width: 320,
                  borderRadius: 3,
                  alignSelf: 'center',
                }}
                onblur={validateConfirmPassword}
                type="password"
                value={confirmPassword}
                placeholder="Confirme sua senha"
                error = {confirmPassword !== password}
                helperText = {messageConfirm}
                onChange={(e) => {setConfirmPassword(e.target.value); handleChange(password,e.target.value);}} />
                
            </Box> 
          </Box>
        </Box>  
      </Box>

      <Button
        disabled={
          !(
            lowerValidated && upperValidated && numberValidated && specialValidated && lowerValidated && numberValidated
            && lengthValidated && likeOthersValidated  && (confirmPassword === password)
          )
        } 
        sx={{
          width: 310, 
          height: 40, 
          alignSelf: 'center', 
          borderRadius: 2, 
          marginBottom: 5,
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.light',
          }
        }} 
        variant = "contained"
        type = "submit" >
          {getMessage('register.button')}
      </Button>

    </Box>  
    </>
  )
};

export default RegisterForm;
