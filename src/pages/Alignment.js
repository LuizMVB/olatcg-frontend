import { getMessage } from "../services/MessageService";

import ConfigurationStep from "../components/alignmentSteps/ConfigurationStep";
import SequenceInputStep from "../components/alignmentSteps/SequenceInputStep";
import FollowYourAlignmentAnalysisStep from "../components/alignmentSteps/FollowYourAlignmentAnalysisStep";
import StepByStep from "../components/StepByStep";

const Alignment = () => {

    const steps = [
        {
            label: getMessage('alignment.step0.label'),
            content: <ConfigurationStep />
        },
        {
            label: getMessage('alignment.step1.label'),
            content: <SequenceInputStep />
        },
        {
            label: getMessage('alignment.step2.label'),
            content: <FollowYourAlignmentAnalysisStep />
        }
    ]

    return <>
        <StepByStep steps={steps} />
    </>
}

export default Alignment;