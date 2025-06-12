import { Button, FormControl, InputLabel, Menu, MenuItem, OutlinedInput, Stack, Typography } from "@mui/material";
import { TextField, Select} from "@mui/material";
import { Box, maxHeight, width} from "@mui/system";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getMessage } from "../services/MessageService";

const Analysis = () => {
    const navigateTo = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState('ALIGNMENT');

    const [experimentId, setExperimentId] = useState(0);
    const [experimentTitle, setExperimentTitle] = useState('');
    const [analysisId, setAnalysisId] = useState(0);
    const [analysisTitle, setAnalysisTitle] = useState('');
    const [analysisType, setAnalysisType] = useState([]);
    const [analysisStatus, setAnalysisStatus] = useState([]);

    const handleAnalysisType = (event) => {
        setAnalysisType(event.target.value);
    };

    const handleAnalysisStatus = (event) => {
        setAnalysisStatus(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('enviado');
        console.log(experimentId, experimentTitle);
        console.log(analysisId, analysisTitle);
        console.log(analysisType);
        console.log(analysisStatus);
    }


    const onComponentMount = () => {
        if(location.pathname === '/analysis'){
            navigateTo('/analysis/alignment');
        }
    }

    const handleLabel = () =>{
        if(location.pathname.includes('/analysis/alignment')){
            setValue('ALIGNMENT');
        } else if (location.pathname.includes('/analysis/homology')){
            setValue('HOMOLOGY');
        } else if (location.pathname.includes('/analysis/phylogeneticTree')){
            setValue('TAXONOMY_TREE');
        }
    }

    useEffect(() => {
        onComponentMount();
        handleLabel();
    }, [location, navigateTo])

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
            boxShadow: 10,
        }}>
            <Typography variant="h5" component="h5" sx={{
                color: 'primary.main',
                mb: 2.5,
                fontWeight: 'bold'
            }}>
                {getMessage('analysisField.title')}
            </Typography>
            <Box component="form" sx={{display:'flex', flexDirection:'row'}} onSubmit={handleSubmit} >
                <Box sx={{display:'flex', flexDirection:'column', mx: 2}}>
                    <TextField label={getMessage('analysisField.label.experiment.id')} id="experimentID" name="experimentID" 
                    type="number" sx={{mb: 2}} onChange={(e) => {setExperimentId(e.target.value)}}/>

                    <TextField label={getMessage('analysisField.label.experiment.title')} id="experimentTitle" name="experimentName" 
                    type="text" onChange={(e) => {setExperimentTitle(e.target.value)}} />
                </Box>
                <Box sx={{display:'flex', flexDirection:'column', mx: 2}}>
                    <TextField label={getMessage('analysisField.label.analysis.id')} id="analysisID" name="analysisID" 
                    type="number" sx={{mb: 2}} onChange={(e) => {setAnalysisId(e.target.value)}} />

                    <TextField label={getMessage('analysisField.label.analysis.title')} id="analysisTitle" name="analysisTitle" 
                    type="text" onChange={(e) => {setAnalysisTitle(e.target.value)}} />
                </Box>
                <Box sx={{display:'flex', flexDirection:'column', mx: 2, minWidth: 120 }}>
                    <FormControl>
                        <InputLabel id="type">{getMessage('analysisField.label.type')}</InputLabel>
                        <Select labelId="type" id="type" value={analysisType} label={getMessage('analysisField.label.type')} onChange={handleAnalysisType} multiple sx={{mb: 2}}>
                            <MenuItem value={'ALIGNMENT'}>{getMessage('analysisField.label.type.alignment')}</MenuItem>
                            <MenuItem value={'HOMOLOGY'}>{getMessage('analysisField.label.type.homology')}</MenuItem>
                            <MenuItem value={'TAXONOMY_TREE'}>{getMessage('analysisField.label.type.phyloTree')}</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <FormControl>
                        <InputLabel id="status">{getMessage('analysisField.label.status')}</InputLabel>
                        <Select labelId="status" id="status" value={analysisStatus} label={getMessage('analysisField.label.status')} onChange={handleAnalysisStatus} multiple>
                            <MenuItem value={'EXECUTION_SUCCEEDED'}>{getMessage('analysisField.label.status.success')}</MenuItem>
                            <MenuItem value={'IN_EXECUTION'}>{getMessage('analysisField.label.status.executing')}</MenuItem>
                            <MenuItem value={'WAITING_FOR_EXECUTION'}>{getMessage('analysisField.label.status.waiting')}</MenuItem>
                            <MenuItem value={'ERROR_IN_EXECUTION'}>{getMessage('analysisField.label.status.error')}</MenuItem>
                        </Select>
                    </FormControl>
                    
                </Box>
                <Button type="submit" size="large" sx={{
                    mx: 5,
                    alignSelf: 'center',
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover':{
                        cursor: 'pointer'
                    }
                }} >
                    {getMessage('analysisField.label.submit')}
                </Button>
            </Box>
        </Box>
        <br/>
        <Outlet />
        
        
    </>
};

export { Analysis };