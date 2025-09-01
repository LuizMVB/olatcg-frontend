import {React, useState, sx} from 'react';
import { Box, Typography, Button, TextField, InputLabel } from "@mui/material";
import { getMessage } from "../services/MessageService";



function RegisterForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log( name, institution, userEmail, password );
  }

const [userEmail, setUserEmail] = useState()
const isEmail = () => /^[A-Z0-9._+-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i.test(userEmail);
const [messageEmail, setMessageEmail] = useState("")
const [messagePassword, setMessagePassword] = useState("")
const [messageConfirm, setMessageConfirm] = useState("")

const validaEmail = () => {
        
        if(userEmail === "") {
            setMessageEmail(getMessage('register.label.email.empty.message'));
          } else{
            setMessageEmail("");
          }

        if(isEmail(userEmail) && !/[._+-]/.test(userEmail[0])) {
                setMessageEmail("");
        } 
        else {
            setMessageEmail(getMessage('register.label.email.error.message'));
         }
   
    }

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
  const [confirmPassword, setConfirmPassword] = useState("");
  

  const handleChange=(password, confirmPassword) => {
  const lower = RegExp('(?=.*[a-z])');
  const upper = RegExp('(?=.*[A-Z])');
  const number = RegExp('(?=.*[0-9])');
  const special = RegExp('(?=.*[!@#$%¨&*()\/<>:;~?´`^|-])');
  const length = RegExp('.{8,}');

  
  if(lower.test(password)){
    setLowerValidated(true);
  }
  else{
    setLowerValidated(false);
  }
  
    if(upper.test(password)){
    setUpperValidated(true);
  }
  else{
    setUpperValidated(false);
  }
  
   if(number.test(password)){
    setNumberValidated(true);
  }
  else{
    setNumberValidated(false);
  }

    if(special.test(password)){
    setSpecialValidated(true);
  }
  else{
    setSpecialValidated(false);
  }

   if(length.test(password)){
    setLengthValidated(true);
  }
  else{
    setLengthValidated(false);
  }

if (
    password.toLowerCase() === name?.toLowerCase() ||
    password.toLowerCase() === email?.toLowerCase()
  ) {
    setLikeOthersValidated(false);
  } else {
    setLikeOthersValidated(true);
  } 

};


const validaConfirmacao = () => {
  if (confirmPassword!==password){
    setMessageConfirm(getMessage('register.label.password.confirm.error'));
  }
  else{
    setMessageConfirm("");
  }
}

 
  const [name, setName] = useState("")
  const [institution, setInstitution] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
return (

    <Box
      component="form"
      autoComplete='off'
      onSubmit ={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >


        <Box  alignSelf={'center'} display={"flex"} gap={1} flexDirection={"row"}>
            <Box flexDirection={"row"}>
            
          <InputLabel htmlFor="name" sx={{
              marginRight: 33}}>
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
            required
            />
          </Box>


          <Box flexDirection={"row"}>
            <InputLabel htmlFor="institution" sx={{
                marginRight: 30}}>
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
              required
              />
          </Box>

        </Box>
        

      
        <Box> 

        <InputLabel htmlFor = "userEmail" sx={{
            marginRight: 75}}>
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
            onChange={(e) => setUserEmail(e.target.value)}
            onBlur={validaEmail}
            required
            helperText = {messageEmail}
            error = {messageEmail !== ""}
          />
          
        </Box>

        <Box alignSelf={'center'} display={"flex"} gap={1} flexDirection={"row"}>
          <Box flexDirection={'collumn'}>
                <Box>
                
                  <InputLabel sx={{
                    marginRight: 33}}>
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
                    type={type}
                    placeholder="Digite sua senha"
                    onChange={(e) => [setPassword(e.target.value), handleChange(e.target.value) ]}
                    onBlur={validaSenha}
                    required
                    helperText = {messagePassword}
                    error = {messagePassword !== ""}
                    />
                    
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
            <InputLabel sx={{
              marginRight: 21}}>
              {getMessage('register.label.password.confirm')}
            </InputLabel>

            <TextField
              sx={{
              width: 320,
              borderRadius: 3,
              alignSelf: 'center',
              }}
                onblur={validaConfirmacao}
                type="password"
                value={confirmPassword}
                placeholder="Confirme sua senha"
                error = {confirmPassword !== password}
                helperText = {messageConfirm}
                onChange={(e) => {setConfirmPassword(e.target.value); handleChange(password,e.target.value);}}/>
                
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
