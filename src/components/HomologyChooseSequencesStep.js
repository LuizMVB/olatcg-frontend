import { Science, Add } from "@mui/icons-material";
import { Button, Stack, TextField, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import useRequest from "../hooks/useRequest";
import DatabaseTypeEnum from "../infra/enums/DatabaseTypesEnum";
import { API_ROUTES } from "../routes/Routes";
import { getMessage } from "../services/MessageService";
import ValidationService from "../services/ValidationService";
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
    const [sequenceIdPairList, setSequenceIdPairList] = useState([{queryId: 1, sequence: ''}]);
    const [sequenceFormList, setSequenceFormList] = useState(<></>);

    useEffect(() => updateSequenceFormList(), []);

    const showSnackbar = (msg, status) => {
        setMsgSnackbar(msg);
        setStatusSanckbar(status);
        openSnackbar(true);
    }

    const onSuccessHS = (data) => {
        setIdAnalysis(data.id);
        showSnackbar(getMessage('common.label.success'), 'success');
        showLoader(false);
    }

    const onFailureHS = (error) => {
        showSnackbar(error.errorDescription, 'error');
        showLoader(false);
    }

    const makeHSRequest = () => {
        try{
            form.sequences = sequenceIdPairList;
            ValidationService.validateIfFieldsAreFilled(form);
            ValidationService.validateDNASequences(form.sequences);

            let url = API_ROUTES.GET_TAXONOMY_FROM_SEQUENCES;
            url = url.replace('{value}', 'OLATCG');
            
            showLoader(true);
            makeRequest(url, 'POST', form, onSuccessHS, onFailureHS);
        }catch (errorMessage){
            showSnackbar(errorMessage, 'error');
        }
    }

    const addSequence = () => {
        sequenceIdPairList.push({queryId: sequenceIdPairList.length + 1, sequence: ''});
        setSequenceIdPairList(sequenceIdPairList);
        updateSequenceFormList();
    }

    const updateSequenceFormList = () => {
        setSequenceFormList(sequenceIdPairList.map(seq => {
            return <>
                <TextField
                            name={'sequence' + seq.queryId}
                            key={seq.queryId}
                            variant="outlined"
                            label={getMessage('homology.input.label.sequence')}
                            fullWidth={true}
                            onChange={(event) => seq.sequence = event.target.value}
                            focused
                        />
            </>
        }));
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
                    
                >   
                    {sequenceFormList}
                    <IconButton aria-label="add"
                            onClick={() => addSequence()}>
                        <Add />
                </IconButton>
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