import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { getMessage } from "../services/MessageService";

import Logo from '../static/images/logo.png';

const OlatcgNavbar = () => {
    const navigateTo = useNavigate();
    const navItems = [
        {
            path: '/home',
            nameRef: 'appBar.navItems.home'
        },
        {
            path: '/tools',
            nameRef: 'appBar.navItems.tools'
        },
        {
            path: '/learn',
            nameRef: 'appBar.navItems.learn'
        },
        {
            path: '/analysis',
            nameRef: 'appBar.navItems.analysis'
        }
    ];

    return <>
            <AppBar position="static" color='primary'>
                <Toolbar>
                    <Box variant="h5" component="div"
                        sx={{ flexGrow: 1, cursor: 'pointer', pt: 0.4}} onClick={() => navigateTo('/')}>
                        <img height={50} width={50} src={Logo} alt="Logo olATCG" />
                    </Box>
                    {navItems.map((navItem, index) => 
                        <Button key={index} color="inherit" onClick={() => navigateTo(navItem.link)}>
                            <Typography variant="h6" component="div">
                                {getMessage(navItem.nameRef)}
                            </Typography>
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        
    </>
}

export default OlatcgNavbar;