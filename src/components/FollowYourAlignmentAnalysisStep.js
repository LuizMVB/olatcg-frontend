import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useStepConditions from "../hooks/useStepConditions";
import { getMessage } from "../services/MessageService";
import OlatcgAlignmentTable from "./OlatcgAlignmentTable";

const FollowYourAlignmentAnalysisStep = () => {
    const stepResponse = useSelector(state => state.stepResponse);
    const [setPreviousCondition] = useStepConditions();
    
    useEffect(() => {
        setPreviousCondition(false);
    }, [setPreviousCondition]);

    return <>
        <Box sx={{textAlign: 'center'}}>
            <Typography variant="h4">
                {getMessage('alignment.followAnalysis.title')}
            </Typography>
            <br/>
            <Typography variant="h6">
                {getMessage('alignment.followAnalysis.desc')}
            </Typography>
            <br/>
            <OlatcgAlignmentTable idAnalysis={stepResponse.idAnalysis}/>
            <br/>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={4}
            >
                <Button variant="contained">{getMessage('alignment.followAnalysis.button.label.goToAnalysis')}</Button>
                <Button variant="contained" href="/alignment">{getMessage('alignment.followAnalysis.button.label.makeAnotherAnalysis')}</Button>
            </Stack>
        </Box>
    </>
}

export default FollowYourAlignmentAnalysisStep;