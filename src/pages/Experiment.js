import { useState } from "react";
import { Button, Typography, TextField } from "@mui/material";
import { Box } from "@mui/material";
import { getMessage } from "../services/MessageService";
import { ExperimentTable } from "../components/ExperimentTable";


const Experiment = () => {

    const [experimentId, setExperimentId] = useState(0);
    const [experimentTitle, setExperimentTitle] = useState('');
    const [activeFilters, setActiveFilters] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault(); 
        
        const filters = {
            experiment_id: experimentId,
            experiment_title: experimentTitle,
        };

        setActiveFilters(filters);
    }

    const handleReset = () => {
        setExperimentId(0);
        setExperimentTitle('');

        const filters = {
            experiment_id: 0,
            experiment_title: '',
        };

        setActiveFilters(filters);
    }

    return <>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 4,
            p: 2,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: '#e8e8e8',
            borderColor: '#cfd1d1',
            borderRadius: '10px',
            boxShadow: 8,
        }}>
            {/* Title */}
            <Typography variant="h5" component="h5" sx={{
                color: 'primary.main',
                mb: 2.5,
                fontWeight: 'bold'
            }}>
                {getMessage('experimentField.title')}
            </Typography>

            {/* Form */}
            <Box component="form" sx={{display:'flex', flexDirection:'column'}} onSubmit={handleSubmit} >
                <Box sx={{display:'flex', flexDirection:'row', mx: 2}}>

                    {/* Experiment ID filter field */}
                    <TextField label={getMessage('experimentField.label.id')} id="experimentID" name="experimentID" 
                    type="number" sx={{mb: 2, mx: 2}} onChange={(e) => {setExperimentId(e.target.value)}}/>
                    
                    {/* Experiment title filter field */}
                    <TextField label={getMessage('experimentField.label.title')} id="experimentTitle" name="experimentName" 
                    type="text" onChange={(e) => {setExperimentTitle(e.target.value)}} />
                </Box>
                <Box sx={{display:'flex', flexDirection:'row', mx: 2}}>

                    {/* Submit button */}
                    <Button type="submit" size="large" sx={{
                        mb: 3,
                        mt: 1, 
                        mx: 2,
                        alignSelf: 'center',
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover':{
                            cursor: 'pointer'
                        }
                    }}>
                        {getMessage('experimentField.label.submit')}
                    </Button>

                    {/* Reset button */}
                    <Button type="reset" size="large" onClick={handleReset} sx={{
                        mb: 3,
                        mt: 1, 
                        alignSelf: 'center',
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover':{
                            cursor: 'pointer'
                        }
                    }}>
                        {getMessage('experimentField.label.reset')}
                    </Button>
                </Box>
            </Box>
        </Box>
        <br />
        <ExperimentTable filters={activeFilters} />
    </>
};

export {Experiment};