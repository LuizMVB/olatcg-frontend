import React from 'react';
import {Stack} from "@mui/system";
import { Box, Paper, Typography } from "@mui/material";
import { getMessage } from "../services/MessageService";
import ExperimentForm from "../components/ExperimentForm";
import { API_ROUTES } from '../routes/Routes';

const CreateExperiment = () => {
    return <>
    <Stack>
        <Box
        sx={{display: "flex",
            width: 1200,
            height: 450,
            alignSelf: "center",
            justifyContent: "center",
            backgroundColor: "white",
            marginTop: 10,
            boxShadow: 1
        }}> 
            <Box 
            sx={{flexDirection: "column",
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center"
            }}
            > 
                <ExperimentForm />
            </Box>
               
        </Box>

    </Stack>

    </>
  
}
 export default CreateExperiment;