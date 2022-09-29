import { Box, Button, Stack, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { getMessage } from "../services/MessageService";
import { OlatcgStep } from "./OlatcgStep";

const HomologyFollowYourAnalysisStep = ({idAnalysis}) => {
    const navigateTo = useNavigate();

    const gotoAnalysisButtonStyle = {textAlign: 'center', backgroundColor: teal[400], p: 2, borderRadius: 2, 
                                        cursor: 'pointer', '&:hover': 
                                            { bgcolor: teal[500], 
                                                border: '1px inset green' }, 
                                            '&:active': { bgcolor: teal[400] }
                                    };

    return <>
        <OlatcgStep stepPosition={2} isNextDisabled={true}>
            <Box sx={{textAlign: 'center'}}>
                <Typography variant="h4">
                    {getMessage('homology.followYourResults.label.title')}
                </Typography>
                <br/>
                <Typography variant="h6">
                    {getMessage('homology.followYourResults.label.desc')}
                </Typography>
                <br/>
                <Box sx={ gotoAnalysisButtonStyle } onClick={() => navigateTo('/analysis/homology/' + idAnalysis)}>
                    <Typography variant="h5">{getMessage('homology.followYourResults.analysisId', idAnalysis)}</Typography>
                </Box>
                <br/>
                <br/>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={4}
                >
                    <Button variant="contained" href={"/analysis/homology/" + idAnalysis}>{getMessage('alignment.followAnalysis.button.label.goToAnalysis')}</Button>
                    <Button variant="contained" href="/homology">{getMessage('alignment.followAnalysis.button.label.makeAnotherAnalysis')}</Button>
                </Stack>
            </Box>
        </OlatcgStep>
    </>
}

export { HomologyFollowYourAnalysisStep };