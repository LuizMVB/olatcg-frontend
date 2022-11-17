import { Science } from "@mui/icons-material";
import { Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import { API_ROUTES } from "../routes/Routes";
import { getMessage } from "../services/MessageService";
import ValidationService from "../services/ValidationService";
import OlatcgLoader from "./OlatcgLoader";
import OlatcgSnackbar from "./OlatcgSnackbar";
import { OlatcgStep } from "./OlatcgStep";

const AlignmentSequenceInputStep = ({form, next}) => {
    
    const [idAnalysis, setIdAnalysis] = useState();

    const [makeRequest] = useRequest();
    const [colorAlignIcon, setColorAlignIcon] = useState('');
    const [isSnackbarOpened, openSnackbar] = useState(false);
    const [statusSnackbar, setStatusSanckbar] = useState('error');
    const [msgSnackbar, setMsgSnackbar] = useState('');
    const [isLoading, showLoader] = useState(false);

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
        setIdAnalysis(data.idAnalysis);
        showLoader(false);
    }

    const onFailureAlignment = (error) => {
        showSnackbar(error.errorDescription, 'error');
        showLoader(false);
    }

    const makeAlignmentRequest = (form) => {
        try{
            ValidationService.validateAlignmentForm(form);
            showLoader(true);
            const response = fetch('http://localhost:3000/usuario');
            const names = response.json();
            console.log(names);
            console.log("foi")
            makeRequest(API_ROUTES.ALIGN, 'POST', form, onSuccessAlignment, onFailureAlignment);
        }catch (errorMessage){
            showSnackbar(errorMessage, 'error');
        }
    }

    return <>
        {!idAnalysis ? 
            <OlatcgStep 
                onClickNext={() => setIdAnalysis(idAnalysis)}
                isNextDisabled={!idAnalysis}
                stepPosition={1}
            >
                <Grid container
                    component="form"
                    noValidate
                    autoComplete="off"
                    spacing={0}
                >   
                    <Grid item xs={5}>
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
                    </Grid>
                    <Grid item xs={2} sx={{textAlign: 'center'}}>
                        <Tooltip
                            title={getMessage('alignment.button.tooltip.text.align')}
                            sx={{mt: 16, bgcolor: 'primary.main'}}   
                            onMouseMove={() => setColorAlignIcon("primary")}
                            onMouseLeave={() => setColorAlignIcon()}
                        >
                            <IconButton onClick={() => makeAlignmentRequest(form)}>
                                <Science sx={{ fontSize: 50 }} color={colorAlignIcon} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={5}>
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