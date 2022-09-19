import { Science } from "@mui/icons-material";
import { Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRequest from "../hooks/useRequest";
import { getMessage } from "../services/MessageService";
import { API_ROUTES } from "../routes/Routes";
import ValidationService from "../services/ValidationService";
import OlatcgSnackbar from "./OlatcgSnackbar";
import { stepChangeConditionsActions } from "../redux/actions/stepChangeConditions";
import { stepFormActions } from "../redux/actions/stepFormActions";
import { selectors } from "../redux/constants/selectors";
import { stepResponseActions } from "../redux/actions/stepResponseActions";
import { stepActualPositionActions } from "../redux/actions/stepActualPositionActions";
import OlatcgLoader from "./OlatcgLoader";

const SequenceInputStep = () => {

    const dispatch = useDispatch();
    const stepForm = useSelector(selectors.getSetpForm);
    const handleInputChange = (event) => dispatch(stepFormActions.addField(event));
    const handleSetNextStepCondition = (condition) => dispatch(stepChangeConditionsActions.setNext(condition));
    const handleSetStepResponse = (response) => dispatch(stepResponseActions.set(response));
    const handleSetStepActualPosition = position => dispatch(stepActualPositionActions.set(position));


    const [makeRequest] = useRequest();
    const [colorAlignIcon, setColorAlignIcon] = useState('');
    const [isSnackbarOpened, openSnackbar] = useState(false);
    const [statusSnackbar, setStatusSanckbar] = useState('error');
    const [msgSnackbar, setMsgSnackbar] = useState('');
    const [isLoading, showLoader] = useState(false);

    useEffect(() => {
        dispatch(stepChangeConditionsActions.setNext(false));
        return () => {
            dispatch(stepChangeConditionsActions.returnToInitialState());
        }
    }, [dispatch]);

    useEffect(() => {
        if(!(stepForm.sequenceA && stepForm.sequenceB)){
            let payload = {
                sequenceA: stepForm.sequenceA ? stepForm.sequenceA : '',
                sequenceB: stepForm.sequenceB ? stepForm.sequenceB : '',
            };
            dispatch(stepFormActions.update(payload));
        }
    }, [stepForm, dispatch])

    const showSnackbar = (msg, status) => {
        setMsgSnackbar(msg);
        setStatusSanckbar(status);
        openSnackbar(true);
    }

    const onSuccessAlignment = (data) => {
        handleSetStepResponse(data);
        handleSetNextStepCondition(true);
        showSnackbar(getMessage('common.label.success'), 'success');
        handleSetStepActualPosition(2);
        showLoader(false);
    }

    const onFailureAlignment = (error) => {
        handleSetNextStepCondition(false);
        showSnackbar(error.errorDescription, 'error');
        showLoader(false);
    }

    const makeAlignRequest = () => {
        try{
            ValidationService.validateAlignmentForm(stepForm);
            showLoader(true);
            makeRequest(API_ROUTES.ALIGN, 'POST', stepForm, onSuccessAlignment, onFailureAlignment);
        }catch (errorMessage){
            console.log(errorMessage);
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
        <OlatcgLoader show={isLoading}/>
    </>
}

export default SequenceInputStep;