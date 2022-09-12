import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getMessage } from "../../services/MessageService";
import OlatcgAlignmentTable from "../OlatcgAlignmentTable";

const FollowYourAlignmentAnalysisStep = () => {
    const stepRequest = useSelector(state => state.stepRequest);
    console.log(stepRequest);
    return <>
        <Box sx={{textAlign: 'center'}}>
            <Typography variant="h3">
                {getMessage('alignment.followAnalysis.title')}
            </Typography>
            <br/>
            <Typography variant="h6">
                {getMessage('alignment.followAnalysis.desc')}
            </Typography>
            <br/>
            <Typography variant="h4">
                {getMessage('alignment.followAnalysis.preview')}
            </Typography>
            <OlatcgAlignmentTable idAnalysis={stepRequest.idAnalysis}/>
        </Box>
    </>
}

export default FollowYourAlignmentAnalysisStep;