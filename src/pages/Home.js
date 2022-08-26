import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { getMessage } from "../services/MessageService";

import Logo from '../static/images/logo.png';

const Home = () => {
    const jumbotronStyle = {
        py: 4, px: { xs: 10, sm: 4, md: 10 }, backgroundColor: 'secondary.light'
    };

    const baseColorsInOLATCGsName = [
        {letter: 'A', color: 'red'},
        {letter: 'T', color: 'blue'},
        {letter: 'C', color: 'green'},
        {letter: 'G', color: 'yellow'}
    ];

    return <>
        <Stack sx={jumbotronStyle} 
            position="static" direction="row"
            alignItems="stretch" 
            justifyContent={{xs: 'space-between', sm: 'flex-start'}} 
            spacing={12}
        >
            <img src={Logo} alt="olATCG's logo" height={250} width={250}></img>
            <Box textAlign="center" width="100%">
                <Typography variant="h2" color="#9c27b0">
                    {getMessage('home.jumbotron.title')}
                    OL
                    {baseColorsInOLATCGsName.map((base => 
                        <span style={{color: base.color}}>{base.letter}</span>
                    ))}
                </Typography>
                <Typography variant="h4" component="div" sx={{pt: 3}} color="#1d2b29c9">
                    {getMessage('home.jumbotron.description')}
                </Typography>
            </Box>
            
        </Stack>    
    </>
}

export default Home;