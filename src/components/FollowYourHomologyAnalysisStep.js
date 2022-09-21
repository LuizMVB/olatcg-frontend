import { Box, Button, Stack, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { stepChangeConditionsActions } from "../redux/actions/stepChangeConditions";
import { selectors } from "../redux/constants/selectors";
import { getMessage } from "../services/MessageService";

const FollowYourHomologyAnalysisStep = () => {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const stepResponse = useSelector(selectors.getStepResponse);

    const gotoAnalysisButtonStyle = {textAlign: 'center', backgroundColor: teal[400], p: 2, borderRadius: 2, 
                                        cursor: 'pointer', '&:hover': 
                                            { bgcolor: teal[500], 
                                                border: '1px inset green' }, 
                                            '&:active': { bgcolor: teal[400] }
                                    };
    
    useEffect(() => {
        dispatch(stepChangeConditionsActions.setPrevious(false));
    }, [dispatch]);

    return <>
        <Box sx={{textAlign: 'center'}}>
            <Typography variant="h4">
                {getMessage('homology.followYourResults.label.title')}
            </Typography>
            <br/>
            <Typography variant="h6">
                {getMessage('homology.followYourResults.label.desc')}
            </Typography>
            <br/>
            <Box sx={ gotoAnalysisButtonStyle } onClick={() => navigateTo('/analysis/homology/' + stepResponse.idAnalysis)}>
                <Typography variant="h5">{getMessage('homology.followYourResults.analysisId', stepResponse.idAnalysis)}</Typography>
            </Box>
            <br/>
            <br/>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={4}
            >
                <Button variant="contained" href={"/analysis/homology/" + stepResponse.idAnalysis}>{getMessage('alignment.followAnalysis.button.label.goToAnalysis')}</Button>
                <Button variant="contained" href="/homology">{getMessage('alignment.followAnalysis.button.label.makeAnotherAnalysis')}</Button>
            </Stack>
        </Box>
    </>
}

export default FollowYourHomologyAnalysisStep;