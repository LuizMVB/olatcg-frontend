import { Science } from "@mui/icons-material";
import { Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRequest from "../../hooks/useRequest";
import useStepForm from "../../hooks/useStepForm";
import { getMessage } from "../../services/MessageService";
import { API_ROUTES } from "../../routes/Routes";
import ValidationService from "../../services/ValidationService";
import OlatcgSnackbar from "../OlatcgSnackbar";
import useStepConditions from "../../hooks/useStepConditions";
import useStepRequest from "../../hooks/useStepRequest";

const SequenceInputStep = () => {
    const [handleInputChange] = useStepForm();
    const [makeRequest] = useRequest();
    const stepForm = useSelector(state => state.stepForm);
    const dispatch = useDispatch();
    const [_, setNextCondition] = useStepConditions();
    const [setStepRequest] = useStepRequest();
    const [colorAlignIcon, setColorAlignIcon] = useState('');
    const [isSnackbarOpened, openSnackbar] = useState(false);
    const [statusSnackbar, setStatusSanckbar] = useState('error');
    const [msgSnackbar, setMsgSnackbar] = useState('');

    useEffect(() => {
        dispatch({
            type: 'SET_NEXT_CONDITION',
            payload: false,
        });
        
        return () => {
            dispatch({
                type: 'RETURN_TO_STEP_CHANGE_CONDITIONS_INITIAL_STATE',
            }); 
        }
    }, [dispatch]);

    useEffect(() => {
        if(!(stepForm.sequenceA && stepForm.sequenceB)){
            dispatch({
                type: 'UPDATE_STEP_FORM',
                payload: {
                    sequenceA: stepForm.sequenceA ? stepForm.sequenceA : '',
                    sequenceB: stepForm.sequenceB ? stepForm.sequenceB : '',
                },
            });
        }
    }, [stepForm, dispatch])

    const showSnackbar = (msg, status) => {
        setMsgSnackbar(msg);
        setStatusSanckbar(status);
        openSnackbar(true);
    }

    const onSuccessAlignment = (data) => {
        setStepRequest(data);
        setNextCondition(true);
        showSnackbar(getMessage('common.label.success'), 'success');
    }

    const onFailureAlignment = (error) => {
        setNextCondition(false);
        showSnackbar(error.errorDescription, 'error');
    }

    const makeAlignRequest = () => {
        try{
            ValidationService.validateAlignmentForm(stepForm);
            makeRequest(API_ROUTES.ALIGN, 'POST', stepForm, onSuccessAlignment, onFailureAlignment);
        }catch (errorMessage){
            showSnackbar(errorMessage, 'error');
        }
    }

    return <>
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
                    defaultValue={stepForm.sequenceA ? stepForm.sequenceA : ''}
                    rows={10}
                    sx={{width: '100%'}}
                    onChange={handleInputChange}
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
                    <IconButton onClick={() => makeAlignRequest()}>
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
                    defaultValue={stepForm.sequenceB ? stepForm.sequenceB : ''}
                    rows={10}
                    sx={{width: '100%'}}
                    onChange={handleInputChange}
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
    </>
}

export default SequenceInputStep;