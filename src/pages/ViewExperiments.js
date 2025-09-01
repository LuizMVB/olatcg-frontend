import { useState } from "react";
import { Button, Typography, TextField, Divider } from "@mui/material";
import { Box } from "@mui/material";
import { getMessage } from "../services/MessageService";
import { ExperimentTable } from "../components/ExperimentTable";


const ViewExperiments = () => {

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
            alignItems: 'left',
            justifyContent: 'space-between',
            textAlign: 'left',
        }}>
            {/* Title */}
            <Typography variant="h4" component="h4" sx={{
                color: 'primary.main',
                fontWeight: 'bold'
            }}>
                {getMessage('experimentField.title')}
            </Typography>
            <Typography variant="h6" component="h6" sx={{
                color: 'primary.main',
                mt: 1
            }}>
                {getMessage('experimentField.subtitle')}
            </Typography>
            <Divider orientation="horizontal" variant="middle" sx={{
                my: 4, 
                width: '30%',
                border: '0.75px solid',
                borderColor: '#cfd8dc'
            }} flexItem />

            {/* Form */}
            <Box component="form" sx={{display:'flex', flexDirection:'column'}} onSubmit={handleSubmit} >
                <Box sx={{display:'flex', flexDirection:'row', mb: 2}}>

                    {/* Experiment ID filter field */}
                    <TextField label={getMessage('experimentField.label.id')} id="experimentID" name="experimentID" 
                    type="number" sx={{mr: 5, width: '15%'}} onChange={(e) => {setExperimentId(e.target.value)}}/>
                    
                    {/* Experiment title filter field */}
                    <TextField label={getMessage('experimentField.label.title')} id="experimentTitle" name="experimentName" 
                    type="text" sx={{width: '15%'}} onChange={(e) => {setExperimentTitle(e.target.value)}} />
                </Box>
                <Box sx={{display:'flex', flexDirection:'row', mt: 3}}>

                    {/* Submit button */}
                    <Button type="submit" size="large" sx={{
                        mr: 2,
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
            <Divider orientation="horizontal" variant="middle" sx={{
                mt: 4, 
                width: '30%',
                border: '0.75px solid',
                borderColor: '#cfd8dc'
            }} flexItem />
        </Box>
        <ExperimentTable filters={activeFilters} />
    </>
};

export {ViewExperiments};