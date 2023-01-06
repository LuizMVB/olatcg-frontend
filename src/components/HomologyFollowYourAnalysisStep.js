import { Box, Button, Stack, Typography } from "@mui/material";
import { getMessage } from "../services/MessageService";
import { OlatcgStep } from "./OlatcgStep";
import OlatcgHomologyTable from "../components/OlatcgHomologyTable";

const HomologyFollowYourAnalysisStep = ({idAnalysis}) => {
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
                <OlatcgHomologyTable idAnalysis={idAnalysis}/>
                <br/>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={4}
                >
                    <Button 
                        variant="contained" 
                        href={"/analysis/homology/" + idAnalysis}
                    >
                        {getMessage('alignment.followAnalysis.button.label.goToAnalysis')}
                    </Button>
                    <Button 
                        variant="contained" 
                        href="/homology"
                    >
                        {getMessage('alignment.followAnalysis.button.label.makeAnotherAnalysis')}
                    </Button>
                </Stack>
            </Box>
        </OlatcgStep>
    </>
}

export { HomologyFollowYourAnalysisStep };