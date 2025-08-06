import { Button, FormControl, InputLabel, Menu, MenuItem, OutlinedInput, Stack, Typography } from "@mui/material";
import { TextField, Select} from "@mui/material";
import { Box, maxHeight, width } from "@mui/system";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getMessage } from "../services/MessageService";
import { AnalysisTable } from "../components/AnalysisTable";
import { LocalAtmRounded } from "@mui/icons-material";

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

    const [activeFilters, setActiveFilters] = useState({});

    /*
    const onComponentMount = () => {
        if(location.pathname !== '/analysis'){
            navigateTo('/analysis');
        }
    }

    useEffect(() => {
        onComponentMount();
    }, [location, navigateTo]);  */

    const handleAnalysisType = (e) => {
        setAnalysisType(e.target.value);
    }
   

    const handleAnalysisStatus = (e) => {
        setAnalysisStatus(e.target.value);
    }

    const handleSubmit = (event) => { 
        event.preventDefault();
        
        const filters = {
            experiment_id: experimentId,
            experiment_title: experimentTitle,
            analysis_id: analysisId,
            analysis_title: analysisTitle,
            analysis_type: analysisType,
            analysis_status: analysisStatus
        };

        setActiveFilters(filters);
    }

    const handleReset = () => {

        const filters = {
           experiment_id: 0,
            experiment_title: '',
            analysis_id: 0,
            analysis_title: '',
            analysis_type: [],
            analysis_status: [] 
        };

        setExperimentId(0);
        setExperimentTitle('');
        setAnalysisId(0);
        setAnalysisTitle('');
        setAnalysisStatus([]);
        setAnalysisType([]);
        
        setActiveFilters(filters);
    }

    const itemHeight = 48;
    const itemPaddingTop = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: itemHeight * 4.5 + itemPaddingTop,
                width: 200,
            },
        },
    };


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
                <Box sx={{display:'flex', flexDirection:'column', mx: 2, width: 275 }}>
                    <FormControl>
                        <InputLabel id="type">{getMessage('analysisField.label.type')}</InputLabel>
                        <Select labelId="type" id="type" value={analysisType} label={getMessage('analysisField.label.type')} 
                        onChange={handleAnalysisType} multiple sx={{mb: 2}} MenuProps={MenuProps}>
                            <MenuItem value={'PAIRWISE_ALIGNMENT'}>{getMessage('analysisField.label.type.alignment')}</MenuItem>
                            <MenuItem value={'HOMOLOGY_SEARCH'}>{getMessage('analysisField.label.type.homology')}</MenuItem>
                            <MenuItem value={'TAXONOMY_TREE'}>{getMessage('analysisField.label.type.phyloTree')}</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <FormControl>
                        <InputLabel id="status">{getMessage('analysisField.label.status')}</InputLabel>
                        <Select labelId="status" id="status" value={analysisStatus} label={getMessage('analysisField.label.status')} 
                        onChange={handleAnalysisStatus} multiple MenuProps={MenuProps}>
                            <MenuItem value={'SUCCEEDED'}>{getMessage('analysisField.label.status.success')}</MenuItem>
                            <MenuItem value={'IN_EXECUTION'}>{getMessage('analysisField.label.status.executing')}</MenuItem>
                            <MenuItem value={'WAITING'}>{getMessage('analysisField.label.status.waiting')}</MenuItem>
                            <MenuItem value={'EXECUTION_FAILED'}>{getMessage('analysisField.label.status.error')}</MenuItem>
                        </Select>
                    </FormControl>
                    
                </Box>
                <Box sx={{display:'flex', flexDirection:'column', mx: 2}} >
                    <Button type="submit" size="large" sx={{
                        mb: 3,
                        mt: 1, 
                        alignSelf: 'center',
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover':{
                            cursor: 'pointer'
                        }
                    }} >
                        {getMessage('analysisField.label.submit')}
                    </Button>
                    <Button type="reset" size="large" onClick={handleReset} sx={{
                        alignSelf: 'center',
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover':{
                            cursor: 'pointer'
                        },
                    }}>
                        {getMessage('analysisField.label.reset')}
                    </Button>
                </Box>               
            </Box>
        </Box>
        <br/> 
        <AnalysisTable filters={activeFilters}  />
    </>
};

export { Analysis };