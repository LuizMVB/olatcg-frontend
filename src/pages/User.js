import {useState, sx} from 'react';
import {Link} from 'react-router-dom'
import { Box, Typography, Button, TextField, InputLabel, InputAdornment, Alert} from "@mui/material";
import {API_ROUTES} from '../routes/Routes';
import { getMessage } from "../services/MessageService";
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SchemaIcon from '@mui/icons-material/Schema';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ScienceIcon from '@mui/icons-material/Science';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import MailIcon from '@mui/icons-material/Mail';
import user from './user.png';
import { Padding } from '@mui/icons-material';
const User = () => {

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Box sx={{ textAlign: 'center'}}>
        <img src={user} width={200} height={200}  alt="user"  />
      </Box> 
    <Divider sx={{marginTop: 3}} />
      <List>
        {['Perfil', 'Workflow', 'Experimentos'].map((text, index) => (
          <ListItem key={text} disablePadding>
           <ListItemButton to="/#"> 
              <ListItemIcon>
                {index === 0 ? <AccountCircleIcon /> : <></>}
                {index === 1 ? <SchemaIcon /> : <></>}
                {index === 2 ? <ScienceIcon /> : <></> }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        {['Visualizar', 'Novo'].map((text, index) => (
          <ListItem key={text} sx={{marginTop: -2}}>
            <ListItemButton to="/#">
              <ListItemIcon>
                {index % 2 === 0 ? <VisibilityIcon /> : <AddCircleOutlineIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        {['Análises'].map((text, index) => (
          <ListItem key={text}  disablePadding>
            <ListItemButton to="/#">
              <ListItemIcon>
                {index % 2 === 0 ? <QueryStatsIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        {[ 'Visualizar', 'Novo'].map((text, index) => (
          <ListItem key={text} sx={{marginTop: -2}} >
            <ListItemButton to="/#">
              <ListItemIcon>
                {index % 2 === 0 ? <VisibilityIcon /> : <AddCircleOutlineIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
    
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}><AccountCircleIcon /></Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );

}

export default User;