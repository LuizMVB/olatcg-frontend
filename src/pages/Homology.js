import { getMessage } from "../services/MessageService";

import { HomologyConfigurationStep } from "../components/HomologyConfigurationStep";
import { HomologyFollowYourAnalysisStep } from "../components/HomologyFollowYourAnalysisStep";
import { Step, StepLabel, Stepper } from "@mui/material";
import { useSelector } from "react-redux";
import { selectors } from "../redux/constants/selectors";
import { HomologyChooseSequencesStep } from "../components/HomologyChooseSequencesStep";

const Homology = () => {

    const labels = [
        getMessage('alignment.step0.label'), 
        getMessage('alignment.step1.label'), 
        getMessage('alignment.step2.label')
    ];

    const stepActualPosition = useSelector(selectors.getStepActualPosition);

    return <>
        <Stepper sx={{py: 4}} activeStep={stepActualPosition} alternativeLabel>
            {labels.map((label, stepKey) => 
                <Step key={stepKey}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            )}
        </Stepper>

        <HomologyConfigurationStep next={form => 
            <HomologyChooseSequencesStep form={form} next={idAnalysis => 
                <HomologyFollowYourAnalysisStep idAnalysis={idAnalysis}/>} />}/>
    </>
}

export default Homology;