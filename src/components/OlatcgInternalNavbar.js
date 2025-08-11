import { AppBar, Box, Button, Toolbar, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router";
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
import user from '../pages/user.png';



const OlatcgInternalNavbar = () => {
    {/*Navbar que será apresentada no site quando o usuário logar */}
    const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  {/*Navbar lateral quando o botão de perfil for clicado */}

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Box sx={{ textAlign: 'center'}}>
        <img src={user} width={200} height={200}  alt="user"  />
      </Box> 
    <Divider sx={{marginTop: 3}} />
      <List>
        {/*Alguns itens do olatcg que podem ser acessados*/}
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
        {/*Opções de acesso que o usuário pode realizar com a página de experimentos */}
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
        {/*Opções de acesso que o usuário pode realizar com a página de análises */}
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
    const navigateTo = useNavigate();
    {/*Elementos da navbar global, que são mantidos quando o login é feito*/}
    const navItems = [
        {
            path: '/home',
            nameRef: 'appBar.navItems.home'
        },
        {
            path: '/tool',
            nameRef: 'appBar.navItems.tools'
        },
        {
            path: '/analysis',
            nameRef: 'appBar.navItems.analysis'
        },
        {
            path: '/learn',
            nameRef: 'appBar.navItems.learn'
        },
    ];

    return <>
    {/*Extremamente similar à global, exceto pela substituição do icon de olatcg pelo icon de perfil de usuário */}
            <AppBar position="static" color='primary'>
                <Toolbar>
                    <IconButton
                            onClick={toggleDrawer(true)}
                            sx={{
                            position: 'fixed',
                            left: 16,
                            zIndex: 1200,
                            color: 'white',
                            marginLeft: 10,
                            
                            }}
                        ><AccountCircleIcon /></IconButton>
                        <Drawer open={open} onClose={toggleDrawer(false)}>
                            {DrawerList}
                        </Drawer>
                    <Box variant="h5" component="div"
                        sx={{ flexGrow: 1, cursor: 'pointer', pt: 0.4}} onClick={() => navigateTo('/')}>
                    </Box>
                    {navItems.map((navItem, index) => 
                        <Button key={index} color="inherit" onClick={() => navigateTo(navItem.path)}>
                            <Typography variant="h6" component="div">
                                {getMessage(navItem.nameRef)}
                            </Typography>
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        
    </>
}

export default OlatcgInternalNavbar;