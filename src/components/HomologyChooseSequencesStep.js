import { Science } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import useRequest from "../hooks/useRequest";
import { API_ROUTES } from "../routes/Routes";
import { getMessage } from "../services/MessageService";
import ValidationService from "../services/ValidationService";
import { OlatcgInputFile } from "./OlatcgInputFile";
import OlatcgLoader from "./OlatcgLoader";
import OlatcgSnackbar from "./OlatcgSnackbar";
import { OlatcgStep } from "./OlatcgStep";

const HomologyChooseSequencesStep = ({form, next}) => {
    
    const [idAnalysis, setIdAnalysis] = useState();

    const [makeRequest] = useRequest();
    const [isSnackbarOpened, openSnackbar] = useState(false);
    const [statusSnackbar, setStatusSanckbar] = useState('error');
    const [msgSnackbar, setMsgSnackbar] = useState('');
    const [isLoading, showLoader] = useState(false);

    const showSnackbar = (msg, status) => {
        setMsgSnackbar(msg);
        setStatusSanckbar(status);
        openSnackbar(true);
    }

    const onSuccessHS = (response) => {
        setIdAnalysis(response.idAnalysis);
        showSnackbar(getMessage('common.label.success'), 'success');
        showLoader(false);
    }

    const onFailureHS = (error) => {
        showSnackbar(error.errorDescription, 'error');
        showLoader(false);
    }

    const makeHSRequest = () => {
        let readerBinaryStr = new FileReader();
        readerBinaryStr.readAsBinaryString(form.sequenceFile);
        readerBinaryStr.onloadend = () => {
            let fileContent = readerBinaryStr.result;
            try{
                ValidationService.validateIfFieldsAreFilled(form);
                ValidationService.validateTextFileType(form.sequenceFile);
                ValidationService.validateSequenceFileContent(fileContent);

                let readerDataUrl = new FileReader();
                readerDataUrl.readAsDataURL(form.sequenceFile);
                readerDataUrl.onloadend = () => {
                    let hsRequest = Object.assign({}, form);
                    hsRequest.sequenceFile = {
                        name: form.sequenceFile.name,
                        description: 'sequence file',
                        encodedFile: readerDataUrl.result
                    }
                    showLoader(true);
                    makeRequest(API_ROUTES.GET_TAXONOMY_FROM_SEQUENCES, 'POST', hsRequest, onSuccessHS, onFailureHS);
                }
            }catch (errorMessage){
                showSnackbar(errorMessage, 'error');
            }
        }
    }

    return <>
        {!idAnalysis ? 
            <OlatcgStep 
                onClickNext={() => setIdAnalysis(idAnalysis)}
                isNextDisabled={!idAnalysis}
                stepPosition={1}
            >
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
                        fileName={form.sequenceFile ? form.sequenceFile.name : ''}
                        handleInputChange={event => form.sequenceFile = event.target.files[0]}
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
            </OlatcgStep> 
        : next(idAnalysis)}
    </>
}

export { HomologyChooseSequencesStep };