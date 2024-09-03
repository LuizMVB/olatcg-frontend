import { Science } from "@mui/icons-material";
import { Grid, IconButton, TextField, Tooltip, Typography, Select, MenuItem, Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import { API_ROUTES } from "../routes/Routes";
import { getMessage } from "../services/MessageService";
import ValidationService from "../services/ValidationService";
import OlatcgLoader from "./OlatcgLoader";
import OlatcgSnackbar from "./OlatcgSnackbar";
import { OlatcgStep } from "./OlatcgStep";
import OriginCountryEnum from "../infra/enums/OriginCountryEnum";

class AlignmentRequest{
    constructor({form, countryA, countryB}) {
        this.mode = form.alignmentType;
        this.match_score = form.matchScore;
        this.mismatch_score = form.mismatchScore;
        this.open_gap_score = form.openPenalty;
        this.extend_gap_score = form.extensionPenalty;

        this.biological_sequences = [
            {
                type: form.sequenceType,
                bases: form.sequenceA,
                country_origin: countryA,
                external_database_id: 'NC_0001',
            },
            {
                type: form.sequenceType,
                bases: form.sequenceB,
                country_origin: countryB,
                external_database_id: 'NC_0002',
            },
        ]
    }
}

class AnalysisRequest{
    constructor({form}){
        this.title = form.analysisTitle;
        this.description = form.analysisDescription;
        this.type = form.analysisType;
    }
}


const AlignmentSequenceInputStep = ({form, next}) => {
    
    const [idAnalysis, setIdAnalysis] = useState();

    const [makeRequest] = useRequest();
    const [colorAlignIcon, setColorAlignIcon] = useState('');
    const [isSnackbarOpened, openSnackbar] = useState(false);
    const [statusSnackbar, setStatusSanckbar] = useState('error');
    const [msgSnackbar, setMsgSnackbar] = useState('');
    const [isLoading, showLoader] = useState(false);
    const [originCountryA, setOriginCountryA] = useState('brazil');
    const [originCountryB, setOriginCountryB] = useState('brazil');


    const originCountrys = OriginCountryEnum.getSelectStructure();


    useEffect(() => {
        form.sequenceA = '';
        form.sequenceB = '';
    }, [form])

    const showSnackbar = (msg, status) => {
        setMsgSnackbar(msg);
        setStatusSanckbar(status);
        openSnackbar(true);
    }

    const onSuccessAlignment = (data) => {
        showSnackbar(getMessage('common.label.success'), 'success');
        setIdAnalysis(data.id);
        showLoader(false);
    }

    const onFailureAlignment = (error) => {
        showSnackbar(error.errorDescription, 'error');
        showLoader(false);
    }

    const makeAnalysisRequest = async (form) => {
        try{
            let url = API_ROUTES.ANALYSIS_FROM_EXPERIMENT_ID;
            url = url.replace('{experiment_id}', 1);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok){
                throw new Error('Erro na resposta');
            }

            return await response.json();
        }catch (errorMessage){
            showSnackbar(errorMessage, 'error');
        }
    }

    const makeAlignmentRequest = async (form, countryA, countryB) => {
        
        const analysisRequest = new AnalysisRequest({form});
        const alignmentRequest = new AlignmentRequest({form, countryA, countryB});
        
        try{
            ValidationService.validateAlignmentForm(alignmentRequest);
            showLoader(true);

            let analysisResponse = await makeAnalysisRequest(analysisRequest)
            let url = API_ROUTES.ALIGN;
            url = url.replace('{analysis_id}', analysisResponse.id);
            
            makeRequest(url, 'POST', alignmentRequest, onSuccessAlignment, onFailureAlignment);
        }catch (errorMessage){
            showSnackbar(errorMessage, 'error');
        }
    }

    return <>
        {!idAnalysis ? 
            <OlatcgStep 
                onClickNext={() => setIdAnalysis(idAnalysis)}
                isNextDisabled={!idAnalysis}
                stepPosition={2}
            >
                <Grid container
                    component="form"
                    noValidate
                    autoComplete="off"
                    spacing={0}
                >   
                    <Grid item xs={5}>
                        <Stack
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            spacing={4}>
                            <Typography 
                                variant="h4"
                                sx={{textAlign: 'center'}}
                            >
                                {getMessage('alignment.input.label.firstSequence')}
                            </Typography>
                            <TextField
                                name="sequenceA"
                                defaultValue={form.sequenceA ? form.sequenceA : ''}
                                rows={10}
                                sx={{width: '100%'}}
                                onChange={(event) => form.sequenceA = event.target.value}
                                multiline
                                focused
                            />

                            <Box sx={{width:'40%', justifyContent:'center', textAlign:'center'}}>
                                <Typography gutterBottom>
                                    {getMessage('alignment.input.label.originCountry')}
                                </Typography>
                                <Select
                                    id="originCountryA"
                                    name="originCountryA"
                                    value={originCountryA}
                                    onChange={event => setOriginCountryA(event.target.value)}
                                >
                                    {
                                        originCountrys.map((type, index) =>
                                            <MenuItem
                                                key={index} 
                                                value={type.value}
                                            >
                                                {type.label}
                                            </MenuItem>
                                        )
                                    }
                                </Select>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={2} sx={{textAlign: 'center'}}>
                        <Tooltip
                            title={getMessage('alignment.button.tooltip.text.align')}
                            sx={{mt: 20, bgcolor: 'primary.main'}}   
                            onMouseMove={() => setColorAlignIcon("primary")}
                            onMouseLeave={() => setColorAlignIcon()}
                        >
                            <IconButton onClick={() => makeAlignmentRequest(form, originCountryA, originCountryB)}>
                                <Science sx={{ fontSize: 50 }} color={colorAlignIcon} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={5}>
                        <Stack
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            spacing={4}>
                            <Typography 
                                variant="h4"
                                sx={{textAlign: 'center'}}
                            >
                                {getMessage('alignment.input.label.secondSequence')}
                            </Typography>
                            <TextField
                                name="sequenceB"
                                defaultValue={form.sequenceB ? form.sequenceB : ''}
                                rows={10}
                                sx={{width: '100%'}}
                                onChange={(event) => form.sequenceB = event.target.value}
                                multiline
                                focused
                            />

                            <Box sx={{width:'40%', justifyContent:'center', textAlign:'center'}}>
                                <Typography gutterBottom>
                                {getMessage('alignment.input.label.originCountry')}
                                </Typography>
                                <Select
                                    id="originCountryB"
                                    name="originCountryB"
                                    value={originCountryB}
                                    onChange={event => setOriginCountryB(event.target.value)}
                                >
                                    {
                                        originCountrys.map((type, index) =>
                                            <MenuItem
                                                key={index} 
                                                value={type.value}
                                            >
                                                {type.label}
                                            </MenuItem>
                                        )
                                    }
                                </Select>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
                <OlatcgSnackbar
                    isOpened={isSnackbarOpened} 
                    onClose={() => openSnackbar(false)}
                    status={statusSnackbar}
                    msg={msgSnackbar} 
                />
                <OlatcgLoader show={isLoading}/>
            </OlatcgStep> 
        : next(idAnalysis)}
    </>
}

export { AlignmentSequenceInputStep };