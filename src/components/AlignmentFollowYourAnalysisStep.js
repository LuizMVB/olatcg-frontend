import { Box, Button, Stack, Typography } from "@mui/material";
import { getMessage } from "../services/MessageService";
import OlatcgAlignmentTable from "./OlatcgAlignmentTable";
import { OlatcgStep } from "./OlatcgStep";

const AlignmentFollowYourAnalysisStep = ({idAnalysis}) => {
    return <>
        <OlatcgStep stepPosition={2} isNextDisabled={true}>
            <Box sx={{textAlign: 'center'}}>
                <Typography variant="h4">
                    {getMessage('alignment.followAnalysis.title')}
                </Typography>
                <br/>
                <Typography variant="h6">
                    {getMessage('alignment.followAnalysis.desc')}
                </Typography>
                <br/>
                <OlatcgAlignmentTable idAnalysis={idAnalysis}/>
                <br/>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={4}
                >
                    <Button 
                        variant="contained" 
                        href={"/analysis/alignment/" + idAnalysis}
                    >
                        {getMessage('alignment.followAnalysis.button.label.goToAnalysis')}
                    </Button>
                    <Button 
                        variant="contained" 
                        href="/alignment"
                    >
                        {getMessage('alignment.followAnalysis.button.label.makeAnotherAnalysis')}
                    </Button>
                </Stack>
            </Box>
        </OlatcgStep>
    </>
}

export { AlignmentFollowYourAnalysisStep };