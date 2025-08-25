import {useState, sx} from 'react';
import {Link} from 'react-router-dom'
import { Box, Typography, Button, TextField, InputLabel, InputAdornment, Alert, IconButton} from "@mui/material";
import {API_ROUTES} from '../routes/Routes';
import { getMessage } from "../services/MessageService";
import OlatcgInternalNavbar from '../components/OlatcgInternalNavbar';

const User = () => {
return (
    <div>
      <OlatcgInternalNavbar />
    </div>
  );

}

export default User;