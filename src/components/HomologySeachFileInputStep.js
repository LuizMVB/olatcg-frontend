import { Button, Stack, Typography } from "@mui/material";
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
import { OlatcgInputFile } from "./OlatcgInputFile";
import { stepResponseActions } from "../redux/actions/stepResponseActions";
import { Science } from "@mui/icons-material";
import StepActualPosition from "../redux/reducer/StepActualPosition";
import OlatcgLoader from "./OlatcgLoader";

const HomologySearchFileInputStep = () => {

    const dispatch = useDispatch();
    const stepForm = useSelector(selectors.getSetpForm);
    const handleInputChange = event => dispatch(stepFormActions.addField(event));
    const handleSetNextStepCondition = condition => dispatch(stepChangeConditionsActions.setNext(condition));
    const handleSetStepResponse = response => dispatch(stepResponseActions.set(response))
    const handleSetStepActualPosition = position => dispatch(StepActualPosition.set(position));

    const [makeRequest] = useRequest();
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
        if(!stepForm.sequenceFile){
            dispatch(stepFormActions.update(
                { 'sequenceFile': stepForm.sequenceFile ? stepForm.sequenceFile : undefined }
            ));
        }
    }, [stepForm, dispatch])

    const showSnackbar = (msg, status) => {
        setMsgSnackbar(msg);
        setStatusSanckbar(status);
        openSnackbar(true);
    }

    const onSuccessHS = (response) => {
        handleSetStepResponse(response);
        handleSetNextStepCondition(true);
        showSnackbar(getMessage('common.label.success'), 'success');
        handleSetStepActualPosition(2);
        showLoader(false);
    }

    const onFailureHS = (error) => {
        console.log(error);
        handleSetNextStepCondition(false);
        showSnackbar(error.errorDescription, 'error');
        showLoader(false);
    }

    const makeHSRequest = () => {
        let readerBinaryStr = new FileReader();
        readerBinaryStr.readAsBinaryString(stepForm.sequenceFile);
        readerBinaryStr.onloadend = () => {
            let fileContent = readerBinaryStr.result;
            try{
                ValidationService.validateIfFieldsAreFilled(stepForm);
                ValidationService.validateTextFileType(stepForm.sequenceFile);
                ValidationService.validateSequenceFileContent(fileContent);

                let readerDataUrl = new FileReader();
                readerDataUrl.readAsDataURL(stepForm.sequenceFile);
                readerDataUrl.onloadend = () => {
                    let hsRequest = Object.assign({}, stepForm);
                    hsRequest.sequenceFile = {
                        name: stepForm.sequenceFile.name,
                        description: 'sequence file',
                        encodedFile: readerDataUrl.result
                    }
                    showLoader(true);
                    console.log(stepForm);
                    makeRequest(API_ROUTES.GET_TAXONOMY_FROM_SEQUENCES, 'POST', hsRequest, onSuccessHS, onFailureHS);
                }
            }catch (errorMessage){
                showSnackbar(errorMessage, 'error');
            }
        }
    }

    return <>
        <Stack
            spacing={2}
            sx={{textAlign: 'center', px: 'auto'}}
        >   
            <Typography variant="h4">
                {getMessage('homology.input.label.sequenceFile')}
            </Typography>
            <br/>
            <OlatcgInputFile 
                name="sequenceFile" 
                fileName={stepForm.sequenceFile ? stepForm.sequenceFile.name : ''}
                handleInputChange={handleInputChange}
            />
            <Button 
                variant="contained" 
                startIcon={<Science/>}
                onClick={() => makeHSRequest()}
            >
                {getMessage('homology.button.label.makeAnalysis')}
            </Button>
        </Stack>
        <OlatcgSnackbar
            isOpened={isSnackbarOpened} 
            onClose={() => openSnackbar(false)}
            status={statusSnackbar}
            msg={msgSnackbar} 
        />
        <OlatcgLoader show={isLoading}/>
    </>
}

export default HomologySearchFileInputStep;